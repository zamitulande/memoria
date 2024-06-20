package com.v1.server.dtos.user;

import com.v1.server.enumerate.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDTO {
    
    private Long userId;
    private Role role;     
    private String identification; 
    private String names;
    private String lastNames;   
    private String contactNumber;    
    private String department;
    private String municipio;
    private String email;
}
