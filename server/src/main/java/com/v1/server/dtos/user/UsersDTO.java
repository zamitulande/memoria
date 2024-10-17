package com.v1.server.dtos.user;

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

    private String firstName;

    private String secondName;
   
    private String firstLastName;
   
    private String secondLastName;

    private String gender;

    private String poblacion;

    private String disability;
    
    private String contactNumber;

    private String department;

    private String municipio;
   
    private String identification;

    private String typeId;

    private String email;

    private String confirmEmail;

    private boolean accountLocked;

    private String documentUrl;
    
}
