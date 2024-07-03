package com.v1.server.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.dtos.user.ResetPasswordSessionDTO;
import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;
import java.io.IOException;

public interface AuthService {

    ApiResponse register(
            String firstName,
            String secondName,
            String firstLastName,
            String secondLastName,
            String contactNumber,
            String department,
            String municipio,
            String identification,
            String email,
            String confirmEmail,
            String password,
            String confirmPassword,
            MultipartFile document
            ) throws MessagingException, IOException;

    ResponseEntity<AuthResponseDTO> authenticate(AuthenticationRequestDTO request);

    void activateAccount(String token);

    ApiResponse forgetPassword(String identification) throws MessagingException;

    ApiResponse resetPassword(ResetPasswordDTO request);

    ApiResponse resetPasswordSesion(ResetPasswordSessionDTO request);
}
