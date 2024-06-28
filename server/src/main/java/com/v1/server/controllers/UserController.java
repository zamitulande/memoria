package com.v1.server.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.user.UserUpdateDTO;
import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.exceptions.customExceptions.NotFoundException;
import com.v1.server.services.UserService;
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public ResponseEntity<Page<UsersDTO>> findAllUsers(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<UsersDTO> userPage = userService.findAllUsers(pageable);
        return ResponseEntity.ok(userPage);
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<UserUpdateDTO> update (@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO){
            try {
                UserUpdateDTO updatedUserDTO = userService.updateUser(id, userUpdateDTO);
                return ResponseEntity.ok(updatedUserDTO);
            } catch (NotFoundException e) {
                return ResponseEntity.notFound().build();
            }
    }
}
