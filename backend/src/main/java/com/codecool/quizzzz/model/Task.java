package com.codecool.quizzzz.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task {
  @Id
  @GeneratedValue
  private Long id;
  private int index;
  @OneToMany
  @JoinColumn(name = "task_id")
  private List<Answer> answers;
  private int timeLimit;
}