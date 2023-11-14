package com.codecool.quizzzz.security.jwt;

import com.codecool.quizzzz.service.logger.Logger;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
  private final Logger logger;
  @Value("${codecool.app.jwtSecret}")
  private String jwtSecret;
  @Value("${codecool.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public JwtUtils(Logger logger) {
    this.logger = logger;
  }

  public String generateJwtToken(Authentication authentication){
    UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

    return Jwts.builder()
               .setSubject(userPrincipal.getUsername())
               .setIssuedAt(new Date())
               .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
               .signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true;
    }
    catch (MalformedJwtException e) {
      logger.logError(e.getMessage(), "Invalid JWT token");
    }
    catch (ExpiredJwtException e) {
      logger.logError("JWT token is expired", e.getMessage());
    }
    catch (UnsupportedJwtException e) {
      logger.logError("JWT token is unsupported", e.getMessage());
    }
    catch (IllegalArgumentException e) {
      logger.logError("JWT claims string is empty", e.getMessage());
    }

    return false;
  }
}
