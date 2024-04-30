package com.v1.server.dtos.user;

import com.v1.server.enumerate.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequestDTO {
    
    private Long userId;
    
    private String name; 

    private String lastname;

    private String identification;

    private String email;

    private String password;

    private Role role;
}
