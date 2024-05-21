package com.v1.server.exceptions.customExceptions;

public class ExpireTokenException extends RuntimeException{
    
    public ExpireTokenException(String message) {
        super(message);
    }
}
