package com.opalmp3.Dao;

import com.opalmp3.Model.User;
import com.opalmp3.Utils.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.RowMapper;
//import org.springframework.stereotype.Repository;
////
@Repository("userDAO")
//@Component
public class UserDAOImpl implements UserDAO{

    
    @Override
    public boolean register(User user) {
//    System.out.println("Attempting to register user: " + user.getUserName());
//    System.out.println("Email: " + user.getEmail());
//    System.out.println("Phone: " + user.getPhoneNo());
//    System.out.println("DOB: " + user.getDob());
//    System.out.println("Role: " + user.getRole());
//    System.out.println("Profile Pic: " + user.getProfilePic());

    String sql = "INSERT INTO users(username, password, email, role) VALUES (?, ?, ?, ?)";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

//        if (conn == null) {
//            throw new SQLException("DB connection is null. Check DBUtil.");
//        }

        stmt.setString(1, user.getUsername());
        stmt.setString(2, user.getPassword());
        stmt.setString(3, user.getEmail());
        stmt.setString(4, user.getRole());
//        stmt.setString(4, user.getPhoneNo());
//        stmt.setString(5, "1992-02-03");
//        stmt.setString(6, user.getRole());
//        stmt.setString(7, user.getProfilePic());

        int rowsInserted = stmt.executeUpdate();
        if (rowsInserted > 0) {
            System.out.println("User registered successfully.");
        } else {
            System.out.println("User registration failed. No rows inserted.");
        }

    } catch (SQLException e) {
        System.err.println("SQLException during registration:");
        e.printStackTrace();
    } catch (Exception e) {
        System.err.println("General exception during registration:");
        e.printStackTrace();
    }
    return true;
}

    @Override
    public User login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, username);
            stmt.setString(2, password);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return extractUserFromResultSet(rs);
                }
                else {
                System.out.println("No matching user found for: " + username);
            }
            }

        } 
        catch (SQLException e) {
        System.err.println("SQL Exception in login(): " + e.getMessage());
        e.printStackTrace();
        }
        catch (Exception e) {
            System.err.println("Error in login(): " + e.getMessage());
            e.printStackTrace();
        }

        return null;
    }

    private User extractUserFromResultSet(ResultSet rs) throws Exception {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setRole(rs.getString("role"));
        return user;
//        user.setPhoneNo(rs.getString("phone_no"));
//        user.setRole(rs.getString("role"));
//        user.setDob(rs.getString("dob"));
//        user.setEmail(rs.getString("email"));
//        user.setPhoneNo(rs.getString("phone_no"));
//        user.setProfilePic(rs.getString("profile_pic"));
    }

    
    @Override
public String findUserByEmailOrUsername(String identifier) {
    String sql = "SELECT username FROM users WHERE email = ? OR username = ?";
    String username = null;

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, identifier);
        stmt.setString(2, identifier);

        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            username = rs.getString("username");
        }
    } catch (Exception e) {
        e.printStackTrace();
    }

    return username;
}

//    @Override
//    public String findUserByEmail(String email) {
//        String sql = "SELECT username FROM users WHERE email = ?";
//       String username = null;
//
//       try (Connection conn = DBUtil.getConnection();
//            PreparedStatement stmt = conn.prepareStatement(sql)) {
//
//           stmt.setString(1, email);
//           ResultSet rs = stmt.executeQuery();
//
//           if (rs.next()) {
//               username = rs.getString("username");
//           }
//       } catch (Exception e) {
//           e.printStackTrace();
//       }
//
//       return username;
//
//    }

    @Override
    public boolean updatePassword(String username, String newPassword) {
        String sql = "UPDATE users SET password = ? WHERE username = ?";
        try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        stmt.setString(1, newPassword);
        stmt.setString(2, username);

        int rowsUpdated = stmt.executeUpdate();
        return rowsUpdated > 0; // true if password was updated

    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
    catch (Exception e) {
        e.printStackTrace();
        return false;
    }
    }
    
    
    // Dashboard/ userlist
    
    @Override
public List<User> getAllUsers() {
    List<User> userList = new ArrayList<>();
    String sql = "SELECT * FROM users";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        while (rs.next()) {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setEmail(rs.getString("email"));
            user.setRole(rs.getString("role"));
            // Add more if you un-comment those in your model
            userList.add(user);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return userList;
}

    
//    @Override
//    public Map<String, Object> getAllUsers(int page, int limit, String sortColumn, String sortOrder) throws Exception {
//    Map<String, Object> result = new HashMap<>();
//    List<User> userList = new ArrayList<>();
//    String sql = "SELECT * FROM users";
//
//    try (Connection conn = DBUtil.getConnection();
//         PreparedStatement stmt = conn.prepareStatement(sql);
//         ResultSet rs = stmt.executeQuery()) {
//
//        while (rs.next()) {
//            User user = new User();
//            user.setId(rs.getLong("id"));
//            user.setUsername(rs.getString("username"));
//            user.setPassword(rs.getString("password"));
//            user.setEmail(rs.getString("email"));
//            user.setRole(rs.getString("role"));
//            // Add more if you un-comment those in your model
//            userList.add(user);
//        }
//    } catch (Exception e) {
//        e.printStackTrace();
//    }
//    return userList;
//}

// Pagination


@Override
public void addUser(User user) {
    String sql = "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, user.getUsername());
        stmt.setString(2, user.getPassword());
        stmt.setString(3, user.getEmail());
        stmt.setString(4, user.getRole());
        stmt.executeUpdate();

    } catch (Exception e) {
        e.printStackTrace();
    }
}

