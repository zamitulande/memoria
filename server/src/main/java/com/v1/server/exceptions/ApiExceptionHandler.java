package com.v1.server.exceptions;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.v1.server.exceptions.customExceptions.AccessDeniedException;
import com.v1.server.exceptions.customExceptions.ExpireTokenException;
import com.v1.server.exceptions.customExceptions.NotFoundException;

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

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ErrorMessage> notFoudException(HttpServletRequest request, NoSuchElementException ex){
        ErrorMessage errorMessage = new ErrorMessage(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ExpireTokenException.class})
    public ResponseEntity<ErrorMessage> TokenExpired(HttpServletRequest request, ExpireTokenException ex){
        ErrorMessage errorMessage = new ErrorMessage(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorMessage> handleAuthenticationException (HttpServletRequest request, AuthenticationException ex){
        ErrorMessage errorMessage = new ErrorMessage("Tus credenciales son incorrectas o tu cuenta esta bloqueada, revisa tu correo", HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorMessage> handleExceedefile(HttpServletRequest request, MaxUploadSizeExceededException ex){
        ErrorMessage errorMessage = new ErrorMessage("Archivo supera el limite de peso.", HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
