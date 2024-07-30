package com.v1.server.services;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;

@Service
public interface TestimonyService {

    ApiResponse register(
            String category,
            String title,
            String description,
            String eventDate,
            String department,
            String municipio,
            String descriptionDetail,
            MultipartFile audio,
            MultipartFile video,
            MultipartFile image)
            throws MessagingException, IOException;
}
