package com.v1.server.helpers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.v1.server.entities.Testimony;

import jakarta.persistence.criteria.Predicate;

public class TestimonySpecification {
    
     public static Specification<Testimony> getTestimoniesWithFilters(String category, String department, String municipio, String evenDateStart, String evenDateEnd, String search) {
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
            if (search != null && !search.isEmpty()) {
                Predicate searchInTitle = criteriaBuilder.like(root.get("title"), "%" + search + "%");
                Predicate searchInDescription = criteriaBuilder.like(root.get("description"), "%" + search + "%");
                predicates.add(criteriaBuilder.or(searchInTitle, searchInDescription));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
