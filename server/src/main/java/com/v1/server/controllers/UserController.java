package com.v1.server.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.UserService;

import jakarta.mail.MessagingException;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    private static final String CONSENTIMIENTO_DIRECTORY = "./storage/user/consentimiento-informado/";

    // registra admin
    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse register(
            @RequestParam String firstName,
            @RequestParam String secondName,
            @RequestParam String firstLastName,
            @RequestParam String secondLastName,
            @RequestParam String typeId,
            @RequestParam String dateBirth,
            @RequestParam String gender,
            @RequestParam String poblacion,
            @RequestParam String disability,
            @RequestParam String contactNumber,
            @RequestParam String department,
            @RequestParam String municipio,
            @RequestParam String identification,
            @RequestParam String email,
            @RequestParam String confirmEmail,
            @RequestParam String password,
            @RequestParam String confirmPassword,
            @RequestParam("document") MultipartFile document)
            throws MessagingException, IOException {
        return userService.register(firstName,
                secondName,
                firstLastName,
                secondLastName,
                gender,
                poblacion,
                disability,
                contactNumber,
                department,
                municipio,
                identification,
                email,
                confirmEmail,
                password,
                confirmPassword,
                document,
                typeId,
                dateBirth);
    }

    @GetMapping("")
    public ResponseEntity<Page<UsersDTO>> findAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UsersDTO> userPage;
        // Verificar si el parámetro de búsqueda está presente
        if (search != null && !search.isEmpty()) {
            userPage = userService.findUsersByIdentification(search, pageable);
        } else {
            userPage = userService.findAllUsers(pageable);
        }
        return ResponseEntity.ok(userPage);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<UsersDTO> update(@PathVariable Long userId, @RequestBody UsersDTO userUpdateDTO) {
        UsersDTO updatedUserDTO = userService.updateUser(userId, userUpdateDTO);
        return ResponseEntity.ok(updatedUserDTO);

    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteById(@PathVariable Long userId) {
        userService.deleteById(userId);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @PutMapping("/block/{userId}")
    public ResponseEntity<UsersDTO> blockUser(@PathVariable Long userId) {
        UsersDTO blockedUser = userService.blockUser(userId);
        return ResponseEntity.ok(blockedUser);
    }

    @PutMapping("/unblock/{userId}")
    public ResponseEntity<UsersDTO> unblockUser(@PathVariable Long userId) {
        UsersDTO unblockedUser = userService.unblockUser(userId);
        return ResponseEntity.ok(unblockedUser);
    }

    @GetMapping("/consentimiento/{consentimientoName}")
    public ResponseEntity<Resource> getConsentimiento(@PathVariable String consentimientoName) throws IOException {

        try {
            Path pdfPath = Paths.get(CONSENTIMIENTO_DIRECTORY + consentimientoName);
            System.out.println(pdfPath);
            Resource resource = new UrlResource(pdfPath.toUri());

            if (resource.exists() && resource.isReadable()) {
                MediaType contenType = determineContentType(consentimientoName);
                return ResponseEntity.ok()
                        .contentType(contenType)
                        .body(resource);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private MediaType determineContentType(String consentimientoName) {
        String[] parts = consentimientoName.split("\\.");
        String extension = parts[parts.length - 1];
        return MediaType.parseMediaType("image/" + extension.toLowerCase());
    }
}
