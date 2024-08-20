package com.v1.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Testimony {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testimonyId;

    @NotBlank
    private String category;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String evenDate;

    @NotBlank
    private String municipio;

    @NotBlank
    private String department;
    
    private String descriptionDetail;

    @NotBlank
    private String path;

    private String audioUrl;

    private String videoUrl;

    private String imageUrl;

    private boolean enabled;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User user;
} 
