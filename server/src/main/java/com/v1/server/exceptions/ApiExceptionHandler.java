package com.v1.server.exceptions;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

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
        String errorMessage = "Error de integridad en la base de datos.";

    // Obtener la causa raíz de la excepción
    Throwable rootCause = getRootCause(exception);

    if (rootCause instanceof SQLException) {
        SQLException sqlException = (SQLException) rootCause;
        String errorMessageDetail = sqlException.getMessage();

        // Analizar el mensaje de error para determinar qué campo está violando la restricción de integridad
        if (errorMessageDetail.contains("Duplicate entry") && errorMessageDetail.contains("for key 'UK_ob8kqyqqgmefl0aco34akdtpe'")) {
            errorMessage = "Ya existe un usuario con el mismo correo electrónico.";
        } else if (errorMessageDetail.contains("Duplicate entry") && errorMessageDetail.contains("for key 'UK_82p55ya4wxjmu3xcguqdmwc16'")) {
            errorMessage = "Ya existe un usuario con la misma identificación.";
        }
    }
        return new ResponseEntity<>(new ErrorMessage(errorMessage, HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI()), HttpStatus.BAD_REQUEST);
    }

    public Throwable getRootCause(Throwable throwable) {
        Throwable cause = throwable;
        while (cause.getCause() != null) {
            cause = cause.getCause();
        }
        return cause;
    }
}
