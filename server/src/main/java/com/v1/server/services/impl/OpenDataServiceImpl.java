package com.v1.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.openData.OpenDataDTO;
import com.v1.server.entities.Testimony;
import com.v1.server.repositories.OpenDataRepository;
import com.v1.server.services.OpenDataService;

@Service
public class OpenDataServiceImpl implements OpenDataService {

    @Value("${path-load-file:pathFile}")
    private String pathFile;

     @Autowired
    private OpenDataRepository openDataRepository;

    @Override
    public Page<OpenDataDTO> findOpenData(Pageable pageable) {
         Page<Testimony> testimonyPage = openDataRepository.findByEnabledTrue(pageable);
        return testimonyPage.map(testimony -> OpenDataDTO.builder()
                .testimonyId(testimony.getTestimonyId())
                .category(testimony.getCategory())
                .title(testimony.getTitle())
                .description(testimony.getDescription())
                .evenDate(testimony.getEvenDate())
                .municipio(testimony.getMunicipio())
                .department(testimony.getDepartment())
                .descriptionDetail(testimony.getDescriptionDetail())
                .audioUrl(pathFile + "/audio/" + testimony.getAudioUrl())
                .videoUrl(pathFile + "/video/" + testimony.getVideoUrl())
                .imageUrl(pathFile + "/image/" + testimony.getImageUrl())
                .build());
    }
    
}
