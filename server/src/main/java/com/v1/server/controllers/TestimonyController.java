package com.v1.server.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.testimony.TestimonysDTO;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.TestimonyService;

import jakarta.mail.MessagingException;

@RestController
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
            @RequestParam String path,
            @RequestParam(value = "audio", required = false) MultipartFile audio,
            @RequestParam(value = "video", required = false) MultipartFile video,
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
                path,
                audio,
                video,
                image);
    }

    @GetMapping("/show/{path}")
    public ResponseEntity<Page<TestimonysDTO>> findTestimonyByCategory(
            @PathVariable String path,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TestimonysDTO> testimonyPage = testimonyService.findTestimonyByCategory(path,pageable);
        return ResponseEntity.ok(testimonyPage);
    }
}
