package com.v1.server.services;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.entities.User;

import jakarta.mail.MessagingException;

public interface AuthService {

    User register (RegisterRequestDTO request)  throws MessagingException ;
    
    AuthResponseDTO authenticate(AuthenticationRequestDTO request);

    void activateAccount (String token) throws MessagingException;

}
