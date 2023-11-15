package com.codecool.quizzzz.security;

import com.codecool.quizzzz.security.jwt.AuthEntryPointJwt;
import com.codecool.quizzzz.security.jwt.AuthTokenFilter;
import com.codecool.quizzzz.security.jwt.JwtUtils;
import com.codecool.quizzzz.service.logger.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
  private final UserDetailsService userDetailsService;
  private final JwtUtils jwtUtils;
  private final AuthEntryPointJwt unauthorizedHandler;
  private final Logger logger;

  public WebSecurityConfig(UserDetailsService userDetailsService, JwtUtils jwtUtils,
                           AuthEntryPointJwt unauthorizedHandler, Logger logger) {
    this.userDetailsService = userDetailsService;
    this.jwtUtils = jwtUtils;
    this.unauthorizedHandler = unauthorizedHandler;
    this.logger = logger;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .cors(AbstractHttpConfigurer::disable)
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth.requestMatchers("user/**")
                                           .permitAll()
                                           .requestMatchers("quiz/**")
                                           .hasRole("USER")
                                           .requestMatchers("task/**")
                                           .hasRole("USER")
                                           .requestMatchers("answer/**")
                                           .hasRole("USER")
                                           .anyRequest()
                                           .authenticated());
    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
    authenticationProvider.setPasswordEncoder(passwordEncoder());
    authenticationProvider.setUserDetailsService(userDetailsService);
    return authenticationProvider;
  }

  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter(jwtUtils, logger);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
    return auth.getAuthenticationManager();
  }
}
