package com.v1.server.exceptions;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse {
    
    private int status;
    private String message;
    private Long id;

    public ApiResponse(Long id) {
        this.id = id;
    }

    public ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiResponse(int status, String message, Long id) {
        this.status = status;
        this.message = message;
        this.id = id;
    }
}
