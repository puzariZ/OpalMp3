package com.opalmp3.Service;

import com.opalmp3.Model.User;
import com.opalmp3.Dao.UserDAO;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService  {

    private UserDAO userDAO;
    
    @Autowired    
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public boolean registerUser (String username, String password, String email, String role) {
        
        User user = new User(username, password, email, role);
        try {
            boolean val  = this.userDAO.register(user);
            return val;
        } catch (Exception e) {
            // Handling exception (user already exists)
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public User validateUser (String username, String password) {
        return userDAO.login(username, password);
    }

//    @Override
//    public String getUsernameByEmail(String email) {
//        
//    String username = userDAO.findUserByEmail(email);
//    
//    return username != null ? username : null;
//    }
    @Override
    public String getUserByEmailOrUsername(String identifier) {
    return userDAO.findUserByEmailOrUsername(identifier);
}


    @Override
    public boolean updatePassword(String username, String newPassword) {
        return userDAO.updatePassword(username, newPassword);
    }

    // Check for username and email taken or not 
    @Override
    public boolean isUsernameTaken(String username) {
        try {
            return userDAO.isUsernameTaken(username);
        } catch (Exception ex) {
            return false;
//             Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
//        return false;
    }

    @Override
    public boolean isEmailTaken(String email) {
        try {
            return userDAO.isEmailTaken(email);
        } catch (Exception ex) {
            return false;
//            Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
}