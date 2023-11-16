package com.codecool.quizzzz.security.jwt;

import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.user.Credentials;
import com.codecool.quizzzz.security.authmodel.AuthenticationModel;
import com.codecool.quizzzz.service.logger.Logger;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;

public class AuthTokenFilter extends OncePerRequestFilter {
  public static final String USER_TOKEN = "user_token";
  private final JwtUtils jwtUtils;
  private final Logger logger;

  public AuthTokenFilter(JwtUtils jwtUtils, Logger logger) {
    this.jwtUtils = jwtUtils;
    this.logger = logger;
  }

  @Override
  protected void doFilterInternal(@Nonnull HttpServletRequest request, @Nonnull HttpServletResponse response,
                                  @Nonnull FilterChain filterChain) throws ServletException, IOException {
    try {
      String jwt = parseJwt(request);
      if (jwt != null) {
        Jws<Claims> claimsJws = jwtUtils.validateJwtToken(jwt);
        if (claimsJws != null) {
          Credentials credentials = jwtUtils.getCredentialFromJwtToken(claimsJws);
          Collection<? extends GrantedAuthority> authorities = jwtUtils.getAuthoritiesFromJwtToken(claimsJws);
          AuthenticationModel authenticationToken = new AuthenticationModel(credentials, authorities);
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
    Cookie sessionCookie = getSessionCookie(request);
    return sessionCookie.getValue();
  }

  private Cookie getSessionCookie(HttpServletRequest request) {
    return Arrays.stream(request.getCookies())
                 .filter(this::getSessionIdCookie)
                 .findFirst()
                 .orElseThrow(() -> new NotFoundException("There is no user token"));
  }

  private boolean getSessionIdCookie(Cookie cookie) {
    return cookie.getName().equalsIgnoreCase(USER_TOKEN);
  }
}
