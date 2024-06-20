package pl.kacperzalewski.schooldiary.controller.rest;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.dto.AuthRequestDTO;
import pl.kacperzalewski.schooldiary.dto.TokenDTO;
import pl.kacperzalewski.schooldiary.service.JwtService;

@RestController
public class RestLoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public RestLoginController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<TokenDTO> AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO,
                                                            HttpServletResponse response){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
            if(authentication.isAuthenticated()){
                String token = jwtService.GenerateToken(authRequestDTO.getUsername());
                Cookie cookie = new Cookie("jwtToken", token);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setMaxAge(3600);
                cookie.setDomain("localhost");
                response.addCookie(cookie);
                return ResponseEntity.ok(new TokenDTO(token));
            } else {
                throw new UsernameNotFoundException("invalid user request..!!");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.notFound().build();
            //return new ModelAndView("redirect:/signin?error=Incorrect username or password!");
        }
    }
}
