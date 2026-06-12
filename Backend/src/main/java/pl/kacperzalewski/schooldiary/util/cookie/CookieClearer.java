package pl.kacperzalewski.schooldiary.util.cookie;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieClearer {

    public static void clearCookie(HttpServletResponse response, String cookieDomain) {
        String cookieHeader = String.format("refreshToken=%s; Path=%s; HttpOnly; Max-Age=%d; Domain=%s; SameSite=None; Secure", null, "/", 0, cookieDomain);
        response.addHeader("Set-Cookie", cookieHeader);
    }
}
