package com.v1.server.services.impl;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
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
            throws MessagingException, IOException, InterruptedException {

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
                .videoUrl(videoUrl) // Asignar URL HLS
                .imageUrl(imageUrl)
                .build();

        testimonyRepository.save(testimony);
        String message = "Testimonio creado satisfactoriamente";
        return new ApiResponse(200, message);

    }

    private String saveUploadedFileAudio(MultipartFile audio, String title) throws IOException, InterruptedException {
        if (audio == null || audio.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "audio/wav", "audio/mpeg", "audio/x-ms-wma", "audio/acc, audio/mp3" };
        long maxFileSize = 20 * 1024 * 1024; // 20 MB en bytes
        String uploadDir = AUDIO_DIRECTORY;

        String originalFileName = saveUploadedFile(audio, title, allowedTypes, maxFileSize, uploadDir, "audio");

        Path originalFilePath = Paths.get(uploadDir, originalFileName);

        String improvedFileName = title + audio.getOriginalFilename();
        Path improvedFilePath = Paths.get(uploadDir, improvedFileName);

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-i", originalFilePath.toString(),
                "-b:a", "128k",
                "-y",
                improvedFilePath.toString());

        pb.redirectErrorStream(true);
        try {
            Process process = pb.start();
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new IOException("Error al procesar el archivo con FFmpeg. Código de salida: " + exitCode);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Proceso interrumpido", e);
        }
        Files.deleteIfExists(originalFilePath);

        return improvedFileName;
    }

    private String saveUploadedFileVideo(MultipartFile video, String title)
            throws IOException, InterruptedException {
        if (video == null || video.isEmpty()) {
            return null;
        }

        String[] allowedTypes = { "video/mp4", "video/x-msvideo", "video/x-ms-wmv", "video/webm" };
        long maxFileSize = 2000 * 1024 * 1024; // 2000 MB en bytes
        String uploadDir = VIDEO_DIRECTORY;

        // Validar tipo de archivo
        boolean isValidType = Arrays.stream(allowedTypes).anyMatch(type -> type.equals(video.getContentType()));
        if (!isValidType) {
            throw new IllegalArgumentException("Tipo de archivo no permitido.");
        }

        // Validar tamaño del archivo
        if (video.getSize() > maxFileSize) {
            throw new IOException("El archivo excede el tamaño máximo permitido de 500 MB.");
        }

        // Crear el directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        //factorizar title como unico sin espacios
        String uuid = title.replace(" ", "_") + ".mp4";

        // Guardar el archivo en formato MP4
        String mp4FileName = uuid + ".mp4";
        Path mp4FilePath = uploadPath.resolve(mp4FileName);

        try (OutputStream os = new BufferedOutputStream(new FileOutputStream(mp4FilePath.toFile()), 8192)) {
            os.write(video.getBytes());
        }
       

        // Convertir a HLS usando FFmpeg
        String hlsOutputDir = uploadDir; // Directorio donde se guardará el HLS
        String hlsOutputPath = hlsOutputDir + "/" + uuid + ".m3u8"; // Nombre del archivo de salida HLS
        String hslFileName = uuid + ".m3u8";
        String ffmpegCommand = String.format(
                "ffmpeg -i %s -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls %s",
                mp4FilePath.toString(), hlsOutputPath);

        // Ejecutar el comando de FFmpeg
        Process process = Runtime.getRuntime().exec(ffmpegCommand);
        StringBuilder errorOutput = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                errorOutput.append(line).append("\n");
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new IOException("Error durante la conversión a HLS: " + errorOutput.toString());
        }

        Files.deleteIfExists(mp4FilePath);

        return hslFileName;
    }

    private String saveUploadedFileImage(MultipartFile image, String title) throws IOException {
        if (image == null || image.isEmpty()) {
            return null;
        }
        String[] allowedTypes = { "image/png", "image/jpeg", "image/jpg" };
        long maxFileSize = 3 * 1024 * 1024; // 2 MB en bytes
        String uploadDir = IMAGE_DIRECTORY;

        // Primero, validamos el archivo y lo guardamos en su formato original
        String originalFileName = saveUploadedFile(image, title, allowedTypes, maxFileSize, uploadDir, "imagen");

        // Ruta del archivo original
        Path originalFilePath = Paths.get(uploadDir, originalFileName);

        // Generar el nombre del archivo convertido y comprimido
        String webpFileName = title + image.getOriginalFilename().replaceFirst("[.][^.]+$", "")
                + ".webp";
        Path webpFilePath = Paths.get(uploadDir, webpFileName);

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-i", originalFilePath.toString(),
                "-vf", "scale=800:-1",
                "-compression_level", "6",
                "-qscale", "50",
                "-preset", "picture",
                "-y",
                webpFilePath.toString());

        pb.redirectErrorStream(true);
        try {
            Process process = pb.start();
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new IOException("Error al procesar la imagen con FFmpeg. Código de salida: " + exitCode);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Proceso interrumpido", e);
        }
        Files.deleteIfExists(originalFilePath);

        return webpFileName;
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
        try (OutputStream os = new BufferedOutputStream(new FileOutputStream(filePath.toFile()), 8192)) {
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
                // Si el audioUrl, videoUrl es null, retornar null, de lo contrario, construir
                // la URL
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
                // Si el audioUrl, videoUrl es null, retornar null, de lo contrario, construir
                // la URL
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
                // Si el audioUrl, videoUrl es null, retornar null, de lo contrario, construir
                // la URL
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
            MultipartFile image) throws IOException, InterruptedException {

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
            if (existingTestimony.getVideoUrl() != null) {
                deleteFile(VIDEO_DIRECTORY, existingTestimony.getVideoUrl());
                existingTestimony.setVideoUrl(null); // Eliminar la referencia al video
            }
            // Si ya hay un audio previo, eliminarlo antes de guardar el nuevo
            if (existingTestimony.getAudioUrl() != null) {
                deleteFile(AUDIO_DIRECTORY, existingTestimony.getAudioUrl());
            }
            String newAudioUrl = saveUploadedFileAudio(audio, title);
            existingTestimony.setAudioUrl(newAudioUrl);
        }

        if (video != null && !video.isEmpty()) {
            if (existingTestimony.getAudioUrl() != null) {
                deleteFile(AUDIO_DIRECTORY, existingTestimony.getAudioUrl());
                existingTestimony.setAudioUrl(null); // Eliminar la referencia al audio
            }
            // // Si ya hay un video previo, eliminarlo antes de guardar el nuevo
            // if (existingTestimony.getVideoUrl() != null) {
            // deleteFile(VIDEO_DIRECTORY, existingTestimony.getVideoUrl());
            // }
            // String newVideoUrl = saveUploadedFileVideo(video, title);
            // existingTestimony.setVideoUrl(newVideoUrl);
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
