package com.v1.server.services.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.entities.User;
import com.v1.server.enumerate.EmailTemplateName;
import com.v1.server.enumerate.Role;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.exceptions.customExceptions.MaxUploadSizeFileException;
import com.v1.server.exceptions.customExceptions.NotFoundException;
import com.v1.server.repositories.UserRepository;
import com.v1.server.services.EmailService;
import com.v1.server.services.UserService;

import jakarta.mail.MessagingException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${activation-url:activationUrl}")
    private String activationUrl;

    @Value("${login-user:loginUser}")
    private String loginUser;

    private static final String CONSENTIMIENTO_DIRECTORY = "./storage/user/consentimiento-informado";

    //registra admin
    @Override
    public ApiResponse register(
            String firstName,
            String secondName,
            String firstLastName,
            String secondLastName,
            String gender,
            String poblacion,
            String disability,
            String contactNumber,
            String department,
            String municipio,
            String identification,
            String email,
            String confirmEmail,
            String password,
            String confirmPassword,
            MultipartFile document,
            String typeId
            ) throws MessagingException, IOException {

        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }
        if (!email.equals(confirmEmail)) {
            throw new IllegalArgumentException("Los correos electronicos no coiciden");
        }

        String documentUrl = saveUploadedFile(document, identification);

        var user = User.builder()
                .firstName(firstName)
                .secondName(secondName)
                .firstLastName(firstLastName)
                .secondLastName(secondLastName)
                .gender(gender)
                .poblacion(poblacion)
                .disability(disability)
                .identification(identification)
                .contactNumber(contactNumber)
                .department(department)
                .municipio(municipio)
                .email(email)
                .password(passwordEncoder.encode(password))
                .accountLocked(false)
                .enabled(true)
                .documentUrl(documentUrl)
                .typeId(typeId)
                .role(Role.USER)
                .build();

        String plainPassword = password;
        User savedUser = userRepository.save(user);
        try {
            sendValidationEmail(savedUser, plainPassword);
        } finally {
            plainPassword = null;
        }
        Long userId = savedUser.getUserId(); 
        String message = "Usuario creado satisfactoriamente";
        return new ApiResponse(200, message, userId);

    }

    private String saveUploadedFile(MultipartFile file, String identification) throws IOException {

        // Validar tipo de archivo
    if (!file.getContentType().equals("application/pdf")) {
        throw new IllegalArgumentException("El archivo debe ser de tipo PDF.");
    }

    // Validar tamaño del archivo (máximo 3 MB)
    long maxFileSize = 3 * 1024 * 1024; // 3 MB en bytes
    if (file.getSize() > maxFileSize) {
        throw new MaxUploadSizeFileException("pdf", maxFileSize / (1024 * 1024));
    }
        String fileName = identification+"_"+file.getOriginalFilename();

        String uploadDir = CONSENTIMIENTO_DIRECTORY ;
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

    private void sendValidationEmail(User user, String plainPassword) throws MessagingException {

        String email = user.getEmail();
        String password = plainPassword;

        // send email
        emailService.sendEmail(
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
                EmailTemplateName.login_user,
                loginUser,
                null,
                password,
                email,                
                "Ingreso plataforma");
    }

    @Override
    public Page<UsersDTO> findAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findByRole(Role.USER, pageable);
        return userPage.map(user -> UsersDTO.builder()
                .userId(user.getUserId())
                .identification(user.getIdentification())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .secondName(user.getSecondName())
                .firstLastName(user.getFirstLastName())
                .secondLastName(user.getSecondLastName())
                .gender(user.getGender())
                .poblacion(user.getPoblacion())
                .disability(user.getDisability())
                .contactNumber(user.getContactNumber())
                .accountLocked(user.isAccountLocked())
                .municipio(user.getMunicipio())
                .department(user.getDepartment())
                .documentUrl(user.getDocumentUrl())
                .email(user.getEmail())
                .typeId(user.getTypeId())
                .build());
    }

    @Override
    public Page<UsersDTO> findUsersByIdentification(String search, Pageable pageable) {
        Page<User> userPage = userRepository.findByRoleAndIdentificationContaining(Role.USER, search, pageable);
        return userPage.map(user -> UsersDTO.builder()
                .userId(user.getUserId())
                .identification(user.getIdentification())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .secondName(user.getSecondName())
                .firstLastName(user.getFirstLastName())
                .secondLastName(user.getSecondLastName())
                .gender(user.getGender())
                .poblacion(user.getPoblacion())
                .disability(user.getDisability())
                .contactNumber(user.getContactNumber())
                .accountLocked(user.isAccountLocked())
                .municipio(user.getMunicipio())
                .department(user.getDepartment())
                .documentUrl(user.getDocumentUrl())
                .email(user.getEmail())
                .typeId(user.getTypeId())
                .build());
    }

    @Override
    public UsersDTO updateUser(Long userId, UsersDTO userUpdateDTO) {

        if (!userUpdateDTO.getEmail().equals(userUpdateDTO.getConfirmEmail())) {
            throw new IllegalArgumentException("Los correos electronicos no coiciden");
        }
        Optional<User> userOption = userRepository.findById(userId);
        if (userOption.isPresent()) {
            User user = userOption.get();
            user.setFirstName(userUpdateDTO.getFirstName());
            user.setSecondName(userUpdateDTO.getSecondName());
            user.setFirstLastName(userUpdateDTO.getFirstLastName());
            user.setSecondLastName(userUpdateDTO.getSecondLastName());
            user.setGender(userUpdateDTO.getGender());
            user.setPoblacion(userUpdateDTO.getPoblacion());
            user.setDisability(userUpdateDTO.getDisability());
            user.setContactNumber(userUpdateDTO.getContactNumber());
            user.setDepartment(userUpdateDTO.getDepartment());
            user.setMunicipio(userUpdateDTO.getMunicipio());
            user.setIdentification(userUpdateDTO.getIdentification());
            user.setEmail(userUpdateDTO.getEmail());
            user.setTypeId(userUpdateDTO.getTypeId());
            userRepository.save(user);

            UsersDTO updateDTO = UsersDTO.builder()
                    .firstName(user.getFirstName())
                    .secondName(user.getSecondName())
                    .firstLastName(user.getFirstLastName())
                    .secondLastName(user.getSecondLastName())
                    .gender(user.getGender())
                    .poblacion(user.getPoblacion())
                    .disability(user.getDisability())
                    .contactNumber(user.getContactNumber())
                    .department(user.getDepartment())
                    .municipio(user.getMunicipio())
                    .identification(user.getIdentification())
                    .email(user.getEmail())
                    .typeId(user.getTypeId())
                    .build();

            return updateDTO;
        } else {
            throw new NotFoundException("Usuario no encontrado.");
        }
    }

    @Override
    public void deleteById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado."));
        userRepository.delete(user);
    }

    public UsersDTO blockUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        user.setAccountLocked(true);
        userRepository.save(user);

        UsersDTO usersDTO = UsersDTO.builder()
                    .accountLocked(user.isAccountLocked())
                    .build();
        return usersDTO;
    }

    public UsersDTO unblockUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        user.setAccountLocked(false);
        userRepository.save(user);

        UsersDTO usersDTO = UsersDTO.builder()
                    .accountLocked(user.isAccountLocked())
                    .build();
        return usersDTO;
    }
   
}
