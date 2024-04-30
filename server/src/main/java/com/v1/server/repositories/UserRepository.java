package com.v1.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.server.entities.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Long>{
    
    Optional<User> findByEmail(String email);
}
