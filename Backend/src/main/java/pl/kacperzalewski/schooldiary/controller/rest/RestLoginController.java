package pl.kacperzalewski.schooldiary.controller.rest;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import pl.kacperzalewski.schooldiary.dto.AuthRequestDTO;
import pl.kacperzalewski.schooldiary.dto.TokenDTO;
import pl.kacperzalewski.schooldiary.service.UserDetailsServiceImpl;
import pl.kacperzalewski.schooldiary.service.JwtService;
import pl.kacperzalewski.schooldiary.util.cookie.CookieClearer;

import java.time.Duration;

@RestController
public class RestLoginController {

    @Value("${jwt.refreshTokenExpiration}")
    private short refreshTokenExpirationInDays;

    @Value("${app.cookie.domain}")
    private String cookieDomain;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public RestLoginController(AuthenticationManager authenticationManager,
                               JwtService jwtService,
                               UserDetailsServiceImpl userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Handles POST Request to authenticate the user based on credentials.
     *
     * This endpoint authenticates the user using the provided username and password.
     * Upon successful authentication, the access token is returned in the response body,
     * and the refresh token is set in a cookie with the HttpOnly, Secure, and SameSite attributes.
     * The refresh token is used for obtaining new access tokens when the current one expires.
     *
     * @param authRequestDTO A DTO containing the username and password required to authenticate the user.
     *                       Example:
     *                       {
     *                          "username": "username",
     *                          "password": "password"
     *                       }
     *
     * @param response       The HttpServletResponse is used to set a cookie with the refresh token
     *                       upon successful authentication. The cookie has the following attributes:
     *                       - HttpOnly
     *                       - Secure (only works over HTTPS)
     *                       - SameSite=None (to support cross-site requests if necessary)
     *                       - Path=/
     *
     * @return ResponseEntity containing:
     *         - A JSON object with the access token.
     *         - HTTP 401 status if authentication fails (invalid credentials).
     *
     * Example response on success:
     * {
     *    "accessToken": "accessTokenValue"
     * }
     *
     * @throws AuthenticationException If the username or password are invalid.
     *                                 In this case, an HTTP 401 Unauthorized response is returned.
     */
    @PostMapping(path = "/login")
    public ResponseEntity<TokenDTO> authenticateUserBasedOnAuthDTO(@Valid @RequestBody AuthRequestDTO authRequestDTO,
                                                                   HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));

            if (authentication.isAuthenticated()) {
                String refreshToken = jwtService.generateRefreshToken(authRequestDTO.getUsername());
                String accessToken = jwtService.generateAccessToken(authRequestDTO.getUsername());

                String cookieHeader = String.format("refreshToken=%s; Path=%s; HttpOnly; Max-Age=%d; Domain=%s; SameSite=None; Secure", refreshToken, "/", Duration.ofDays(refreshTokenExpirationInDays).getSeconds(), cookieDomain);
                response.addHeader("Set-Cookie", cookieHeader);

                return ResponseEntity.ok(new TokenDTO(accessToken));
            } else {
                throw new UsernameNotFoundException("Invalid username");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Handles GET Request to refresh access token.
     *
     * This endpoint generates a new access token when a refresh token exists as a cookie.
     *
     * @param request  The HttpServletRequest is used to gather a refresh token from cookies.
     * @param response The HttpServletResponse is used to clear a cookie if the refresh token is expired.
     *
     * @return ResponseEntity containing:
     *      - A JSON object with a new access token if the refresh token is valid and username is found.
     *      - HTTP 401 status if the refresh token is expired or the username is invalid.
     *
     * @throws JwtException if the refresh token is expired.
     * @throws UsernameNotFoundException if the username extracted from the refresh token does not exist.
     */
    @GetMapping(path = "/refreshAccessToken")
    public ResponseEntity<TokenDTO> refreshAccessToken(HttpServletRequest request,
                                                       HttpServletResponse response) {

        Cookie refreshTokenCookie = WebUtils.getCookie(request, "refreshToken");
        String refreshToken = (refreshTokenCookie != null) ? refreshTokenCookie.getValue() : null;

        if (refreshToken != null) {
            try {
                final String extractedUsername = jwtService.extractUsername(refreshToken);

                if (extractedUsername != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(extractedUsername);

                    if (jwtService.validateRefreshToken(refreshToken, userDetails)) {
                        String accessToken = jwtService.refreshAccessToken(extractedUsername);
                        return ResponseEntity.ok(new TokenDTO(accessToken));
                    }
                }
            } catch (JwtException | UsernameNotFoundException ex) {
                CookieClearer.clearCookie(response, cookieDomain);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
