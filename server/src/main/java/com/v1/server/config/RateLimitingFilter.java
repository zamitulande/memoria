package com.v1.server.config;

import java.io.IOException;
import java.time.Duration;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.v1.server.exceptions.ErrorMessage;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RateLimitingFilter implements Filter {
    
    private final Bucket bucket;
    private final ObjectMapper objectMapper;

    public RateLimitingFilter() {
        Bandwidth limit = Bandwidth.classic(3, Refill.greedy(3, Duration.ofMinutes(10)));
        this.bucket = Bucket.builder().addLimit(limit).build();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;

             ErrorMessage errorMessage = new ErrorMessage(
                "Demaciados intentos fallidos, Click en Olvide Contraseña",
                HttpServletResponse.SC_MULTIPLE_CHOICES,
                HttpStatus.TOO_MANY_REQUESTS,
                httpServletRequest.getRequestURI()
            );
            String jsonResponse = objectMapper.writeValueAsString(errorMessage);

            httpServletResponse.setStatus(HttpServletResponse.SC_MULTIPLE_CHOICES);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.getWriter().write(jsonResponse);

        }
    }

    @Override
    public void destroy() {}
}
