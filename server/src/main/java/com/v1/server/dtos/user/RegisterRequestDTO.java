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
    
    private String firstName;

    private String secondName;

    private String firstLastName;
   
    private String secondLastName;

    private String gender;

    private String poblacion;

    private String disability;

    private String typeId;

    private String identification;
    
    private String contactNumber;
  
    private String department;
    
    private String municipio;

    private String email;

    private String confirmEmail;

    private String password;

    private String confirmPassword;

    private Role role;
}
