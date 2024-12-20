package com.v1.server.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/repository/files")
public class FileController {

    private final String FILE_DIRECTORY = "storage/testimony/";

    @GetMapping("/show/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        Path file = Paths.get(FILE_DIRECTORY).resolve("image").resolve(filename);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new FileSystemResource(file.toFile());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @GetMapping("/show/audio/{filename}")
    public ResponseEntity<Resource> getAudio(@PathVariable String filename) {
        Path file = Paths.get(FILE_DIRECTORY).resolve("audio").resolve(filename);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new FileSystemResource(file.toFile());
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("audio/mp3"))
                .body(resource);
    }

    @GetMapping("/show/video/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String filename) {

        //se formatea filename para obtener el nombre de la carpeta donde se aloja
        //los archivos .m3u8 y .ts
        String folderVideo;
        if (filename.endsWith(".m3u8")) {
            folderVideo = filename.substring(0, filename.lastIndexOf(".m3u8"));
        } else if (filename.endsWith(".ts")) {
            String baseName = filename.substring(0, filename.lastIndexOf(".ts"));
            folderVideo = baseName.replaceAll("\\d+$", "");
        } else {
            return ResponseEntity.badRequest().build();
        }

        Path file = Paths.get(FILE_DIRECTORY).resolve("video").resolve(folderVideo).resolve(filename);
        System.out.println(file);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }
        Resource resource = new FileSystemResource(file.toFile());
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.apple.mpegurl"))
                .body(resource);
    }
}
