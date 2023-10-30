package com.codecool.quizzzz.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Quiz {
  @Id
  @GeneratedValue
  private Long id;
  private String title;
  @OneToMany
  @JoinColumn(name = "quiz_id")
  private List<Task> tasks;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public List<Task> getTasks() {
    return tasks;
  }

  public void setTasks(List<Task> tasks) {
    this.tasks = tasks;
  }
}
