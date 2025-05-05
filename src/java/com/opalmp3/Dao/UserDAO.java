/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Dao;

import com.opalmp3.Model.User;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 *
 * @author avinashpandey
 */
public interface UserDAO {
    boolean register(User user);
    User login(String username, String password);
//    boolean updatePassword(String username, String newPassword) throws Exception;

//    public String findUsernameByEmail(String email);

//    public String findUserByEmail(String email);
    public String findUserByEmailOrUsername(String identifier);

    public boolean updatePassword(String username, String newPassword);

    
    // for dashboard/ user
    public List<User> getAllUsers();

    public void addUser(User user);

    public void updateUser(User user);

    public void deleteUser(int id);
    
    // Registration form
    // check for email and username
    
    public boolean isEmailTaken(String email) throws Exception;
    public boolean isUsernameTaken(String username) throws Exception;

    
    // Pagination and all
//    public List<User> getAllUsers(int start, int limit);

//    public long getTotalUserCount();

    public Map<String, Object> getAllUsers(int start, int limit, String sortColumn, String sortOrder) throws Exception;
}
