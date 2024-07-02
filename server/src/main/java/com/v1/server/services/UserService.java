package com.v1.server.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.user.UsersDTO;

@Service
public interface UserService {

    Page<UsersDTO> findAllUsers(Pageable pageable);

    UsersDTO updateUser(Long userId, UsersDTO userUpdateDTO);

    void deleteById(Long userId);

    UsersDTO blockUser(Long userId);

    UsersDTO unblockUser(Long userId);
} 
