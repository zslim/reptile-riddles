package com.codecool.quizzzz.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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
  private String question;
  @ManyToOne
  private Quiz quiz;
  @OneToMany
  private List<Answer> answers;
  @Column(nullable = false)
  @ColumnDefault("30")
  private int timeLimit;
}