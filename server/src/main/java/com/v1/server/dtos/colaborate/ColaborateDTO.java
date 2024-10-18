package com.v1.server.dtos.colaborate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColaborateDTO {
    
    private Long colaborateId;

    private String name;

    private String typeId;

    private String identification;
   
    private String siteWeb;

    private String email;

    private String contactNumber;

    private String corporatePurpose;
}
