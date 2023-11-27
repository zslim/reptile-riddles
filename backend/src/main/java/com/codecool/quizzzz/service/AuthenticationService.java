package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.user.LoginDTO;
import com.codecool.quizzzz.dto.user.UserInfoDTO;
import com.codecool.quizzzz.dto.user.UserInfoJwtDTO;
import com.codecool.quizzzz.model.user.Credentials;
import com.codecool.quizzzz.model.user.RoleEnum;
import com.codecool.quizzzz.model.user.UserEntity;
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
  private final UserService userService;

  public AuthenticationService(AuthenticationManager authenticationManager, JwtUtils jwtUtils,
                               UserService userService) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
    this.userService = userService;
  }

  public UserInfoJwtDTO login(LoginDTO loginDTO) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.username(),
                                                                                                               loginDTO.password()));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = (User) authentication.getPrincipal();
    String jwt = jwtUtils.generateUserJwtToken(authentication);
    List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    return new UserInfoJwtDTO(jwt, loginDTO.username(), roles);
  }

  public UserInfoJwtDTO loginAsGuest() {
    String username = String.format("GUEST-%s", UUID.randomUUID());
    String jwt = jwtUtils.generateGuestJwtToken(username);
    List<String> roles = List.of(RoleEnum.ROLE_GUEST.toString());
    return new UserInfoJwtDTO(jwt, username, roles);
  }

  public UserInfoDTO getCredentials() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Credentials userCredentials = (Credentials) authentication.getPrincipal();
    String username = userCredentials.username();
    List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    return new UserInfoDTO(username, roles);
  }

  public UserEntity getUser() {
    Credentials userCredentials = (Credentials) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return userService.getUserById(userCredentials.user_id());
  }
}
