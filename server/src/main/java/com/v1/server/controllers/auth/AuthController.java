package com.v1.server.controllers.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.dtos.user.ResetPasswordSessionDTO;
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

    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse register(
                                @RequestParam String firstName,
                                @RequestParam String secondName,   
                                @RequestParam String firstLastName,   
                                @RequestParam String secondLastName,    
                                @RequestParam String contactNumber,
                                @RequestParam String department,
                                @RequestParam String municipio,   
                                @RequestParam String identification,
                                @RequestParam String email,
                                @RequestParam String confirmEmail,
                                @RequestParam String password,
                                @RequestParam String confirmPassword,
                                @RequestParam("document") MultipartFile document) 
                                throws MessagingException, IOException {
        return authService.register(firstName,
                                    secondName,   
                                    firstLastName,   
                                    secondLastName,    
                                    contactNumber,
                                    department,
                                    municipio,   
                                    identification,
                                    email,
                                    confirmEmail,
                                    password,
                                    confirmPassword,
                                    document);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthenticationRequestDTO request) {
        return authService.authenticate(request);
    }

    @GetMapping("/activate-account")
    public void confirmAccount(@RequestParam String token) {
        authService.activateAccount(token);
    }

    @PostMapping("/forget-password")
    public ApiResponse forgetPassword(HttpServletRequest request, @RequestParam String identification)
            throws MessagingException {
        return authService.forgetPassword(identification);
    }

    // metodo para manejar si olvido contraseña
    @PostMapping("/reset-password")
    public ApiResponse resetPassword(@RequestBody ResetPasswordDTO request) {
        return authService.resetPassword(request);
    }

    // metodo para manejar si cambia contraseña con sesion iniciada
    @PostMapping("/reset-password-session")
    public ApiResponse resetPasswordSession(@RequestBody ResetPasswordSessionDTO request) {
        return authService.resetPasswordSesion(request);
    }
}
