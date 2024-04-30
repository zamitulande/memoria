package com.v1.server.services;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;

import jakarta.mail.MessagingException;

public interface AuthService {

    void register (RegisterRequestDTO request)  throws MessagingException ;
    
    AuthResponseDTO authenticate(AuthenticationRequestDTO request);

}
