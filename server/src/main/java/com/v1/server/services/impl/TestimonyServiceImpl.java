package com.v1.server.services.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.testimony.TestimonysDTO;
import com.v1.server.entities.Testimony;
import com.v1.server.entities.User;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.repositories.TestimonyRepository;
import com.v1.server.repositories.UserRepository;
import com.v1.server.services.TestimonyService;

import jakarta.mail.MessagingException;

@Service
public class TestimonyServiceImpl implements TestimonyService {

    @Autowired
    private TestimonyRepository testimonyRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String AUDIO_DIRECTORY = "./storage/testimony/audio";
    private static final String VIDEO_DIRECTORY = "./storage/testimony/video";
    private static final String IMAGE_DIRECTORY = "./storage/testimony/image";

    @Override
    public ApiResponse register(
            Long userId,
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
            throws MessagingException, IOException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        String audioUrl = null;
        String videoUrl = null;
        String imageUrl = null;

        if (audio != null && !audio.isEmpty()) {
            audioUrl = saveUploadedFileAudio(audio, title);
        }

        if (video != null && !video.isEmpty()) {
            videoUrl = saveUploadedFileVideo(video, title);
        }

        if (image != null && !image.isEmpty()) {
            imageUrl = saveUploadedFileImage(image, title);
        }

        var testimony = Testimony.builder()
                .user(user)
                .category(category)
                .title(title)
                .description(description)
                .evenDate(eventDate)
                .department(department)
                .municipio(municipio)
                .descriptionDetail(descriptionDetail)
                .audioUrl(audioUrl)
                .videoUrl(videoUrl)
                .imageUrl(imageUrl)
                .build();

        testimonyRepository.save(testimony);
        String message = "Testimonio creado satisfactoriamente";
        return new ApiResponse(200, message);

    }

    private String saveUploadedFileAudio(MultipartFile audio, String title) throws IOException {
        if (audio == null || audio.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "audio/wav", "audio/mpeg", "audio/x-ms-wma", "audio/acc" };
        long maxFileSize = 20 * 1024 * 1024; // 20 MB en bytes
        String uploadDir = AUDIO_DIRECTORY;
        return saveUploadedFile(audio, title, allowedTypes, maxFileSize, uploadDir);
    }

    private String saveUploadedFileVideo(MultipartFile video, String title) throws IOException {
        if (video == null || video.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "video/mp4", "video/x-msvideo", "video/x-ms-wmv", "video/webm" };
        long maxFileSize = 50 * 1024 * 1024; // 50 MB en bytes
        String uploadDir = VIDEO_DIRECTORY;
        return saveUploadedFile(video, title, allowedTypes, maxFileSize, uploadDir);
    }

    private String saveUploadedFileImage(MultipartFile image, String title) throws IOException {
        if (image == null || image.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "image/png", "image/jpeg", "image/jpg" };
        long maxFileSize = 10 * 1024 * 1024; // 10 MB en bytes
        String uploadDir = IMAGE_DIRECTORY;
        return saveUploadedFile(image, title, allowedTypes, maxFileSize, uploadDir);
    }

    private String saveUploadedFile(MultipartFile file, String title, String[] allowedTypes, long maxFileSize,
            String uploadDir) throws IOException {

        if (file == null || file.isEmpty()) {
            return null;
        }
        // Validar tipo de archivo
        boolean isValidType = Arrays.stream(allowedTypes).anyMatch(type -> type.equals(file.getContentType()));
        if (!isValidType) {
            throw new IllegalArgumentException("Tipo de archivo no permitido.");
        }

        // Validar tamaño del archivo
        if (file.getSize() > maxFileSize) {
            throw new MaxUploadSizeExceededException(maxFileSize / (1024 * 1024));
        }
        String fileName = title + "_" + file.getOriginalFilename();

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        try (OutputStream os = new FileOutputStream(filePath.toFile())) {
            os.write(file.getBytes());
        }
        return fileName;
    }

    @Override
    public Page<TestimonysDTO> findTestimonyByCategory(String category, Pageable pageable) {
        Page<Testimony> testimonyPage = testimonyRepository.findByCategory(category, pageable); 
        return testimonyPage.map(testimony -> TestimonysDTO.builder()
                        .testimonyId(testimony.getTestimonyId())
                        .category(testimony.getCategory())
                        .title(testimony.getTitle())
                        .description(testimony.getDescription())
                        .evenDate(testimony.getEvenDate())
                        .municipio(testimony.getMunicipio())
                        .department(testimony.getDepartment())
                        .descriptionDetail(testimony.getDescriptionDetail())
                        .audioUrl(testimony.getAudioUrl())
                        .videoUrl(testimony.getVideoUrl())
                        .imageUrl(testimony.getImageUrl())
                        .build());
    }
}
