package app.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

@Log4j2
@Service
@PropertySource("classpath:jwt.properties")
public class JwtTokenService {
    @Value("${jwt.secret}")
    private String secret;

    private static Long day = 24 * 60 * 60 * 1000L;
    private static Long week = 7 * day;

    public String generateToken(Integer userId) {
        Date now = new Date();
        // Token will be expired in 7 days
        Date expiry = new Date(now.getTime() + week);
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }

    private Optional<Integer> toIntSafe(String raw) {
        try {
            return Optional.of(Integer.parseInt(raw));
        } catch (NumberFormatException ex) {
            log.error("User Id parse Error ", ex.getMessage());
            return Optional.empty();
        }
    }

    public Optional<Integer> parseToken(String token) {
        String s = extractClaim(token, Claims::getSubject);
        return toIntSafe(s);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}