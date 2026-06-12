package pl.kacperzalewski.schooldiary.util;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class RedirectToSignInWithError {

    public static void redirect(HttpServletResponse response, String errorMessage) {
        try {
            String redirectUrl = errorMessage != null ? "/signin?error=" + URLEncoder.encode(errorMessage, StandardCharsets.UTF_8) : "/signin";
            response.sendRedirect(redirectUrl);
            return;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
