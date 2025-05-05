/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Dao.TokenDAO;

import com.opalmp3.Model.PasswordResetToken;

public interface TokenDAO {
    void saveToken(String token, String username, String url);
    PasswordResetToken getToken(String token);
    void deleteToken(String token);
    String getUsernameByToken(String token);
}