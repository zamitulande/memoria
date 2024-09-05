package com.v1.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.openData.OpenDataDTO;
import com.v1.server.services.OpenDataService;

@RestController
@RequestMapping("/api/v1/open-data")
@CrossOrigin(origins = "*") 
public class OpenDataController {

    @Autowired
    private  OpenDataService openDataService;

    @GetMapping("")
    public ResponseEntity<Page<OpenDataDTO>> allOpenData(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<OpenDataDTO> testimonyPage = openDataService.findOpenData(pageable);
        return ResponseEntity.ok(testimonyPage);
    }
}
