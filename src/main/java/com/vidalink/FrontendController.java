package com.vidalink;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = {"/cadastro", "/login", "/home", "/rewards", "/profile", "/**/{path:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }
}
