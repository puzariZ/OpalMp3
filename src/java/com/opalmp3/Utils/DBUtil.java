/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Utils;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

/**
 *
 * @author avinashpandey
 */
public class DBUtil {
//
//    private static String url;
//    private static String username;
//    private static String password;
//    private static String driver;
        // Set your DB credentials and JDBC driver here directly
    
    private static final String URL = "jdbc:mysql://localhost:3306/opalmp3"; 
    private static final String USERNAME = "root"; 
    private static final String PASSWORD = "Opalbpm@1234"; 
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    
    
    static {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }

//    static {
//        try {
//            InputStream input = DBUtil.class.getClassLoader().getResourceAsStream("jdbc.properties");
//            Properties props = new Properties();
//            props.load(input);
//
//            url = props.getProperty("jdbc.url");
//            username = props.getProperty("jdbc.username");
//            password = props.getProperty("jdbc.password");
//            driver = props.getProperty("jdbc.driver");
//
//            Class.forName(driver);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    public static Connection getConnection() throws Exception {
//        return DriverManager.getConnection(url, username, password);
//    }
}
