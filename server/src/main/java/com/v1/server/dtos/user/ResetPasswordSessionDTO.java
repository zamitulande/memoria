package com.v1.server.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordSessionDTO {
    
    private String password;
    private String confirmPassword;
    private Long userId;
}
