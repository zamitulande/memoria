package com.v1.server.services.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

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
                    .orElseThrow(()-> new IllegalArgumentException("Usuario no encontrado"));

        String audioUrl = saveUploadedFileAudio(audio, title);
        String videoUrl = saveUploadedFileVideo(video, title);
        String imageUrl = saveUploadedFileImage(image, title);

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
        return new ApiResponse(200, message );

    }

    private String saveUploadedFileAudio(MultipartFile audio, String title) throws IOException {
       
        // Validar tipo de archivo
    if (!audio.getContentType().equals("audio/wav") && !audio.getContentType().equals("audio/mpeg") &&
        !audio.getContentType().equals("audio/x-ms-wma") && !audio.getContentType().equals("audio/acc")) {
        throw new IllegalArgumentException("El archivo debe ser de tipo WAV, MP3, WMA o ACC.");
    }

    // Validar tamaño del archivo (máximo 10 MB)
    long maxFileSize = 20 * 1024 * 1024; // 10 MB en bytes
    if (audio.getSize() > maxFileSize) {
        throw new MaxUploadSizeExceededException(20);
    }
        String fileName = title+"_"+audio.getOriginalFilename();

        String uploadDir = AUDIO_DIRECTORY;
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        try (OutputStream os = new FileOutputStream(filePath.toFile())) {
            os.write(audio.getBytes());
        }
        return fileName;
    }


    private String saveUploadedFileVideo(MultipartFile video, String title) throws IOException {

        // Validar tipo de archivo
    if (!video.getContentType().equals("video/mp4") && !video.getContentType().equals("video/x-msvideo") &&
        !video.getContentType().equals("video/x-ms-wmv") && !video.getContentType().equals("video/webm")) {
        throw new IllegalArgumentException("El archivo debe ser de tipo MP4, AVI, WMV o WEBM.");
    }

    // Validar tamaño del archivo (máximo 500 MB)
    long maxFileSize = 50 * 1024 * 1024; // 500 MB en bytes
    if (video.getSize() > maxFileSize) {
        throw new MaxUploadSizeExceededException(50);
    }
        String fileName = title+"_"+video.getOriginalFilename();

        String uploadDir = VIDEO_DIRECTORY;
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        try (OutputStream os = new FileOutputStream(filePath.toFile())) {
            os.write(video.getBytes());
        }
        return fileName;
    }

    private String saveUploadedFileImage(MultipartFile image, String title) throws IOException {

        // Validar tipo de archivo
    if (!image.getContentType().equals("image/png") && !image.getContentType().equals("image/jpeg") &&
        !image.getContentType().equals("image/jpg")) {
        throw new IllegalArgumentException("El archivo debe ser de tipo PNG, JPG o JPEG.");
    }

    // Validar tamaño del archivo (máximo 3 MB)
    long maxFileSize = 10 * 1024 * 1024; // 3 MB en bytes
    if (image.getSize() > maxFileSize) {
        throw new MaxUploadSizeExceededException(10);
    }
        String fileName = title+"_"+image.getOriginalFilename();

        String uploadDir = IMAGE_DIRECTORY;
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        try (OutputStream os = new FileOutputStream(filePath.toFile())) {
            os.write(image.getBytes());
        }
        return fileName;
    }

}
