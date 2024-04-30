package com.v1.server.helpers;

public class PasswordConfirmation {
    
    public static boolean passwordMatch(String password, String confirmPassword){
        return password.equals(confirmPassword);
    }
}
