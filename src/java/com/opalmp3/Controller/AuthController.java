/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Controller;

//import com.opalmp3.Dao.TokenDAO;
import com.opalmp3.Dao.TokenDAO.TokenDAO;
import com.opalmp3.Dao.UserDAO;
import com.opalmp3.Service.UserService;
import com.opalmp3.Model.User;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import javax.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *
 * @author avinashpandey
 */
@Controller
//@ResponseBody
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    
    private TokenDAO tokenDAO;
    
    @Autowired
    public AuthController(TokenDAO tokenDAO){
        this.tokenDAO = tokenDAO;
    }
//    
//    @GetMapping("/register")
//    public String registerForm(){
//        return "register"; // register.jsp for the register view
//    }
//    
    @RequestMapping(value = "/index")
    public String loginPage(){
//        System.out.println("test");
        return "index"; // index.jsp for the login view
    }
    
//    @PostMapping("/register")
//    @ResponseBody
//    public String register(@RequestPara   m String username, @RequestParam String password, @RequestParam String role){
//        boolean registered = userService.registerUser(username, password, role);
//        return registered ? "redirect:/opalmp3/login?registered" : "redirect:/opalmp3/login?error";
//    }
    
    
    @RequestMapping(value = "/register")
    public String registerPage(){
//        System.out.println("test");
        return "register"; // register.jsp for the register view
    }
    
    
    
@RequestMapping(value = "/register", method = RequestMethod.POST)
@ResponseBody
public ResponseEntity<String> registerUser(@RequestBody Map<String, String> payload) {
//    Map<String, Object> res = new HashMap<>();
    
    String username = payload.get("username");
    String password = payload.get("password");
    String email = payload.get("email"); 
//    String phoneNo = payload.get("phoneNo"); //
//    String dob = payload.get("dob");
    String role = "user"; //
//    String profilePic = payload.get("profilePic"); //

//    System.out.println("Register called: " + username);
    try{
    boolean success = userService.registerUser(username, password, email, role);
    
    if (success) {
        return ResponseEntity.ok().body("{\"success\": true}");
    } else {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"success\": false, \"message\": \"User already exists or registration error\"}");
//        res.put("success", false);
//        res.put("message", "User already exists or registration error");
    }
//
//    return res;
    } catch(Exception e){
        e.printStackTrace(); // if error, debug
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"success\": false, \"message\": \"Server error: " + e.getMessage() + "\"}");

    }
}


// Register form controller
// Check for username and email already exists or not


