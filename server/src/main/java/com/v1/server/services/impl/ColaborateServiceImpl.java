package com.v1.server.services.impl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.colaborate.ColaborateDTO;
import com.v1.server.entities.Colaborate;
import com.v1.server.exceptions.ApiResponse;
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
                .siteWeb(requesDto.getSiteWeb())
                .facebook(requesDto.getFacebook())
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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllColaborates'");
    }

    @Override
    public void deleteById(Long colaborateId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }
    
}
