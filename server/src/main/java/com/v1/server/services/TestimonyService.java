package com.v1.server.services;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.testimony.TestimonysDTO;
import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;

@Service
public interface TestimonyService {

        ApiResponse register(
                        Long userId,
                        String category,
                        String title,
                        String description,
                        String evenDate,
                        String department,
                        String municipio,
                        String descriptionDetail,
                        String path,
                        boolean enabled,
                        MultipartFile audio,
                        MultipartFile video,
                        MultipartFile image)
                        throws MessagingException, IOException;

        Page<TestimonysDTO> findTestimonyByCategoryAdmin(String path, Pageable pageable);

        Page<TestimonysDTO> findTestimonyByCategoryUser(String path, Pageable pageable);

        Page<TestimonysDTO> findTestimonyByCategoryAnonymous(String path, Pageable pageable);

        ApiResponse updateTestimony(
                        Long testimonyId,
                        String category,
                        String title,
                        String description,
                        String evenDate,
                        String department,
                        String municipio,
                        String descriptionDetail,
                        String path,
                        boolean enabled,
                        MultipartFile audio,
                        MultipartFile video,
                        MultipartFile image)
                        throws MessagingException, IOException;

        TestimonysDTO privateTestimony(Long testimonyId);

        TestimonysDTO publicTestimony(Long testimonyId);
}
