package com.v1.server.services;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.exceptions.ApiResponse;

import jakarta.mail.MessagingException;

@Service
public interface UserService {

    //registra admin
     ApiResponse register(
            String firstName,
            String secondName,
            String firstLastName,
            String secondLastName,
            String contactNumber,
            String department,
            String municipio,
            String identification,
            String email,
            String confirmEmail,
            String password,
            String confirmPassword,
            MultipartFile document
            ) throws MessagingException, IOException;

    Page<UsersDTO> findAllUsers(Pageable pageable);

    Page<UsersDTO> findUsersByIdentification(String search, Pageable pageable);

    UsersDTO updateUser(Long userId, UsersDTO userUpdateDTO);

    void deleteById(Long userId);

    UsersDTO blockUser(Long userId);

    UsersDTO unblockUser(Long userId);
} 
