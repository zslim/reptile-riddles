package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.user.*;
import com.codecool.quizzzz.security.jwt.AuthTokenFilter;
import com.codecool.quizzzz.service.AuthenticationService;
import com.codecool.quizzzz.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private static final int MS_TO_SEC = 1000;
  private static final String DELETED = "";
  private final UserService userService;
  private final AuthenticationService authenticationService;
  @Value("${codecool.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public UserController(UserService userService, AuthenticationManager authenticationManager,
                        AuthenticationService authenticationService) {
    this.userService = userService;
    this.authenticationService = authenticationService;
  }

  @PostMapping("/register")
  public ResponseEntity<Void> createUser(@RequestBody NewUserDTO newUserDTO) {
    userService.create(newUserDTO);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping("/{userId}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable long userId) {
    return ResponseEntity.ok().body(userService.getById(userId));
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<Void> deleteUser(@PathVariable long userId) {
    userService.delete(userId);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/login")
  public ResponseEntity<UserInfoDTO> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
    UserInfoJwtDTO userInfoJwtDTO = authenticationService.login(loginDTO);
    UserInfoDTO userInfoDTO = new UserInfoDTO(userInfoJwtDTO.username(), userInfoJwtDTO.roles());
    Cookie cookie = generateCookie(userInfoJwtDTO.jwt());
    response.addCookie(cookie);
    return ResponseEntity.ok().body(userInfoDTO);
  }

  private Cookie generateCookie(String userToken) {
    Cookie cookie = new Cookie(AuthTokenFilter.USER_TOKEN, userToken);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(jwtExpirationMs / MS_TO_SEC);
    return cookie;
  }

  @GetMapping("/credentials")
  public ResponseEntity<UserInfoDTO> getCredentials() {
    return ResponseEntity.ok().body(authenticationService.getCredentials());
  }

  @DeleteMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletResponse response) {
    Cookie cookie = generateDeletedCookie();
    response.addCookie(cookie);
    return ResponseEntity.ok().build();
  }

  private Cookie generateDeletedCookie() {
    Cookie cookie = new Cookie(AuthTokenFilter.USER_TOKEN, DELETED);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(1);
    return cookie;
  }

  @PostMapping("/guestlogin")
  public ResponseEntity<UserInfoDTO> loginAsGuest(HttpServletResponse response) {
    UserInfoJwtDTO userInfoJwtDTO = authenticationService.loginAsGuest();
    UserInfoDTO userInfoDTO = new UserInfoDTO(userInfoJwtDTO.username(), userInfoJwtDTO.roles());
    Cookie cookie = generateCookie(userInfoJwtDTO.jwt());
    response.addCookie(cookie);
    return ResponseEntity.ok().body(userInfoDTO);
  }
}
