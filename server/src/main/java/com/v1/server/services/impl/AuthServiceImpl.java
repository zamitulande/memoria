package com.v1.server.services.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Value("${characters-token:characters}")
    private String characters;

    @Override
    public User register(RegisterRequestDTO request) throws MessagingException {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }

        var user = User.builder()
                .userId(request.getUserId())
                .name(request.getName())
                .lastname(request.getLastname())
                .identification(request.getIdentification())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);
        sendValidationEmail(savedUser);
        return savedUser;

    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        // send email

        emailService.sendEmail(
                user.getEmail(),
                user.getUsername(),
                user.getName(),
                EmailTemplateName.activate_account,
                activationUrl,
                newToken,
                "Account activation");

    }

    private String generateAndSaveActivationToken(User user) {
        // generate token
        String generateToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generateToken)
                .createAt(LocalDateTime.now())
                .expirateAt(LocalDateTime.now().plusDays(8))
                .user(user)
                .build();

        tokenRepository.save(token);
        return generateToken;
    }

    private String generateActivationCode(int length) {
        StringBuilder codebBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codebBuilder.append(characters.charAt(randomIndex));
        }
        return codebBuilder.toString();
    }

    @Override
    public AuthResponseDTO authenticate(AuthenticationRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
                        
        User userDetails = (User) authentication.getPrincipal();
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(""));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        AuthResponseDTO responseDTO = AuthResponseDTO.builder()
                .token(jwtToken)
                .role(roles) // Agregar los roles al DTO
                .build();

        return responseDTO;

    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("invalid Token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpirateAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("La activacion del token ha expirado, registrate de nuevo para un nuevo token");
        }
        var user = userRepository.findById(savedToken.getUser().getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidateAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

}
