/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author avinashpandey
 */
@Controller
public class DashboardController {
    
    @RequestMapping(value = "/dashboard")
    public String dashboard(){
//        System.out.println("test");
        return "dashboard"; // dashboard.jsp for the dashboard view
    }
    
}
