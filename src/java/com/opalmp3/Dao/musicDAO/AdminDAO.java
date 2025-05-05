///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.opalmp3.Dao.musicDAO;
//
//import com.opalmp3.Model.User;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.util.ArrayList;
//import java.util.List;
//
///**
// *
// * @author avinashpandey
// */
//public class AdminDAO {
//     private Connection conn;
//
//    public AdminDAO(Connection conn) {
//        this.conn = conn;
//    }
//
//    public List<User> getAllUsers() throws Exception {
//        List<User> list = new ArrayList<>();
//        PreparedStatement ps = conn.prepareStatement("SELECT * FROM users");
//        ResultSet rs = ps.executeQuery();
//        while (rs.next()) {
//            User u = new User();
//            u.setId(rs.getLong("id"));
//            u.setUsername(rs.getString("username"));
//            u.setEmail(rs.getString("email"));
//            u.setRole(rs.getString("role"));
//            list.add(u);
//        }
//        return list;
//    }
//
//    public void addUser(User u) throws Exception {
//        PreparedStatement ps = conn.prepareStatement("INSERT INTO users (username, email, role) VALUES (?, ?, ?)");
//        ps.setString(1, u.getUsername());
//        ps.setString(2, u.getEmail());
//        ps.setString(3, u.getRole());
//        ps.executeUpdate();
//    }
//
//    public void updateUser(User u) throws Exception {
//        PreparedStatement ps = conn.prepareStatement("UPDATE users SET username=?, email=?, role=? WHERE id=?");
//        ps.setString(1, u.getUsername());
//        ps.setString(2, u.getEmail());
//        ps.setString(3, u.getRole());
////        ps./*setlong*/(4, u.getId());
//        ps.executeUpdate();
//    }
//
//    public void deleteUser(int id) throws Exception {
//        PreparedStatement ps = conn.prepareStatement("DELETE FROM users WHERE id=?");
//        ps.setInt(1, id);
//        ps.executeUpdate();
//    }
//}
