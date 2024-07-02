package com.v1.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.user.UsersDTO;
import com.v1.server.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<Page<UsersDTO>> findAllUsers(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UsersDTO> userPage = userService.findAllUsers(pageable);
        return ResponseEntity.ok(userPage);
    }

    @PutMapping("/users/update/{userId}")
    public ResponseEntity<UsersDTO> update(@PathVariable Long userId, @RequestBody UsersDTO userUpdateDTO) {
        UsersDTO updatedUserDTO = userService.updateUser(userId, userUpdateDTO);
        return ResponseEntity.ok(updatedUserDTO);

    }

    @DeleteMapping("users/delete/{userId}")
    public ResponseEntity<?> deleteById(@PathVariable Long userId) {
        System.out.println(userId);
        userService.deleteById(userId);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @PutMapping("/users/block/{userId}")
    public ResponseEntity<UsersDTO> blockUser(@PathVariable Long userId) {
        UsersDTO blockedUser = userService.blockUser(userId);
        return ResponseEntity.ok(blockedUser);
    }

    @PutMapping("/users/unblock/{userId}")
    public ResponseEntity<UsersDTO> unblockUser(@PathVariable Long userId) {
        UsersDTO unblockedUser = userService.unblockUser(userId);
        return ResponseEntity.ok(unblockedUser);
    }
}
