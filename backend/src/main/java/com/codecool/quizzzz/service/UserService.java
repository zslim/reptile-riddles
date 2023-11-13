package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.user.NewUserDTO;
import com.codecool.quizzzz.dto.user.UserDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.User;
import com.codecool.quizzzz.service.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void create(NewUserDTO newUserDTO) {
    userRepository.save(newUserDTOtoModel(newUserDTO)); // TODO: validate user details, like @ or password length
  }

  public UserDTO getById(long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User", id));
    return modelToUserDTO(user);
  }

  public void delete(long id){
    userRepository.deleteById(id);
  }

  private User newUserDTOtoModel(NewUserDTO newUserDTO) {
    return User.builder()
               .email(newUserDTO.email())
               .username(newUserDTO.username())
               .password(newUserDTO.password())
               .build();
  }

  private UserDTO modelToUserDTO(User user) {
    return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
  }
}
