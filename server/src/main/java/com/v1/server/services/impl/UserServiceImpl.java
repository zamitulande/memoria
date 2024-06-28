package com.v1.server.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.v1.server.dtos.user.UserUpdateDTO;
import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.entities.User;
import com.v1.server.enumerate.Role;
import com.v1.server.exceptions.customExceptions.NotFoundException;
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

    @Override
    public UserUpdateDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        Optional<User> userOption = userRepository.findById(id);
        if (userOption.isPresent()) {
            User user = userOption.get();
            user.setFirstName(userUpdateDTO.getFirstName());
            user.setSecondName(userUpdateDTO.getSecondName());
            user.setFirstLastName(userUpdateDTO.getFirstLastName());
            user.setSecondLastName(userUpdateDTO.getSecondLastName());
            user.setContactNumber(userUpdateDTO.getContactNumber());
            user.setDepartment(userUpdateDTO.getDepartment());
            user.setMunicipio(userUpdateDTO.getMunicipio());
            user.setIdentification(userUpdateDTO.getIdentification());
            user.setEmail(userUpdateDTO.getEmail());
            user.setConfirmEmail(userUpdateDTO.getConfirmEmail());
            userRepository.save(user);

            UserUpdateDTO updateDTO = UserUpdateDTO.builder()
                    .firstName(user.getFirstName())
                    .secondName(user.getSecondName())
                    .firstLastName(user.getFirstLastName())
                    .secondLastName(user.getSecondLastName())
                    .contactNumber(user.getContactNumber())
                    .department(user.getDepartment())
                    .municipio(user.getMunicipio())
                    .identification(user.getIdentification())
                    .email(user.getEmail())
                    .confirmEmail(user.getConfirmEmail())
                    .build();


            return updateDTO;
        } else {
            throw new NotFoundException("User not found with id: " + id);
        }
    }
    
}
