package com.opalmp3.Dao.TokenDAO;

import com.opalmp3.Dao.TokenDAO.TokenDAO;
import com.opalmp3.Model.PasswordResetToken;
import com.opalmp3.Utils.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

@Repository("tokenDAO")
public class TokenDAOImpl implements TokenDAO {

    // Save token, username, and URL to the password_reset_tokens table
    @Override
    public void saveToken(String token, String username, String url) {
        
        deleteTokenForUser(username);  // Deleting token before saving
        
        String sql = "INSERT INTO password_reset_tokens (token, username, url) VALUES (?, ?, ?)";

        // Establish connection and execute the statement inside try-catch
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, token);
            stmt.setString(2, username);
            stmt.setString(3, url);

            stmt.executeUpdate();
        } catch (Exception e) {
            System.err.println("Error saving token to database: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Fetch token by the token value
    @Override
    public PasswordResetToken getToken(String token) {
        String sql = "SELECT * FROM password_reset_tokens WHERE token = ?";

        // Establish connection and execute query
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, token);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    PasswordResetToken passwordResetToken = new PasswordResetToken();
                    passwordResetToken.setToken(rs.getString("token"));
                    passwordResetToken.setUsername(rs.getString("username"));
                    passwordResetToken.setUrl(rs.getString("url"));
                    passwordResetToken.setCreatedAt(rs.getTimestamp("createdAt"));
                    return passwordResetToken;
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching token from database: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    // Archive token before deletion
private void archiveToken(PasswordResetToken tokenData) {
    String sql = "INSERT INTO archived_password_reset_tokens (token, username, url, createdAt) VALUES (?, ?, ?, ?)";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, tokenData.getToken());
        stmt.setString(2, tokenData.getUsername());
        stmt.setString(3, tokenData.getUrl());
        stmt.setTimestamp(4, tokenData.getCreatedAt());

        stmt.executeUpdate();
    } catch (Exception e) {
        System.err.println("Error archiving token: " + e.getMessage());
        e.printStackTrace();
    }
}

    // Delete token after password reset is complete
 @Override
public void deleteToken(String token) {
    PasswordResetToken tokenData = getToken(token); // Fetch token data

    if (tokenData != null) {
        archiveToken(tokenData); // Archive it before deletion
    }

    String sql = "DELETE FROM password_reset_tokens WHERE token = ?";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setString(1, token);
        stmt.executeUpdate();
    } catch (Exception e) {
        System.err.println("Error deleting token from database: " + e.getMessage());
        e.printStackTrace();
    }
}

@Override
public String getUsernameByToken(String token) {
    String sql = "SELECT username FROM password_reset_tokens WHERE token = ?";
    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setString(1, token);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            return rs.getString("username");
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
     catch (Exception e) {
        e.printStackTrace();
    }
    return null;
}

// Method for deleting token before saving in db
private void deleteTokenForUser(String username) {
    String sql = "DELETE FROM password_reset_tokens WHERE username = ?";

    try (Connection conn = DBUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setString(1, username);
        stmt.executeUpdate();
    } catch (Exception e) {
        System.err.println("Error deleting token for username: " + e.getMessage());
        e.printStackTrace();
    }
}


}
