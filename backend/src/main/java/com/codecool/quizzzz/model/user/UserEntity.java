package com.codecool.quizzzz.model.user;

import com.codecool.quizzzz.model.Quiz;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_entity")
public class UserEntity {
  @Id
  @GeneratedValue
  private Long id;
  @Column(unique = true)
  private String username;
  @Column(unique = true)
  private String email;
  private String password;
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER) // TODO: change cascade
  private Set<Role> roles;
  @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
  private Set<Quiz> quizzes;

  public Set<RoleEnum> getRoles() {
    return roles.stream().map(Role::getName).collect(Collectors.toSet());
  }
}
