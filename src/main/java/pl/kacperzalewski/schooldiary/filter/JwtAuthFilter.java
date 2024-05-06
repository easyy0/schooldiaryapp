package pl.kacperzalewski.schooldiary.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.kacperzalewski.schooldiary.repository.UserDetailsServiceImpl;
import pl.kacperzalewski.schooldiary.service.JwtService;
import pl.kacperzalewski.schooldiary.util.RedirectToSignInWithError;
import pl.kacperzalewski.schooldiary.util.auth.UserAuthenticator;
import pl.kacperzalewski.schooldiary.util.cookie.CookieClearer;
import pl.kacperzalewski.schooldiary.util.cookie.TokenExtractor;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private JwtService jwtService;

    UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsServiceImpl) {
        this.jwtService = jwtService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwtToken = TokenExtractor.extract(request);
        String extractedUsername = null;

        if(jwtToken != null) {
            try {
                extractedUsername = jwtService.extractUsername(jwtToken);
                if (extractedUsername != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(extractedUsername);
                    if (jwtService.validateToken(jwtToken, userDetails)) {
                        UserAuthenticator.authenticate(userDetails, request);
                    }
                }
            } catch (UsernameNotFoundException ex) {
                CookieClearer.clearCookie(response);
                RedirectToSignInWithError.redirect(response, null);
                return;
            } catch (ExpiredJwtException ex) {
                CookieClearer.clearCookie(response);
                RedirectToSignInWithError.redirect(response, "Session expired please login again");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}