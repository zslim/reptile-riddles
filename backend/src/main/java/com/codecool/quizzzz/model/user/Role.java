package com.codecool.quizzzz.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Role {
  @Id
  @GeneratedValue
  private Long id;
  @Enumerated(value = EnumType.STRING)
  private RoleEnum name;
}
