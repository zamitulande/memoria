package com.v1.server.helpers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.v1.server.entities.Testimony;

import jakarta.persistence.criteria.Predicate;

public class TestimonySpecification {
    
     public static Specification<Testimony> getTestimoniesWithFilters(String category, String department, String municipio, String evenDateStart, String evenDateEnd, String keyword) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtro por categoría
            if (category != null && !category.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }
            // Filtro por departamento
            if (department != null && !department.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("department"), department));
            }
            // Filtro por municipio
            if (municipio != null && !municipio.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("municipio"), municipio));
            }
            // Filtro por rango de fechas
            if (evenDateStart != null && !evenDateStart.isEmpty() && evenDateEnd != null && !evenDateEnd.isEmpty()) {
                predicates.add(criteriaBuilder.between(root.get("evenDate"), evenDateStart, evenDateEnd));
            }
            if (keyword != null && !keyword.isEmpty()) {
                Predicate keywordInTitle = criteriaBuilder.like(root.get("title"), "%" + keyword + "%");
                Predicate keywordInDescription = criteriaBuilder.like(root.get("description"), "%" + keyword + "%");
                predicates.add(criteriaBuilder.or(keywordInTitle, keywordInDescription));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
