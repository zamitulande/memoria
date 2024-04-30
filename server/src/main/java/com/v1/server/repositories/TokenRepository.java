package com.v1.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.server.entities.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long>{
    
    Optional<Token> findByToken(String token);
}
