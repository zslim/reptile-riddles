package com.codecool.quizzzz.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Task {
  @Id
  @GeneratedValue
  private Long id;
  private int index;
  @OneToMany
  @JoinColumn(name = "task_id")
  private List<Answer> answers;
  private int timeLimit;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getIndex() {
    return index;
  }

  public void setIndex(int index) {
    this.index = index;
  }

  public List<Answer> getAnswers() {
    return answers;
  }

  public void setAnswers(List<Answer> answers) {
    this.answers = answers;
  }

  public int getTimeLimit() {
    return timeLimit;
  }

  public void setTimeLimit(int timeLimit) {
    this.timeLimit = timeLimit;
  }
}