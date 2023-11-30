package com.codecool.quizzzz.security.jwt;

//import com.codecool.quizzzz.service.logger.Logger;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
  private final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

//  public AuthEntryPointJwt(Logger logger) {
//    this.logger = logger;
//  }

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
                       AuthenticationException authException) throws IOException, ServletException {
    //logger.logError(authException.getMessage(), "Unauthorized error: {}");
    logger.error("Unauthorized error: " + authException.getMessage());
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
  }
}
