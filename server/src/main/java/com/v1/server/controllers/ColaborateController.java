package com.v1.server.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.server.dtos.colaborate.ColaborateDTO;
import com.v1.server.exceptions.ApiResponse;
import com.v1.server.services.ColaborateService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/v1")
public class ColaborateController {

    @Autowired
    private ColaborateService colaborateService;
    
    @PostMapping("/colaborate")
    public ApiResponse register(@RequestBody ColaborateDTO requesDto) throws MessagingException, IOException{
        return colaborateService.register(requesDto);
    }

    @GetMapping("/list-colaborate")
    public ResponseEntity<Page<ColaborateDTO>> findColaborates(
        @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Page<ColaborateDTO> colaboratePage = colaborateService.findAllColaborates(pageable);
        return ResponseEntity.ok(colaboratePage);
    }

    @DeleteMapping("/colaborate/delete/{colaborateId}")
    public ResponseEntity<?> deleteById(@PathVariable Long colaborateId) {
        colaborateService.deleteById(colaborateId);
        return ResponseEntity.ok("Colaborador eliminado");
    }
}
