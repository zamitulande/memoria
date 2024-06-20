package com.v1.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.entities.User;
import com.v1.server.repositories.UserRepository;
import com.v1.server.services.UserService;

@Service
public class UserServiceImpl  implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<UsersDTO> findAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(user->UsersDTO.builder()
                .userId(user.getUserId())
                .role(user.getRole())
                .identification(user.getIdentification())
                .names(user.getFirstName()+user.getSecondName())
                .lastNames(user.getFirstLastName()+user.getSecondLastName())
                .contactNumber(user.getContactNumber())
                .department(user.getDepartment())
                .municipio(user.getMunicipio())
                .email(user.getEmail())
                .build());
    }
    
}
