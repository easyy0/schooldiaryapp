package pl.kacperzalewski.schooldiary.util.cookie;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieClearer {

    public static void clearCookie(HttpServletResponse response) {
        Cookie deletedCookie = new Cookie("jwtToken", null);
        deletedCookie.setMaxAge(0);
        deletedCookie.setPath("/");
        response.addCookie(deletedCookie);
    }
}
