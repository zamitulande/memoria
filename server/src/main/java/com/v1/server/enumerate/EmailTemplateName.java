package com.v1.server.enumerate;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    
    activate_account("activate_account");

    private final String name;

    EmailTemplateName(String name){
        this.name = name;
    }
}
