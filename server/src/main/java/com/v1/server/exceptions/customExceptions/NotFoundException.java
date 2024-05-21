package com.v1.server.exceptions.customExceptions;

import java.util.NoSuchElementException;


public class NotFoundException extends NoSuchElementException{

    
    public NotFoundException(String message) {
        super(message);
    }

}
