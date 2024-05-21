package com.v1.server.exceptions;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class ApiExceptionHandler {
    
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorMessage> handleIllegalArgumentException(HttpServletRequest request, IllegalArgumentException exception){
        return new ResponseEntity<>(new ErrorMessage(exception.getMessage(), HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<ErrorsMessages> handleValidationError(HttpServletRequest request, ConstraintViolationException exception) {
        Map<String, String> transformedError = new HashMap<>();
        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            String fieldName = violation.getPropertyPath().toString();
            transformedError.put(fieldName.substring(fieldName.lastIndexOf('.') + 1), violation.getMessage());
        }
        return new ResponseEntity<>(new ErrorsMessages(transformedError, HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorMessage> handleDataIntegrityViolation(HttpServletRequest request, DataIntegrityViolationException exception){
        String errorMessage = "";

        if (exception.getMessage().contains("Duplicate entry")) {
            String regex = "'(.+?)'";
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(exception.getMessage());
            if (matcher.find()) {
                String duplicate = matcher.group(1);
                errorMessage = "El usuario con '" + duplicate + "' ya está registrado.";
            }
        }
        return new ResponseEntity<>(new ErrorMessage(errorMessage, HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NoSuchElementException.class})
    public ResponseEntity<ErrorMessage> handleNoSuchElementException(HttpServletRequest request, NoSuchElementException ex) {
        return new ResponseEntity<>(new ErrorMessage("Token invalido", HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND, request.getRequestURI()), HttpStatus.NOT_FOUND);
        
    }
}
