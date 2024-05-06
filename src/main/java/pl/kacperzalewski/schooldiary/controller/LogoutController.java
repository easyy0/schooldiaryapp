package pl.kacperzalewski.schooldiary.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import pl.kacperzalewski.schooldiary.util.cookie.CookieClearer;

@Controller
public class LogoutController {

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        CookieClearer.clearCookie(response);

        return "logout";
    }
}
