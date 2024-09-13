package com.v1.server.services;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.colaborate.ColaborateDTO;
import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;

@Service
public interface ColaborateService {

    ApiResponse register(ColaborateDTO colaborateDTO) throws MessagingException, IOException;

    Page<ColaborateDTO> findAllColaborates(Pageable pageable);

    void deleteById(Long colaborateId);
}
