package com.v1.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.entities.User;
import com.v1.server.enumerate.Role;
import com.v1.server.repositories.UserRepository;
import com.v1.server.services.UserService;

@Service
public class UserServiceImpl  implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<UsersDTO> findAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findByRole(Role.USER, pageable);
        System.out.println(userPage);
        return userPage.map(user->UsersDTO.builder()
                .userId(user.getUserId())
                .role(user.getRole())
                .identification(user.getIdentification())
                .names(user.getFirstName()+" "+user.getSecondName())
                .lastNames(user.getFirstLastName()+" "+user.getSecondLastName())
                .contactNumber(user.getContactNumber())
                .municipio(user.getMunicipio() + "-"+ user.getDepartment())
                .email(user.getEmail())
                .build());
    }
    
}
