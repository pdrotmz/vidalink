package com.vidalink;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = {
            "/{path:^(?!admin|rewards|submissions|api|assets|static|.*\\..*).*$}",
            "/{path:^(?!admin|rewards|submissions|api|assets|static|.*\\..*).*$}/**"
    })
    public String forwardSPA() {
        return "forward:/index.html";
    }
}

