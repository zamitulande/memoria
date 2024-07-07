package com.v1.server.services.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.dtos.user.ResetPasswordSessionDTO;
import com.v1.server.entities.Token;
import com.v1.server.entities.User;
import com.v1.server.enumerate.EmailTemplateName;
import com.v1.server.enumerate.Role;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.exceptions.customExceptions.ExpireTokenException;
import com.v1.server.exceptions.customExceptions.NotFoundException;
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

    @Value("${forget-password:forgetPassword}")
    private String forgetPassword;

    @Value("${characters-token:characters}")
    private String characters;

    //register user
    @Override
    public ApiResponse register(RegisterRequestDTO request) throws MessagingException {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }
        if (!request.getEmail().equals(request.getConfirmEmail())) {
            throw new IllegalArgumentException("Los correos electronicos no coiciden");
        }

        var user = User.builder()
                .userId(request.getUserId())
                .firstName(request.getFirstName())
                .secondName(request.getSecondName())
                .firstLastName(request.getFirstLastName())
                .secondLastName(request.getSecondLastName())
                .identification(request.getIdentification())
                .contactNumber(request.getContactNumber())
                .department(request.getDepartment())
                .municipio(request.getMunicipio())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);
        sendValidationEmail(savedUser);
        String message = "Usuario creado satisfactoriamente";
        return new ApiResponse(200, message);

    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        // send email
        emailService.sendEmail(
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
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

    // generar codigo para asignar al token
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
    public ResponseEntity<AuthResponseDTO> authenticate(AuthenticationRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User userDetails = (User) authentication.getPrincipal();
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(""));
        String firstName = userDetails.getFirstName();
        String lastName = userDetails.getFirstLastName();
        Long userId = userDetails.getUserId();
        var saveUser = userRepository.findByEmail(request.getEmail());
        User user = saveUser.get();
        var jwtToken = jwtService.generateToken(user);
        AuthResponseDTO responseDTO = AuthResponseDTO.builder()
                .userName(firstName+" "+lastName)
                .token(jwtToken)
                .role(roles)
                .userId(userId) // Agregar los roles al DTO
                .build();
        return ResponseEntity.ok(responseDTO);

    }

    @Transactional
    public void activateAccount(String token) {
        Optional<Token> savedTokenOptional = tokenRepository.findByToken(token);
        if (savedTokenOptional.isEmpty()) {
            throw new NotFoundException("Codigo no valido");
        }
        Token savedToken = savedTokenOptional.get();

        if (savedToken.getExpirateAt().isAfter(LocalDateTime.now())) {
            var saveUser = userRepository.findById(savedToken.getUser().getUserId());
            User user = saveUser.get();

            user.setEnabled(true);
            userRepository.save(user);
            savedToken.setValidateAt(LocalDateTime.now());
            tokenRepository.save(savedToken);
        } else {
            throw new ExpireTokenException(
                    "El codigo para activar la cuenta ha expirado, debe registrarse de nuevo para obtner un nuevo codigo");
        }
    }

    public ApiResponse forgetPassword(String identification) throws MessagingException {

        Optional<User> userOptional = userRepository.findByIdentification(identification);
        if (userOptional.isEmpty()) {
            throw new NotFoundException("identificacion no valida");
        }
        User user = userOptional.get();
        sendResetPasswordEmail(user);
        return new ApiResponse(200, "Se ha enviado un correo para la recuperacion de contraseña");
    }

    private void sendResetPasswordEmail(User user) throws MessagingException {
        var resetToken = generateAndSaveResetToken(user);
        String resetUrl = forgetPassword + "?token=" + resetToken;

        emailService.sendEmail(
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
                EmailTemplateName.forget_password, // Asegúrate de tener esta plantilla en tu servicio de email
                resetUrl,
                null,
                "Password Reset Request");
    }

    private String generateAndSaveResetToken(User user) {
        String generateToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generateToken)
                .createAt(LocalDateTime.now())
                .expirateAt(LocalDateTime.now().plusDays(1)) // Token válido por 1 día
                .user(user)
                .build();

        tokenRepository.save(token);
        return generateToken;
    }

    @Override
    public ApiResponse resetPassword(ResetPasswordDTO request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }

        Optional<Token> tokenOptional = tokenRepository.findByToken(request.getToken());
        if (!tokenOptional.isPresent()) {
            throw new NotFoundException("Token invalido");
        }
        Token resetToken = tokenOptional.get();
        if (resetToken.getExpirateAt().isAfter(LocalDateTime.now())) {
            User user = resetToken.getUser();
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userRepository.save(user);
            return new ApiResponse(200, "Contraseña cambiada satisfactoriamente");
        } else {
            throw new ExpireTokenException(
                    "La solicitud de cambio de contraseña ha expirado, click en olvido contraseña para una nueva solicitud");
        }
    }

    public ApiResponse resetPasswordSesion(ResetPasswordSessionDTO request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }
    
        Long userId = request.getUserId();
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new NotFoundException("usuario no encontrado");
        }
        User user = userOptional.get();

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return new ApiResponse(200, "Contraseña cambiada satisfactoriamente");
    }

}
