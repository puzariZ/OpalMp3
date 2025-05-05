/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Model;

import java.sql.Timestamp;

public class PasswordResetToken {
    private String token;
    private String username;
    private String url;
    private Timestamp createdAt;

    // Getters and setters
    
    public PasswordResetToken(String token, String username, String url, Timestamp createdAt){
        this.token = token;
        this.username= username;
        this.url = url;
        this.createdAt = createdAt;
    }

    public PasswordResetToken() {
    //To change body of generated methods, choose Tools | Templates.
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}

