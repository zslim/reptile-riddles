package com.codecool.quizzzz.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Quiz {
  @Id
  @GeneratedValue
  private Long id;
  @ColumnDefault("'My new quiz'")
  private String title;
  @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
  private List<Task> tasks;
  @ColumnDefault("false")
  private boolean isPublic;
  @ColumnDefault("false")
  private boolean isValid;

  public void addTask(Task task) {
    this.tasks.add(task);
    task.setQuiz(this);
  }
}
