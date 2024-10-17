package com.v1.server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Colaborate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long colaborateId;

    @NotBlank
    private String name;

    private String typeId;

    @NotBlank
    @Column(unique = true)
    private String identification;
   
    private String siteWeb;
    
    private String facebook;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @Size(min = 8, message = "La numero de celular debe tener 10 caracteres")
    private String contactNumber;

    @NotBlank
    private String corporatePurpose;

}
