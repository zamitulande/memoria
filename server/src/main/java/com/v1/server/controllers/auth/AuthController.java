package com.v1.server.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.entities.User;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.AuthService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequestDTO request) throws MessagingException{
        User user = authService.register(request);
        if (user != null) {
            String message = "usuario creado axitosamente, por favor revisa tu correo para activar tu cuenta";
            return ResponseEntity.status(HttpStatus.CREATED)
                                .body(new ApiResponse(HttpStatus.CREATED.value(), message, user));
        }else{
            String errorMessage = "error al crear el usuario";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage));
        }
        // try {
        //     authService.register(request);
        //     return ResponseEntity.ok().build();
        // } catch (MessagingException e) {
        //     // Maneja cualquier excepción de mensajería aquí
        //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        // }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthenticationRequestDTO request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/activate-account")
    public void confirmAccount(@RequestParam String token) throws MessagingException{
        authService.activateAccount(token);
    }
}
