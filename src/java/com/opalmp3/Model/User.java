/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Model;

/**
 *
 * @author avinashpandey
 */
//import javax.persistence.*;
//
//@Entity
//@Table(name = "users")
public class User {
    private Long id;
    private String username;
    private String password;
    private String role;
    private String email;
    private String phoneNo;
    private String dob;
    private String profilePic;
    
    
    // Default constructor
    
    public User(){} // Np arg constructor
    
    // Parameterized constructor (without id)
    public User(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
//        this.phoneNo = phoneNo;
//        this.dob = dob;
//        this.profilePic = profilePic;
        this.role = role;
    }
    
    // Getters and Setters
    
    public Long getId(){
        return id;
    }
    
    public void setId(Long id){
        this.id = id;
    }
    
    public String getUsername(){
        return username;
    }
    
    public void setUsername(String username){
        this.username = username;
    }
    
    
    public String getPassword(){
        return password;
    }
    
    public void setPassword(String password){
        this.password = password;
    }
    
    public String getRole(){
          return role; 
    }
    
    public void setRole(String role) {
        this.role = role;
    }
//    
    public String getEmail(){
        return email;
    }
    
    public void setEmail(String email){
        this.email = email;
    }
    
//    public String getPhoneNo(){
//        return phoneNo;
//    }
//    
//    public void setPhoneNo(String phoneNo){
//        this.phoneNo = phoneNo;
//    }
//    public String getDob(){
//        return dob;
//    }
//    
//    public void setDob(String dob){
//        this.dob = dob;
//    }
//    
//    public String getProfilePic(){
//        return profilePic;
//    }
//    
//    public void setProfilePic(String profilePic){
//        this.profilePic = profilePic;
//    }
    
}
