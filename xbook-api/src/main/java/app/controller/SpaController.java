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
    })
    public String redirect() {
        return "forward:/index.html";
    }
}