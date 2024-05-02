package com.v1.server.exceptions;

import java.util.HashMap;
import java.util.Map;

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
}
