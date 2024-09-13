package com.v1.server.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.colaborate.ColaborateDTO;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.ColaborateService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/v1")
public class ColaborateController {

    @Autowired
    private ColaborateService colaborateService;
    
    @PostMapping("/colaborate")
    public ApiResponse register(@RequestBody ColaborateDTO requesDto) throws MessagingException, IOException{
        return colaborateService.register(requesDto);
    }
}
