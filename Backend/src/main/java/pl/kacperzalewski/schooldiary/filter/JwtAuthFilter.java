package pl.kacperzalewski.schooldiary.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;
import pl.kacperzalewski.schooldiary.service.UserDetailsServiceImpl;
import pl.kacperzalewski.schooldiary.service.JwtService;
import pl.kacperzalewski.schooldiary.util.auth.UserAuthenticator;
import pl.kacperzalewski.schooldiary.util.cookie.CookieClearer;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsServiceImpl) {
        this.jwtService = jwtService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String accessToken = (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) ? authorizationHeader.substring(7).trim() : null;

        final Cookie refreshTokenCookie = WebUtils.getCookie(request, "refreshToken");
        final String refreshToken = (refreshTokenCookie != null) ? refreshTokenCookie.getValue() : null;

        final String requestPath = request.getRequestURI();

        /* Check if user is trying to refresh access token, here we're checking if refresh token is correct */
        if ("/refreshAccessToken".equals(requestPath) && refreshToken != null) {
            try {
                String extractedUsername = jwtService.extractUsername(refreshToken);

                if (extractedUsername != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(extractedUsername);

                    if (jwtService.validateToken(refreshToken, userDetails)) {
                        UserAuthenticator.authenticate(userDetails, request);
                    }
                }
            } catch (Exception ex) {
                CookieClearer.clearCookie(response);
                return;
            }

            filterChain.doFilter(request, response);
            return;
        }

        if (refreshToken != null && accessToken != null) {
            try {
                final String extractedUsername = jwtService.extractUsername(accessToken);

                if (extractedUsername != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(extractedUsername);

                    if (jwtService.validateToken(accessToken, userDetails)) {
                        UserAuthenticator.authenticate(userDetails, request);
                    }
                }
            } catch (ExpiredJwtException ex) {
                return;
            } catch (UsernameNotFoundException ex) {
                CookieClearer.clearCookie(response);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}