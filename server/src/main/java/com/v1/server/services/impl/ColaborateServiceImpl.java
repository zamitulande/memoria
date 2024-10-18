package com.v1.server.services.impl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.colaborate.ColaborateDTO;
import com.v1.server.entities.Colaborate;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.exceptions.customExceptions.NotFoundException;
import com.v1.server.repositories.ColaborateRepository;
import com.v1.server.services.ColaborateService;

import jakarta.mail.MessagingException;

@Service
public class ColaborateServiceImpl  implements ColaborateService{

    @Autowired
    private ColaborateRepository colaborateRepository;

    @Override
    public ApiResponse register(ColaborateDTO requesDto) throws MessagingException, IOException {
        
        var colaborate = Colaborate.builder()
                .name(requesDto.getName())
                .typeId(requesDto.getTypeId())
                .identification(requesDto.getIdentification())
                .siteWeb(requesDto.getSiteWeb())
                .email(requesDto.getEmail())
                .contactNumber(requesDto.getContactNumber())
                .corporatePurpose(requesDto.getCorporatePurpose())
                .build();

        colaborateRepository.save(colaborate);
        String message = "Datos enviados satisfactoriamente";
        return new ApiResponse(200, message);
    }

    @Override
    public Page<ColaborateDTO> findAllColaborates(Pageable pageable) {
        Page<Colaborate> colaboratePage = colaborateRepository.findAll(pageable);
        return colaboratePage.map(colaborate-> ColaborateDTO.builder()
                .colaborateId(colaborate.getColaborateId())
                .name(colaborate.getName())
                .typeId(colaborate.getTypeId())
                .identification(colaborate.getIdentification())
                .siteWeb(colaborate.getSiteWeb())
                .email(colaborate.getEmail())
                .contactNumber(colaborate.getContactNumber())
                .corporatePurpose(colaborate.getCorporatePurpose())
                .build());
    }

    @Override
    public void deleteById(Long colaborateId) {
        Colaborate colaborate = colaborateRepository.findById(colaborateId)
                                 .orElseThrow(() -> new NotFoundException("Colaborador no encontrado."));
        colaborateRepository.delete(colaborate);     
    }
    
}
