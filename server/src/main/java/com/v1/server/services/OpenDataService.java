package com.v1.server.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.openData.OpenDataDTO;


@Service
public interface OpenDataService {

    Page<OpenDataDTO> findOpenData(Pageable pageable, String catetogory, String department, String municipio, String evenDateStart, String evenDateEnd, String search);
} 
