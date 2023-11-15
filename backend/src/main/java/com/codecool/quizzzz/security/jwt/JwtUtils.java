package com.codecool.quizzzz.security.jwt;

import com.codecool.quizzzz.model.user.Credential;
import com.codecool.quizzzz.service.logger.Logger;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;

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

  public String generateJwtToken(Authentication authentication) {
    UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
    List<String> authorities = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    Date issuedAt = new Date();
    Date expiration = new Date(issuedAt.getTime() + jwtExpirationMs);

    return Jwts.builder()
               .setSubject(userPrincipal.getUsername())
               .claim("roles", authorities)
               .setIssuedAt(issuedAt)
               .setExpiration(expiration)
               .signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String generateJwtToken(String username) {
    return Jwts.builder()
               .setSubject(username)
               .claim("roles", List.of())
               .setIssuedAt(new Date())
               .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
               .signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  public Credential getCredentialFromJwtToken(Jws<Claims> claims) {
    return new Credential(claims.getBody().getSubject());
  }

  public Collection<? extends GrantedAuthority> getAuthoritiesFromJwtToken(Jws<Claims> claims) {
    List<String> roles = (List<String>) claims.getBody().get("roles");
    return roles.stream().map(SimpleGrantedAuthority::new).toList();
  }

  public Jws<Claims> validateJwtToken(String authToken) {
    try {
      return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
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

    return null;
  }
}
