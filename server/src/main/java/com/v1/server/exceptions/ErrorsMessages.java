package com.v1.server.exceptions;

import java.util.Map;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorsMessages {

    @JsonProperty("messages")
    private Map<String, String> messages;
    @JsonProperty("status_code")
    private int statusCode;
    @JsonProperty("status_name")
    private HttpStatus statusName;
    @JsonProperty("path")
    private String path;
}
