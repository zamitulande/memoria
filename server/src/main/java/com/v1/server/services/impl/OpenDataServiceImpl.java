package com.v1.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.openData.OpenDataDTO;
import com.v1.server.entities.Testimony;
import com.v1.server.helpers.TestimonySpecification;
import com.v1.server.repositories.OpenDataRepository;
import com.v1.server.services.OpenDataService;

@Service
public class OpenDataServiceImpl implements OpenDataService {

    @Value("${path-load-file:pathFile}")
    private String pathFile;

     @Autowired
    private OpenDataRepository openDataRepository;

    @Override
    public Page<OpenDataDTO> findOpenData(Pageable pageable, String category, String department, String municipio, String evenDateStart, String evenDateEnd, String search) {
       Specification<Testimony> specification = TestimonySpecification.getTestimoniesWithFilters(category, department, municipio, evenDateStart, evenDateEnd, search);

       Page<Testimony> testimonyPage = openDataRepository.findAll(specification, pageable);

        return testimonyPage.map(testimony -> OpenDataDTO.builder()
                .testimonyId(testimony.getTestimonyId())
                .category(testimony.getCategory())
                .title(testimony.getTitle())
                .description(testimony.getDescription())
                .evenDate(testimony.getEvenDate())
                .municipio(testimony.getMunicipio())
                .department(testimony.getDepartment())
                .descriptionDetail(testimony.getDescriptionDetail())
                .audioUrl(testimony.getAudioUrl() != null ? pathFile + "/audio/" + testimony.getAudioUrl() : null)
                .videoUrl(testimony.getVideoUrl() != null ? pathFile + "/video/" + testimony.getTitle().replace(" ", "_")+ "/" +  testimony.getVideoUrl() : null)
                .imageUrl(testimony.getImageUrl() != null ? pathFile + "/image/" + testimony.getImageUrl() : null)
                .build());
    }
    
}
