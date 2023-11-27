package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.user.NewUserDTO;
import com.codecool.quizzzz.dto.user.UserDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.user.RoleEnum;
import com.codecool.quizzzz.model.user.UserEntity;
import com.codecool.quizzzz.service.repository.RoleRepository;
import com.codecool.quizzzz.service.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final RoleRepository repository;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository repository) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.repository = repository;
  }

  public void create(NewUserDTO newUserDTO) {
    UserEntity user = newUserDTOtoModel(newUserDTO);
    user.setRoles(Set.of(repository.findByName(RoleEnum.ROLE_USER)
                                   .orElseThrow(() -> new NotFoundException("user")))); // TODO: better exception
    userRepository.save(user);
  }

  private UserEntity newUserDTOtoModel(NewUserDTO newUserDTO) {
    return UserEntity.builder()
                     .email(newUserDTO.email())
                     .username(newUserDTO.username())
                     .password(passwordEncoder.encode(newUserDTO.password()))
                     .build();
  }

  public UserDTO getById(long id) {
    UserEntity user = getUserById(id);
    return modelToUserDTO(user);
  }

  public UserEntity getUserById(long id) {
    return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User", id));
  }

  private UserDTO modelToUserDTO(UserEntity user) {
    return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRoles());
  }

  public void delete(long id) {
    userRepository.deleteById(id);
  }
}
