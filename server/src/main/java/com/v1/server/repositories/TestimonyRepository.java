package com.v1.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.v1.server.entities.Testimony;
import com.v1.server.entities.User;

@Repository
public interface TestimonyRepository extends JpaRepository<Testimony, Long> {

    Page<Testimony> findByPath(String path, Pageable pageable);

    Page<Testimony> findByPathAndEnabledTrue(String path, Pageable pageable);

    @Query("SELECT t FROM Testimony t WHERE t.path = :path AND (t.enabled = true OR (t.enabled = false AND t.user = :user))")
    Page<Testimony> findByPathAndEnabledOrUser(@Param("path") String path, @Param("user") User user, Pageable pageable);

}
