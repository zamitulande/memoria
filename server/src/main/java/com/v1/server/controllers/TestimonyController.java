package com.v1.server.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.TestimonyService;

import jakarta.mail.MessagingException;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/v1/repository")
public class TestimonyController {

    @Autowired
    private TestimonyService testimonyService;

    // registra admin
    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse register(
            @RequestParam Long userId,
            @RequestParam String category,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String eventDate,
            @RequestParam String department,
            @RequestParam String municipio,
            @RequestParam String descriptionDetail,
            @RequestParam("audio") MultipartFile audio,
            @RequestParam("video") MultipartFile video,
            @RequestParam("image") MultipartFile image)
            throws MessagingException, IOException {
            
        return testimonyService.register(
                userId,
                category,
                title,
                description,
                eventDate,
                department,
                municipio,
                descriptionDetail,
                audio,
                video,
                image);
    }
}
