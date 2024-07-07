package com.v1.server.services;

import org.springframework.http.ResponseEntity;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.dtos.user.ResetPasswordSessionDTO;
import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;

public interface AuthService {

    //register user
    ApiResponse register(RegisterRequestDTO request) throws MessagingException;

    ResponseEntity<AuthResponseDTO> authenticate(AuthenticationRequestDTO request);

    void activateAccount(String token);

    ApiResponse forgetPassword(String identification) throws MessagingException;

    ApiResponse resetPassword(ResetPasswordDTO request);

    ApiResponse resetPasswordSesion(ResetPasswordSessionDTO request);
}
