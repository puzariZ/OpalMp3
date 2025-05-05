/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Controller;

import com.opalmp3.Dao.UserDAO;
import com.opalmp3.Model.User;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author avinashpandey
 */
@Controller
public class UserController {
    @Autowired
    private UserDAO userDAO;

    // 🔹 Get All Users
//    @RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
//    @ResponseBody
//    public List<User> getAllUsers() {
//        try {
//            return userDAO.getAllUsers();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
    
    
//    @RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
//    @ResponseBody
//    public List<User> getAllUsers(@RequestParam(value = "start", defaultValue = "0") int start,
//                                  @RequestParam(value = "limit", defaultValue = "25") int limit) {
//        return userDAO.getAllUsers(start, limit);
//    }
    
@RequestMapping(value = "/getAllUsers")
@ResponseBody
public ResponseEntity<Map<String, Object>> getAllUsers(
        @RequestParam(value = "start", defaultValue = "0") int page,
        @RequestParam(value = "limit", defaultValue = "25") int limit,
        @RequestParam(value = "sortColumn", defaultValue = "id") String sortColumn,
        @RequestParam(value = "dir", defaultValue = "DESC") String sortOrder,
        @RequestParam(value = "sort", defaultValue = "DESC") String sort) {

    Map<String, Object> response = new HashMap<>();

    try {
        // Validate sortColumn and sortOrder
        List<String> allowedColumns = Arrays.asList("id", "username", "email", "role");
        if (!allowedColumns.contains(sortColumn)) {
            sortColumn = "id"; // Default safe column
        }

        if (!sortOrder.equalsIgnoreCase("ASC") && !sortOrder.equalsIgnoreCase("DESC")) {
            sortOrder = "DESC"; // Default safe order
        }

        Map<String, Object> result = userDAO.getAllUsers(page, limit, sort, sortOrder);

        response.put("userList", result.get("userList"));
        response.put("totalCount", result.get("totalCount"));
        return ResponseEntity.ok(response);

    } catch (Exception e) {
        e.printStackTrace();
        response.put("error", "Error fetching users");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}


    
    // 🔹 Get Users with Pagination
//@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
//@ResponseBody
//public Map<String, Object> getAllUsers(@RequestParam("page") int page, @RequestParam("size") int size) {
//    Map<String, Object> response = new HashMap<>();
//    try {
//        // Fetch paginated users from DAO
//        List<User> users = userDAO.getAllUsers(page, size);
//        // Fetch total count of users (for pagination calculation)
//        long totalCount = userDAO.getTotalUserCount();
//        
//        // Add data and totalCount to response
//        response.put("data", users);
//        response.put("totalCount", totalCount);
//    } catch (Exception e) {
//        e.printStackTrace();
//        response.put("error", "Error fetching users.");
//    }
//    return response;
//}


    // 🔹 Add New User
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public String addUser(@RequestBody User user) {
        try {
            userDAO.addUser(user);
            return "User added successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error adding user.";
        }
    }

    // 🔹 Update Existing User
    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    @ResponseBody
    public String updateUser(@RequestBody User user) {
        try {
            userDAO.updateUser(user);
            return "User updated successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error updating user.";
        }
    }

    // 🔹 Delete User
//    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
//    @ResponseBody
//    public String deleteUser(@RequestParam("id") int id) {
//        try {
//            userDAO.deleteUser(id);
//            return "User deleted successfully!";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error deleting user.";
//        }
//    }
    
    // Delete Users
    @RequestMapping(value = "/deleteUsers", method = RequestMethod.POST)
    @ResponseBody
    public String deleteUsers(@RequestBody Map<String, List<Integer>> payload) {
        List<Integer> ids = payload.get("ids");
        try {
            for (Integer id : ids) {
                userDAO.deleteUser(id);
            }
            return "Users deleted successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error deleting users.";
        }
    }

}
