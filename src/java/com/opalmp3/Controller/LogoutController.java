/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author avinashpandey
 */

@Controller
public class LogoutController {
    
@RequestMapping(value = "/logout", method = RequestMethod.POST)
@ResponseBody
public String logout(HttpServletRequest request) {
    HttpSession session = request.getSession(false); // false = don't create if doesn't exist
    if (session != null) {
        session.invalidate(); // Invalidate the session
    }
    return "logout-success";
}

    
}
