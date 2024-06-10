//package app.controller;
//
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import java.io.IOException;
//
//@Controller
//public class SpaController {
//    @RequestMapping(value = {
//            "/login",
//            "/forgot-page",
//            "/forgot-password",
//            "/post/**",
//            "/bookmarks",
//            "/chats/**",
//            "/notifications",
//            "/profile/**",
//    })
//    public String redirect(){
//        return "forward:/index.html";
//    }
//
//    @RequestMapping("/")
//    public void login(HttpServletResponse response) throws IOException {
//        response.sendRedirect("/login");
//    }
//}

package app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    @RequestMapping(value = {
            "/",
            "/login",
            "/forgot-page",
            "/forgot-password",
            "/post/**",
            "/bookmarks",
            "/chats/**",
            "/notifications",
            "/profile/**",
            "/friends",
            "/requests"
    })
    public String redirect(){
        return "forward:/index.html";
    }
}