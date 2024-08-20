package com.v1.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.server.entities.Testimony;

@Repository
public interface TestimonyRepository extends JpaRepository<Testimony, Long> {
    
    Page<Testimony> findByPathAndEnabledFalse(String path, Pageable pageable);
}
