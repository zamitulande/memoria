package com.v1.server.exceptions;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ErrorMessage {

    @JsonProperty("message")
    private String message;
    @JsonProperty("status_code")
    private int statusCode;
    @JsonProperty("status_name")
    private HttpStatus statusName;
    @JsonProperty("path")
    private String path;

    public ErrorMessage(String message, int statusCode, HttpStatus statusName, String path) {
        this.message = message;
        this.statusCode = statusCode;
        this.statusName = statusName;
        this.path = path;
    }
}
