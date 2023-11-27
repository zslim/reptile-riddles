package com.codecool.quizzzz.security.jwt;

import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.user.Credentials;
import com.codecool.quizzzz.model.user.RoleEnum;
import com.codecool.quizzzz.model.user.UserEntity;
import com.codecool.quizzzz.service.logger.Logger;
import com.codecool.quizzzz.service.repository.UserRepository;
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
import java.util.function.Supplier;

@Component
public class JwtUtils {
  private final Logger logger;
  private final UserRepository userRepository;
  @Value("${codecool.app.jwtSecret}")
  private String jwtSecret;
  @Value("${codecool.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public JwtUtils(Logger logger, UserRepository userRepository) {
    this.logger = logger;
    this.userRepository = userRepository;
  }

  public String generateUserJwtToken(Authentication authentication) {
    UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
    List<String> authorities = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    Date issuedAt = new Date();
    Date expiration = new Date(issuedAt.getTime() + jwtExpirationMs);
    String username = userPrincipal.getUsername();
    UserEntity user = userRepository.findByUsername(username).orElseThrow(generateUsernameNotFoundException(username));

    return Jwts.builder()
               .setSubject(username)
               .claim("roles", authorities)
               .claim("user_id", user.getId())
               .setIssuedAt(issuedAt)
               .setExpiration(expiration)
               .signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  private Supplier<NotFoundException> generateUsernameNotFoundException(String username) {
    return () -> new NotFoundException("User not found with username: " + username);
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String generateGuestJwtToken(String username) {
    return Jwts.builder()
               .setSubject(username)
               .claim("roles", List.of(RoleEnum.ROLE_GUEST.toString()))
               .claim("user_id", -1)
               .setIssuedAt(new Date())
               .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
               .signWith(key(), SignatureAlgorithm.HS256)
               .compact();
  }

  public Credentials getCredentialFromJwtToken(Jws<Claims> claims) {
    return new Credentials(claims.getBody().getSubject(), Long.valueOf((Integer) claims.getBody().get("user_id")));
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
