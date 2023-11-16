package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.user.LoginDTO;
import com.codecool.quizzzz.dto.user.UserInfoDTO;
import com.codecool.quizzzz.dto.user.UserInfoJwtDTO;
import com.codecool.quizzzz.security.jwt.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AuthenticationService {
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;

  public AuthenticationService(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
  }

  public UserInfoJwtDTO login(LoginDTO loginDTO) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.username(),
                                                                                                               loginDTO.password()));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = (User) authentication.getPrincipal();
    String jwt = jwtUtils.generateJwtToken(authentication);
    List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    return new UserInfoJwtDTO(jwt, loginDTO.username(), roles);
  }

  // TODO: guest login

  public UserInfoDTO getCredentials() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getPrincipal().toString();
    List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    return new UserInfoDTO(username, roles);
  }
}
