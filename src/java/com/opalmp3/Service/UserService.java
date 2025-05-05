/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Service;

import com.opalmp3.Model.User;


/**
 *
 * @author avinashpandey
 */
public interface UserService {
    
    boolean registerUser(String username,String password, String email, String role);
    User validateUser(String username, String password);
//    boolean resetPassword(String username, String password) throws Exception;

//    public String getUsernameByEmail(String email);
    public String getUserByEmailOrUsername(String identifier);

    public boolean updatePassword(String username, String newPassword);

    
    // Register form
    // Check for user name or email taken 
    public boolean isUsernameTaken(String username);

    public boolean isEmailTaken(String email);
}