// Pagination 



@Override
public void updateUser(User user) {
//    String sql = "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?";
    String sql = "UPDATE users SET email = ?, role = ? WHERE id = ?";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

//        stmt.setString(1, user.getUsername());
//        stmt.setString(2, user.getPassword());
        stmt.setString(1, user.getEmail());
        stmt.setString(2, user.getRole());
        stmt.setLong(3, user.getId());

        stmt.executeUpdate(); // Executing the updated query

    } catch (Exception e) {
        e.printStackTrace();
    }
}


// Delete Users logic
@Override
public void deleteUser(int id) {
    String sql = "DELETE FROM users WHERE id = ?";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setInt(1, id);
        stmt.executeUpdate();

    } catch (Exception e) {
        e.printStackTrace();
    }
}



// Check for username and email exists or not

@Override
public boolean isUsernameTaken(String username) throws Exception {
    Connection conn = DBUtil.getConnection();
    PreparedStatement ps = conn.prepareStatement("SELECT id FROM users WHERE username=?");
    ps.setString(1, username);
    ResultSet rs = ps.executeQuery();
    return rs.next();
}

@Override
public boolean isEmailTaken(String email) throws Exception {
    Connection conn = DBUtil.getConnection();
    PreparedStatement ps = conn.prepareStatement("SELECT id FROM users WHERE email=?");
    ps.setString(1, email);
    ResultSet rs = ps.executeQuery();
    return rs.next();
}


// Users Pagination

//   @Override
//    public List<User> getAllUsers(int start, int limit) {
//        List<User> userList = new ArrayList<>();
//        String sql = "SELECT * FROM users LIMIT ? OFFSET ?";
//
//        try (Connection conn = DBUtil.getConnection();
//             PreparedStatement stmt = conn.prepareStatement(sql)) {
//
//            // Setting the limit and offset values based on the pagination parameters
//            stmt.setInt(1, limit);    // LIMIT: how many records to fetch
//            stmt.setInt(2, start);    // OFFSET: where to start fetching records
//
//            try (ResultSet rs = stmt.executeQuery()) {
//                while (rs.next()) {
//                    User user = new User();
//                    user.setId(rs.getLong("id"));
//                    user.setUsername(rs.getString("username"));
//                    user.setPassword(rs.getString("password"));
//                    user.setEmail(rs.getString("email"));
//                    user.setRole(rs.getString("role"));
//                    userList.add(user);
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return userList;
//    }

    @Override
    public Map<String, Object> getAllUsers(int page, int limit, String sortColumn, String sortOrder) throws Exception {
        Map<String, Object> result = new HashMap<>();
        List<User> userList = new ArrayList<>();

        int offset = page;
        
        Connection conn = DBUtil.getConnection();
//             PreparedStatement stmt = conn.prepareStatement("CALL getUserPaginatedTracks(?, ?, ?, ?)") 

         String sql = "CALL getUserPaginatedTracks(?, ?, ?, ?)";
         PreparedStatement ps = conn.prepareStatement(sql);

            ps.setInt(1, offset);
            ps.setInt(2, limit);
            ps.setString(3, sortColumn);
            ps.setString(4, sortOrder);

            ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    User u = new User();
                    u.setId(rs.getLong("id"));
                    u.setUsername(rs.getString("username"));
                    u.setEmail(rs.getString("email"));
                    u.setRole(rs.getString("role"));
                    userList.add(u);
//                    User user = extractUserFromResultSet(rs);
//                    userList.add(user);
                }
                rs.close();
                
                if(ps.getMoreResults()){
                    ResultSet countRs = ps.getResultSet();
                    if(countRs.next()){
                    int totalCount = countRs.getInt("totalCount");
                    result.put("totalCount", totalCount);
                    }
                    countRs.close();
                }
            
        

        result.put("userList", userList);
        return result;
    }


//    @Override
//    public long getTotalUserCount() {
//        String sql = "SELECT COUNT(*) FROM users";
//        long userCount = 0;
//
//        try (Connection conn = DBUtil.getConnection();
//             PreparedStatement stmt = conn.prepareStatement(sql)) {
//
//            try (ResultSet rs = stmt.executeQuery()) {
//                if (rs.next()) {
//                    userCount = rs.getLong(1);
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return userCount;
//    }


}
