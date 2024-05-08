package com.codecool.quizzzz.security;

import com.codecool.quizzzz.security.jwt.AuthEntryPointJwt;
import com.codecool.quizzzz.security.jwt.AuthTokenFilter;
import com.codecool.quizzzz.security.jwt.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
  private final Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

  public WebSecurityConfig(UserDetailsService userDetailsService, JwtUtils jwtUtils,
                           //                         AuthEntryPointJwt unauthorizedHandler, Logger logger) {
                           AuthEntryPointJwt unauthorizedHandler) {
    this.userDetailsService = userDetailsService;
    this.jwtUtils = jwtUtils;
    this.unauthorizedHandler = unauthorizedHandler;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//    System.out.println(http);
    http.csrf(AbstractHttpConfigurer::disable)
        .cors(AbstractHttpConfigurer::disable)
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth.requestMatchers("api/user/login")
                                           .permitAll()
                                           .requestMatchers("api/user/register")
                                           .permitAll()
                                           .requestMatchers("api/user/credentials")
                                           .permitAll()
                                           .requestMatchers("api/user/logout")
                                           .hasRole("USER")
                                           .requestMatchers("api/quiz/**")
                                           .hasRole("USER")
                                           .requestMatchers("api/task/**")
                                           .hasRole("USER")
                                           .requestMatchers("api/answer/**")
                                           .hasRole("USER")
                                           .requestMatchers("api/game/**")
                                           .permitAll()
//                                           .hasAnyRole("USER", "GUEST")
//                                           .requestMatchers("socket.io/**")
//                                           .hasAnyRole("USER", "GUEST")
                                           .anyRequest()
                                           .authenticated());
//            .authorizeHttpRequests(auth -> auth.requestMatchers("/**").permitAll());
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
    // return new AuthTokenFilter(jwtUtils, logger);
    return new AuthTokenFilter(jwtUtils);
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
