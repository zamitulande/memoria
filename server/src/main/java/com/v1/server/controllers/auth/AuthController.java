package com.v1.server.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.AuthService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ApiResponse register(@RequestBody RegisterRequestDTO request) throws MessagingException{
            return authService.register(request);
    }

    @PostMapping("/authenticate")
    public ApiResponse authenticate(@RequestBody AuthenticationRequestDTO request)  {
        return authService.authenticate(request);
    }

    @GetMapping("/activate-account")
    public void confirmAccount(@RequestParam String token) throws MessagingException{
        authService.activateAccount(token);
    }

    @PostMapping("/forget-password")
    public ApiResponse forgetPassword(HttpServletRequest request, @RequestParam String identification) throws MessagingException{
       return authService.forgetPassword(identification);
    }

    @PostMapping("/reset-password")
    public ApiResponse resetPassword(@RequestBody ResetPasswordDTO request){
        
        return authService.resetPassword(request);
    }
}
