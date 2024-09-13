package com.v1.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.server.entities.Colaborate;

@Repository
public interface ColaborateRepository extends JpaRepository<Colaborate, Long> {
    
}
