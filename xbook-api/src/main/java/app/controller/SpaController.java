package app.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

//@Controller
//public class SpaController {
//    @GetMapping(value = "/**/{path:[^\\.]*}")
//    public String forward(HttpServletRequest request) {
//        System.out.println(request.getRequestURI());
//        System.out.println(request.getRequestURL());
//        if (request.getRequestURI().equals("/gs-guide-websocket")) {
//            System.out.println("It equals /gs-guide-websocket");
//            return "http://localhost:8080/gs-guide-websocket";
//        }
//        return "forward:/";
//    }
//}

@Controller
public class SpaController {
    @RequestMapping(value = {
            "/",
            "/login",
            "/register",
            "/home",
            "/profile",
            "/profile/*",
            "/chats",
            "/chats/*",
            "/chat",
            "/search",
            "/feed",
            "/settings",
            "/friends",
            "/friends/*",
            "/watch",
            "/groups",
            "/confirmation",
            "/forgot-password",
            "/forgot-password/*",
            "/settings",
            "/notification/*",
            "/notification",
            "/saved",
            "/post/*",
    })
    public String redirect() {
        return "forward:/index.html";
    }
}