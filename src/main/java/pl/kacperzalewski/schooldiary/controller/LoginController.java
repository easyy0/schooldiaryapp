package pl.kacperzalewski.schooldiary.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.dto.AuthRequestDTO;
import pl.kacperzalewski.schooldiary.service.JwtService;

@Controller
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @GetMapping("/signin")
    public String signInPage() {
        return "signin";
    }

    @PostMapping(path = "/api/signin")
    public ModelAndView AuthenticateAndGetToken(AuthRequestDTO authRequestDTO,
                                                HttpServletResponse response){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
            if(authentication.isAuthenticated()){
                String token = jwtService.GenerateToken(authRequestDTO.getUsername());
                Cookie cookie = new Cookie("jwtToken", token);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                response.addCookie(cookie);
                return new ModelAndView("redirect:/home");
            } else {
                throw new UsernameNotFoundException("invalid user request..!!");
            }
        } catch (AuthenticationException e) {
            return new ModelAndView("redirect:/signin?error=Incorrect username or password!");
        }
    }
}