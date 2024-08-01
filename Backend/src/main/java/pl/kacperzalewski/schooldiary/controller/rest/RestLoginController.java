package pl.kacperzalewski.schooldiary.controller.rest;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import pl.kacperzalewski.schooldiary.dto.AuthRequestDTO;
import pl.kacperzalewski.schooldiary.dto.TokenDTO;
import pl.kacperzalewski.schooldiary.service.UserDetailsServiceImpl;
import pl.kacperzalewski.schooldiary.service.JwtService;
import pl.kacperzalewski.schooldiary.util.cookie.CookieClearer;

@RestController
public class RestLoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    public RestLoginController(AuthenticationManager authenticationManager, JwtService jwtService, UserDetailsServiceImpl userDetailsServiceImpl) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<TokenDTO> AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO,
                                                            HttpServletResponse response){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
            if(authentication.isAuthenticated()){
                String refreshToken = jwtService.GenerateToken(authRequestDTO.getUsername(), true);
                String accessToken = jwtService.GenerateToken(authRequestDTO.getUsername(), false);
                String cookieHeader = String.format("refreshToken=%s; Path=%s; HttpOnly; Max-Age=%d; Domain=%s; SameSite=None; Secure", refreshToken, "/", 3600, "localhost");
                response.addHeader("Set-Cookie", cookieHeader);

                return ResponseEntity.ok(new TokenDTO(accessToken));
            } else {
                throw new UsernameNotFoundException("invalid user request..!!");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/refreshAccessToken")
    public ResponseEntity<TokenDTO> RefreshAccessToken(HttpServletRequest request, HttpServletResponse response){
        Cookie refreshTokenCookie = WebUtils.getCookie(request, "refreshToken");
        String refreshToken = (refreshTokenCookie != null) ? refreshTokenCookie.getValue() : null;

        if (refreshToken != null) {
            try {
                final String extractedUsername = jwtService.extractUsername(refreshToken);

                if (extractedUsername != null) {
                    String accessToken = jwtService.GenerateToken(extractedUsername, false);
                    return ResponseEntity.ok(new TokenDTO(accessToken));
                }
            } catch (ExpiredJwtException ex) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (UsernameNotFoundException ex) {
                CookieClearer.clearCookie(response);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
