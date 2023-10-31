package com.codecool.quizzzz.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
  @OneToMany(mappedBy = "quiz")
  private List<Task> tasks;

  public boolean addTask(Task task) {
    task.setQuiz(this);
    return tasks.add(task);
  }
}
