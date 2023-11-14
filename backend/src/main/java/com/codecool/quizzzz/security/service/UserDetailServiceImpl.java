package com.codecool.quizzzz.security.service;

import com.codecool.quizzzz.model.user.UserEntity;
import com.codecool.quizzzz.service.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  public UserDetailServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity user = userRepository.findByUsername(username)
                                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username " + username));
    List<SimpleGrantedAuthority> roles = user.getRoles()
                                             .stream()
                                             .map(role -> new SimpleGrantedAuthority(role.name()))
                                             .toList();
    System.out.println(roles.size());
    return new User(username, user.getPassword(), roles);
  }
}
