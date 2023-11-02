package com.codecool.quizzzz.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer {
  @Id
  @GeneratedValue
  private Long id;
  @ManyToOne
  private Task task;
  private String text;
  private boolean isCorrect;
}
