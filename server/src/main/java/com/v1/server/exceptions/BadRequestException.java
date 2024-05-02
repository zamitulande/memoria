package com.v1.server.exceptions;

public class BadRequestException extends RuntimeException{

    private static final String DESCRiPTION = "Bad Request Exception (400)";

    public BadRequestException(String details){
        super(DESCRiPTION+" "+details);
    }
    
}
