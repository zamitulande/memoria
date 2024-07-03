package com.v1.server.controllers.auth;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.v1.server.dtos.user.RegisterRequestDTO;
import com.v1.server.enumerate.Role;
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

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    public void testRegister() throws Exception{
        RegisterRequestDTO requestDTO = RegisterRequestDTO.builder()
                        .firstName("pepito")
                        .secondName("juan")
                        .firstLastName("perez")
                        .secondLastName("gomez")
                        .identification("9875425422")
                        .email("pepito@correo.com")
                        .confirmEmail("pepito@correo.com")
                        .department("Cauca")
                        .municipio("Piendamo")
                        .contactNumber("3125987895")
                        .password("qwer*1234")
                        .confirmPassword("qwer*1234")
                        .role(Role.USER)
                        .build();

        when(authService.register(any(RegisterRequestDTO.class)))
                    .thenReturn(new ApiResponse(HttpStatus.OK.value(),"success"));
    
        mockMvc.perform(post("/api/v1/auth/register").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk()); 
    }
}
