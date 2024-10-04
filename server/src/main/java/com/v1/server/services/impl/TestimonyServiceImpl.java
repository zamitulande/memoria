package com.v1.server.services.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.testimony.TestimonysDTO;
import com.v1.server.entities.Testimony;
import com.v1.server.entities.User;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.exceptions.customExceptions.MaxUploadSizeFileException;
import com.v1.server.exceptions.customExceptions.NotFoundException;
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

    @Value("${path-load-file:pathFile}")
    private String pathFile;

    @Override
    public ApiResponse register(
            Long userId,
            String category,
            String title,
            String description,
            String evenDate,
            String department,
            String municipio,
            String descriptionDetail,
            String path,
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
                .evenDate(evenDate)
                .department(department)
                .municipio(municipio)
                .descriptionDetail(descriptionDetail)
                .path(path)
                .enabled(false)
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
        String[] allowedTypes = { "audio/wav", "audio/mpeg", "audio/x-ms-wma", "audio/acc, audio/mp3" };
        long maxFileSize = 10 * 1024 * 1024; // 20 MB en bytes
        String uploadDir = AUDIO_DIRECTORY;
        return saveUploadedFile(audio, title, allowedTypes, maxFileSize, uploadDir, "audio");
    }

    private String saveUploadedFileVideo(MultipartFile video, String title) throws IOException {
        if (video == null || video.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "video/mp4", "video/x-msvideo", "video/x-ms-wmv", "video/webm" };
        long maxFileSize = 500 * 1024 * 1024; // 50 MB en bytes
        String uploadDir = VIDEO_DIRECTORY;
        return saveUploadedFile(video, title, allowedTypes, maxFileSize, uploadDir, "video");
    }

    private String saveUploadedFileImage(MultipartFile image, String title) throws IOException {
        if (image == null || image.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "image/png", "image/jpeg", "image/jpg" };
        long maxFileSize = 1 * 1024 * 1024; // 1 MB en bytes
        String uploadDir = IMAGE_DIRECTORY;
        return saveUploadedFile(image, title, allowedTypes, maxFileSize, uploadDir, "imagen");
    }

    private String saveUploadedFile(MultipartFile file, String title, String[] allowedTypes, long maxFileSize,
            String uploadDir, String fileType) throws IOException {

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
            throw new MaxUploadSizeFileException(fileType, maxFileSize / (1024 * 1024));
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
    public Page<TestimonysDTO> findTestimonyByCategoryAdmin(String path, Pageable pageable) {
        Page<Testimony> testimonyPage = testimonyRepository.findByPath(path, pageable);
        return testimonyPage.map(testimony -> TestimonysDTO.builder()
                .testimonyId(testimony.getTestimonyId())
                .category(testimony.getCategory())
                .title(testimony.getTitle())
                .description(testimony.getDescription())
                .evenDate(testimony.getEvenDate())
                .municipio(testimony.getMunicipio())
                .department(testimony.getDepartment())
                .descriptionDetail(testimony.getDescriptionDetail())
                .path(testimony.getPath())
                .enabled(testimony.isEnabled())
               // Si el audioUrl, videoUrl es null, retornar null, de lo contrario, construir la URL
               .audioUrl(testimony.getAudioUrl() != null ? pathFile + "/audio/" + testimony.getAudioUrl() : null)              
               .videoUrl(testimony.getVideoUrl() != null ? pathFile + "/video/" + testimony.getVideoUrl() : null)
                .imageUrl(pathFile + "/image/" + testimony.getImageUrl())
                // Mapeando la información del usuario
                .userId(testimony.getUser().getUserId())
                .identification(testimony.getUser().getIdentification())
                .build());
    }

    @Override
    public Page<TestimonysDTO> findTestimonyByCategoryUser(String path, Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Page<Testimony> testimonyPage = testimonyRepository.findByPathAndEnabledOrUser(path, user, pageable);
        return testimonyPage.map(testimony -> TestimonysDTO.builder()
                .testimonyId(testimony.getTestimonyId())
                .category(testimony.getCategory())
                .title(testimony.getTitle())
                .description(testimony.getDescription())
                .evenDate(testimony.getEvenDate())
                .municipio(testimony.getMunicipio())
                .department(testimony.getDepartment())
                .descriptionDetail(testimony.getDescriptionDetail())
                .path(testimony.getPath())
                .enabled(testimony.isEnabled())
                .imageUrl(pathFile + "/image/" + testimony.getImageUrl())
                // Si el audioUrl, videoUrl es null, retornar null, de lo contrario, construir la URL
                .audioUrl(testimony.getAudioUrl() != null ? pathFile + "/audio/" + testimony.getAudioUrl() : null)              
                .videoUrl(testimony.getVideoUrl() != null ? pathFile + "/video/" + testimony.getVideoUrl() : null)               
                .build());
    }

    @Override
    public Page<TestimonysDTO> findTestimonyByCategoryAnonymous(String path, Pageable pageable) {
        Page<Testimony> testimonyPage = testimonyRepository.findByPathAndEnabledTrue(path, pageable);
        return testimonyPage.map(testimony -> TestimonysDTO.builder()
                .testimonyId(testimony.getTestimonyId())
                .category(testimony.getCategory())
                .title(testimony.getTitle())
                .description(testimony.getDescription())
                .evenDate(testimony.getEvenDate())
                .municipio(testimony.getMunicipio())
                .department(testimony.getDepartment())
                .descriptionDetail(testimony.getDescriptionDetail())
                .path(testimony.getPath())
                .enabled(testimony.isEnabled())
                // Si el audioUrl, videoUrl es null, retornar null, de lo contrario, construir la URL
                .audioUrl(testimony.getAudioUrl() != null ? pathFile + "/audio/" + testimony.getAudioUrl() : null)              
                .videoUrl(testimony.getVideoUrl() != null ? pathFile + "/video/" + testimony.getVideoUrl() : null)
                .imageUrl(pathFile + "/image/" + testimony.getImageUrl())
                .build());
    }

    @Override
    public ApiResponse updateTestimony(
            Long testimonyId,
            String category,
            String title,
            String description,
            String evenDate,
            String department,
            String municipio,
            String descriptionDetail,
            String path,
            MultipartFile audio,
            MultipartFile video,
            MultipartFile image) throws IOException {

        Testimony existingTestimony = testimonyRepository.findById(testimonyId)
                .orElseThrow(() -> new NotFoundException("Testimonio no encontrado"));

        existingTestimony.setCategory(category);
        existingTestimony.setTitle(title);
        existingTestimony.setDescription(description);
        existingTestimony.setEvenDate(evenDate);
        existingTestimony.setDepartment(department);
        existingTestimony.setMunicipio(municipio);
        existingTestimony.setDescriptionDetail(descriptionDetail);
        existingTestimony.setPath(path);
        existingTestimony.setEnabled(false);

        if (audio != null && !audio.isEmpty()) {
            if (existingTestimony.getAudioUrl() != null) {
                deleteFile(AUDIO_DIRECTORY, existingTestimony.getAudioUrl());
            }
            String newAudioUrl = saveUploadedFileAudio(audio, title);
            existingTestimony.setAudioUrl(newAudioUrl);
        }

        if (video != null && !video.isEmpty()) {
            if (existingTestimony.getVideoUrl() != null) {
                deleteFile(VIDEO_DIRECTORY, existingTestimony.getVideoUrl());
            }
            String newVideoUrl = saveUploadedFileVideo(video, title);
            existingTestimony.setVideoUrl(newVideoUrl);
        }

        if (image != null && !image.isEmpty()) {
            if (existingTestimony.getImageUrl() != null) {
                deleteFile(IMAGE_DIRECTORY, existingTestimony.getImageUrl());
            }
            String newImageUrl = saveUploadedFileImage(image, title);
            existingTestimony.setImageUrl(newImageUrl);
        }

        testimonyRepository.save(existingTestimony);

        String message = "Testimonio actualizado satisfactoriamente";
        return new ApiResponse(200, message);
    }

    private void deleteFile(String directory, String fileName) {
        Path filePath = Paths.get(directory).resolve(fileName);
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new IllegalStateException("No se pudo eliminar el archivo: " + fileName, e);
        }
    }

    public TestimonysDTO privateTestimony(Long testimonyId) {
        Testimony testimony = testimonyRepository.findById(testimonyId)
                .orElseThrow(() -> new NotFoundException("Testimonio no encontrado"));
        testimony.setEnabled(false);
        testimonyRepository.save(testimony);

        TestimonysDTO testimonysDTO = TestimonysDTO.builder()
                .enabled(testimony.isEnabled())
                .build();
        return testimonysDTO;
    }

    public TestimonysDTO publicTestimony(Long testimonyId) {
        Testimony testimony = testimonyRepository.findById(testimonyId)
                .orElseThrow(() -> new NotFoundException("Testimonio no encontrado"));
        testimony.setEnabled(true);
        testimonyRepository.save(testimony);

        TestimonysDTO testimonysDTO = TestimonysDTO.builder()
                .enabled(testimony.isEnabled())
                .build();
        return testimonysDTO;
    }

}
