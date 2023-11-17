package com.codecool.quizzzz.model;

import com.codecool.quizzzz.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
  @ManyToOne
  private UserEntity creator;
  @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
  private List<Task> tasks = new ArrayList<>();
  @Column(insertable = false)
  @ColumnDefault("false")
  private boolean isPublic;
  @Column(insertable = false)
  @ColumnDefault("false")
  private boolean isValid;
  @CreationTimestamp
  private LocalDateTime createdAt;
  @UpdateTimestamp
  private LocalDateTime modifiedAt;

  public void addTask(Task task) {
    this.tasks.add(task);
    task.setQuiz(this);
  }

  public LocalDateTime getLastModifiedTimestamp() {
    LocalDateTime result = this.modifiedAt;
    for (Task task : this.tasks) {
      if (task.getModifiedAt().isAfter(result)) {
        result = task.getModifiedAt();
      }
      for (Answer answer : task.getAnswers()) {
        if (answer.getModifiedAt().isAfter(result)) {
          result = answer.getModifiedAt();
        }
      }
    }
    return result;
  }

  public int getTaskCount() {
    return tasks.size();
  }
}
