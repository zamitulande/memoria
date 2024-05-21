package com.v1.server.exceptions;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse {
    
    private int status;
    private String message;
    private Object data;

    public ApiResponse(Object data) {
        this.data = data;
    }

    public ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiResponse(int status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
