package com.v1.server.services;

import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;

public interface AuthService {

    ApiResponse register (RegisterRequestDTO request)  throws MessagingException ;
    
    ApiResponse authenticate(AuthenticationRequestDTO request) ;

    void activateAccount (String token);

    ApiResponse forgetPassword(String identification) throws MessagingException;

    ApiResponse resetPassword(ResetPasswordDTO request);


}
