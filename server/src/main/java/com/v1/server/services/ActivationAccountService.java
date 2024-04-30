package com.v1.server.services;

import com.v1.server.entities.User;

public interface ActivationAccountService {
    
    public String generateActivationToken(User user);
}
