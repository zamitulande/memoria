package com.v1.server.dtos.openData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpenDataDTO {
    
    private Long testimonyId;

    private String category;

    private String title;

    private String description;

    private String evenDate;

    private String municipio;

    private String department;
    
    private String descriptionDetail;

    private String audioUrl;

    private String videoUrl;

    private String imageUrl;
}
