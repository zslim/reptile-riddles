package com.codecool.quizzzz.model.user;

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
  private String username;
  private String email;
  private String password;
  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
          name = "role_user_entity",
          joinColumns = {@JoinColumn(name = "role_id")},
          inverseJoinColumns = {@JoinColumn(name = "user_id")}
  )
  private Set<Role> roles;

  public Set<RoleEnum> getRoles(){
    System.out.println(roles.size());
    return roles.stream().map(Role::getName).collect(Collectors.toSet());
  }
}
