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
  @ManyToOne
  private Quiz quiz;
  @Column(nullable = false)
  private int index;
  private String question;
  @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
  private List<Answer> answers;
  @Column(nullable = false)
  private int timeLimit;
}