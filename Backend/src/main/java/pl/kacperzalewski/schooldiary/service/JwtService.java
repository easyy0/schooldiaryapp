package pl.kacperzalewski.schooldiary.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

@Component
public class JwtService {

    private static final String TOKEN_TYPE_CLAIM = "tokenType";
    private static final String ACCESS_TOKEN_TYPE = "ACCESS";
    private static final String REFRESH_TOKEN_TYPE = "REFRESH";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.accessTokenExpirationMinutes}")
    private long accessTokenExpirationMinutes;

    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpirationInDays;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateAccessToken(String token, UserDetails userDetails) {
        return validateToken(token, userDetails, ACCESS_TOKEN_TYPE);
    }

    public Boolean validateRefreshToken(String token, UserDetails userDetails) {
        return validateToken(token, userDetails, REFRESH_TOKEN_TYPE);
    }

    private Boolean validateToken(String token, UserDetails userDetails, String expectedTokenType) {
        final String username = extractUsername(token);
        boolean tokenTypeMatches = expectedTokenType == null || Objects.equals(extractTokenType(token), expectedTokenType);

        return username.equals(userDetails.getUsername()) && !isTokenExpired(token) && tokenTypeMatches;
    }

    private String extractTokenType(String token) {
        return extractClaim(token, claims -> claims.get(TOKEN_TYPE_CLAIM, String.class));
    }

    public String generateAccessToken(String username) {
        return generateToken(username, false);
    }

    public String generateRefreshToken(String username) {
        return generateToken(username, true);
    }

    public String generateToken(String username, Boolean isRefreshToken) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(TOKEN_TYPE_CLAIM, Boolean.TRUE.equals(isRefreshToken) ? REFRESH_TOKEN_TYPE : ACCESS_TOKEN_TYPE);
        return createToken(claims, username, isRefreshToken);
    }

    private String createToken(Map<String, Object> claims, String username, Boolean isRefreshToken) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(getExpirationDate(isRefreshToken))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Date getExpirationDate(Boolean isRefreshToken) {
        Duration duration = Boolean.TRUE.equals(isRefreshToken)
                ? Duration.ofDays(refreshTokenExpirationInDays)
                : Duration.ofMinutes(accessTokenExpirationMinutes);

        return new Date(System.currentTimeMillis() + duration.toMillis());
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String refreshAccessToken(String username) {
        return generateAccessToken(username);
    }
}
