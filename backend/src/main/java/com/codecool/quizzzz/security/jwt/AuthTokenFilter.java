package com.codecool.quizzzz.security.jwt;

import com.codecool.quizzzz.model.user.Credential;
import com.codecool.quizzzz.security.authmodel.AuthenticationModel;
import com.codecool.quizzzz.service.logger.Logger;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

public class AuthTokenFilter extends OncePerRequestFilter {
  private final JwtUtils jwtUtils;
  private final Logger logger;

  public AuthTokenFilter(JwtUtils jwtUtils, Logger logger) {
    this.jwtUtils = jwtUtils;
    this.logger = logger;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    try {
      String jwt = parseJwt(request);
      if (jwt != null) {
        Jws<Claims> claimsJws = jwtUtils.validateJwtToken(jwt);
        if (claimsJws != null) {
          Credential credential = jwtUtils.getCredentialFromJwtToken(claimsJws);
          Collection<? extends GrantedAuthority> authorities = jwtUtils.getAuthoritiesFromJwtToken(claimsJws);

          AuthenticationModel authenticationToken = new AuthenticationModel(credential, authorities);
          authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
      }
    }
    catch (Exception e) {
      logger.logError(e.getMessage(), "Cannot set user authentication");
    }

    filterChain.doFilter(request, response);
  }

  private String parseJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");
    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7);
    }
    return null;
  }
}
