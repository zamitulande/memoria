package com.v1.server.services.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.entities.Token;
import com.v1.server.entities.User;
import com.v1.server.enumerate.EmailTemplateName;
import com.v1.server.repositories.TokenRepository;
import com.v1.server.repositories.UserRepository;
import com.v1.server.services.AuthService;
import com.v1.server.services.EmailService;
import com.v1.server.services.JwtService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;


    @Value("${activation-url:activationUrl}")
    private String activationUrl;

    @Override
    public void register(RegisterRequestDTO request) throws MessagingException {

        var user = User.builder()
                .name(request.getName())
                .lastname(request.getLastname())
                .identification(request.getIdentification())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .role(request.getRole())
                .build();

        userRepository.save(user);
        sendValidationEmail(user);

    }

    private void sendValidationEmail(User user) throws MessagingException {
       var newToken = generateAndSaveActivationToken(user);
       //send email

       emailService.sendEmail(
                    user.getEmail(),
                    user.getUsername(),
                    EmailTemplateName.activate_account,
                    activationUrl,
                    newToken,
                    "Account activation");

    }

    private String generateAndSaveActivationToken(User user) {
       //generate token
       String generateToken = generateActivationCode(6);
       var token = Token.builder()
                    .token(generateToken)
                    .createAt(LocalDateTime.now())
                    .expirateAt(LocalDateTime.now().plusDays(3))
                    .user(user)
                    .build();
        
       tokenRepository.save(token);
       return generateToken;
    }

    private String generateActivationCode(int length) {
       String characters = "0123456789";
       StringBuilder codebBuilder = new StringBuilder();
       SecureRandom secureRandom = new SecureRandom();
       for(int i=0; i<length; i++){
        int randomIndex = secureRandom.nextInt(characters.length());
        codebBuilder.append(characters.charAt(randomIndex));
       }
       return codebBuilder.toString();
    }

    @Override
    public AuthResponseDTO authenticate(AuthenticationRequestDTO request) {

       authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), 
                request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthResponseDTO.builder().token(jwtToken).build();

    }

}