@RequestMapping(value = "/check-username", method = RequestMethod.GET)
@ResponseBody
public ResponseEntity<Map<String, Object>> checkUsername(@RequestParam String username) {
    Map<String, Object> response = new HashMap<>();
    try {
//        boolean exists = userDAO.isUsernameTaken(username);

        boolean exists = userService.isUsernameTaken(username);  // Call service layer
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        response.put("exists", false);
        response.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

@RequestMapping(value = "/check-email", method = RequestMethod.GET)
@ResponseBody
public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
    Map<String, Object> response = new HashMap<>();
    try {
//        boolean exists = userDAO.isEmailTaken(email);

        boolean exists = userService.isEmailTaken(email);  // Call service layer
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        response.put("exists", false);
        response.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}




//@GetMapping("/check-username")
//@ResponseBody
//public String checkUsername(@RequestParam String username) {
//    JSONObject response = new JSONObject();
//    try {
//        boolean exists = userDAO.isUsernameTaken(username);
//        response.put("exists", exists);
//    } catch (Exception e) {
//        response.put("exists", false);
//        response.put("error", e.getMessage());
//    }
//    return response.toString();
//}
//
//@GetMapping("/check-email")
//@ResponseBody
//public String checkEmail(@RequestParam String email) {
//    JSONObject response = new JSONObject();
//    try {
//        boolean exists = userDAO.isEmailTaken(email);
//        response.put("exists", exists);
//    } catch (Exception e) {
//        response.put("exists", false);
//        response.put("error", e.getMessage());
//    }
//    return response.toString();
//}

    
@RequestMapping(value = "/login", method = RequestMethod.POST)
@ResponseBody
public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
    System.out.println("Inside login controller");
    
//    Map<String, Object> response = new HashMap<>();
//    String response = null;
    User validateUser = userService.validateUser(user.getUsername(), user.getPassword());
    if (validateUser != null) {
        System.out.println("Username:" + user.getUsername());
        session.setAttribute("Current User", validateUser);
        session.setMaxInactiveInterval(5 * 60);// 5 minutes
        
//        String jsonResponse = String.format(
//            "{\"success\": true, \"username\": \"%s\", \"role\": \"%s\"}",
//            validateUser.getUsername(),
//            validateUser.getRole()
//        );
//        System.out.println("Login Response: " + jsonResponse); // 👈 Log here

        return ResponseEntity.ok().body("{\"success\": true, \"username\": \"" + validateUser.getUsername() + "\", \"role\": \"" + validateUser.getRole() + "\"}");
//        return ResponseEntity.ok().body("{\"success\": \"true\"}");
    } else {
        return ResponseEntity.ok().body("{\"success\": false, \"message\": \"Invalid Username or Password\"}");
    }
//    System.out.println("Username: " + user.getUsername());
}


// Reset Password / verify user

   @RequestMapping(value = "/verifyuser", method = RequestMethod.GET)
    public String resetPasswordPage(){
//        System.out.println("test");
        return "resetpassword"; // resetpassword.jsp for the register view
    }

    @RequestMapping(value = "/verifyuser", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> verifyUser(@RequestBody Map<String, String> payload) {
//    String email = payload.get("email");
      String identifier = payload.get("identifier");
        System.out.println("identifier>>" + identifier);
    try {
        String username = userService.getUserByEmailOrUsername(identifier); // Get username by email
System.out.println("identifier>>" + identifier);
        if (username != null) {
            String token = Base64.getEncoder().encodeToString((username + System.currentTimeMillis()).getBytes());
            String url = "http://localhost:8080/OpalMp3/setpassword.htm?token=" + token;

            // Save token to main table
            tokenDAO.saveToken(token, username, url);

            return ResponseEntity.ok("{\"success\": true, \"message\": \"User verified\"}");
        } else {
            return ResponseEntity.ok("{\"success\": false, \"message\": \"User not found\"}");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"success\": false, \"message\": \"User not found\"}");
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"failure\": false, \"message\": \"Server error\"}");
    }
    
    }

    

// Set Password

   @RequestMapping(value = "/setpassword", method = RequestMethod.GET)
    public String showSetPasswordPage(@RequestParam("token") String token, Model model, HttpServletRequest request){
        try {
            String usernameFromDb = tokenDAO.getUsernameByToken(token);

            if (usernameFromDb != null) {
                // Token is valid
                model.addAttribute("token", token); // You can pass token to JSP if needed
                return "setpassword"; // loads setpassword.jsp
            } else {
                // Token is invalid or expired
                model.addAttribute("error", "Invalid or expired token.");
                return "resetpassword"; // or a custom error page
            }

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Internal server error.");
            return "resetpassword";
        }
//        System.out.println("test");
//        return "setpassword"; // setpassword.jsp for the register view
    }
    
    
@RequestMapping(value = "/setpassword", method = RequestMethod.PUT)
@ResponseBody
public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> payload) {
    String token = payload.get("token");
    String newPassword = payload.get("password");

//    Map<String, Object> response = new HashMap<>();
    try {
        String username = tokenDAO.getUsernameByToken(token); // Validate token

        if (username != null) {
            userService.updatePassword(username, newPassword);
            tokenDAO.deleteToken(token); // invalidate token
            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Password updated successfully\"}");
//            response.put("success", true);
//            response.put("message", "Password updated successfully.");
        } else {
            return ResponseEntity.ok().body("{\"failure\": true, \"message\": \"Invalid or expired token.\"}");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body("{\"success\": false, \"message\": \"Invalid or expired token.\"}");
//            response.put("success", false);
//            response.put("message", "Invalid or expired token.");
        }
    } catch (Exception e) {
        e.printStackTrace();
//        response.put("success", false);
//        response.put("message", "Internal server error.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"success\": false, \"message\": \"Server error\"}");
    }
}
    
    
//       @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
//    public String adminDashboardPage(){
////        System.out.println("test");
//        return "dashboard"; // setpassword.jsp for the register view
//    }
    
    
}

