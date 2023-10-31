package com.codecool.quizzzz.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Quiz {
  @Id
  @GeneratedValue
  private Long id;
  private String title;
  @OneToMany
  private List<Task> tasks;
}
