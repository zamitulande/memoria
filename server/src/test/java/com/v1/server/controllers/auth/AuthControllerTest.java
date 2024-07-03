package com.v1.server.controllers.auth;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.v1.server.dtos.user.AuthResponseDTO;
import com.v1.server.dtos.user.AuthenticationRequestDTO;
//import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.dtos.user.ResetPasswordDTO;
import com.v1.server.dtos.user.ResetPasswordSessionDTO;
// import com.v1.server.entities.User;
// import com.v1.server.enumerate.Role;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.AuthService;
import com.v1.server.services.JwtService;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {
    
    @Autowired
    private MockMvc mockMvc;    

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtService jwtService;

    @Autowired
    private ObjectMapper objectMapper;

    // @Test
    // @WithMockUser(username = "user", roles = {"USER"})
    // public void testRegister() throws Exception{
    //     User user = User.builder()
    //                     .firstName("pepito")
    //                     .secondName("juan")
    //                     .firstLastName("perez")
    //                     .secondLastName("gomez")
    //                     .identification("9875425422")
    //                     .email("pepito@correo.com")
    //                     .confirmEmail("pepito@correo.com")
    //                     .department("Cauca")
    //                     .municipio("Piendamo")
    //                     .contactNumber("3125987895")
    //                     .password("qwer*1234")
    //                     .confirmPassword("qwer*1234")
    //                     .role(Role.USER)
    //                     .build();

    //     when(authService.register(any(User.class)))
    //                 .thenReturn(new ApiResponse(HttpStatus.OK.value(),"success"));
    
    //     mockMvc.perform(post("/api/v1/auth/register").with(csrf())
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(requestDTO)))
    //             .andExpect(status().isOk()); 
    // }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void testAuthenticate() throws Exception {
        AuthenticationRequestDTO authenticationRequestDTO = AuthenticationRequestDTO.builder()
                            .email("pepito@correo.com")
                            .password("qwer*1234")
                            .build();

        AuthResponseDTO authResponseDTO = AuthResponseDTO.builder()
                            .token("test-token")
                            .role("USER")
                            .userId(5058956L)
                            .userName("JUAN MANUEL")
                            .build();

        when(authService.authenticate(any(AuthenticationRequestDTO.class)))
                    .thenReturn(ResponseEntity.ok(authResponseDTO));

        mockMvc.perform(post("/api/v1/auth/authenticate").with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(authenticationRequestDTO)))
                    .andExpect(status().isOk());
                    
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void testConfirmAccount() throws Exception {
        String token = "test-token";

        mockMvc.perform(get("/api/v1/auth/activate-account").with(csrf())
                .param("token", token))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void testForgetPassword() throws Exception {
        String identification = "test-identification";

        when(authService.forgetPassword(any(String.class))).thenReturn(new ApiResponse(HttpStatus.OK.value(),"success"));

        mockMvc.perform(post("/api/v1/auth/forget-password").with(csrf())
                .param("identification", identification))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void testResetPassword() throws Exception {
        ResetPasswordDTO request = ResetPasswordDTO.builder()
                            .password("test-password")
                            .confirmPassword("test-password")
                            .token("test-token")
                            .build();

        when(authService.resetPassword(any(ResetPasswordDTO.class))).thenReturn(new ApiResponse(HttpStatus.OK.value(),"success"));

        mockMvc.perform(post("/api/v1/auth/reset-password").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

     @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void testResetPasswordSession() throws Exception {
        ResetPasswordSessionDTO request = ResetPasswordSessionDTO.builder()
                    .password("test-password")
                    .confirmPassword("test-password")
                    .userId(25L)
                    .build();

        when(authService.resetPasswordSesion(any(ResetPasswordSessionDTO.class))).thenReturn(new ApiResponse(HttpStatus.OK.value(),"success"));

        mockMvc.perform(post("/api/v1/auth/reset-password-session").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }
}
