package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.user.LoginDTO;
import com.codecool.quizzzz.dto.user.NewUserDTO;
import com.codecool.quizzzz.dto.user.UserDTO;
import com.codecool.quizzzz.dto.user.UserInfoDTO;
import com.codecool.quizzzz.service.AuthenticationService;
import com.codecool.quizzzz.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
  private final UserService userService;
  private final AuthenticationService authenticationService;

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
  public ResponseEntity<UserInfoDTO> login(@RequestBody LoginDTO loginDTO) {
    return ResponseEntity.ok().body(authenticationService.login(loginDTO));
  }
}
