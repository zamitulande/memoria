package com.v1.server.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.server.entities.User;
import com.v1.server.enumerate.Role;

@Repository
public interface UserRepository  extends JpaRepository<User, Long>{
    
    Optional<User> findByEmail(String email);

    Optional<User> findByIdentification(String identification);

    Page<User> findByRole(Role role, Pageable pageable);

    Page<User> findByRoleAndIdentificationContaining(Role role, String identification, Pageable pageable);
}
