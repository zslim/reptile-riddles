package com.codecool.quizzzz.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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
  private List<Answer> answers = new ArrayList<>();
  @Column(nullable = false)
  private int timeLimit;
  @CreationTimestamp
  private LocalDateTime createdAt;
  @UpdateTimestamp
  private LocalDateTime modifiedAt;

  public Optional<Answer> getAnswerById(Long answerId) {
    return answers.stream().filter(answer -> answer.getId().equals(answerId)).findFirst();
  }

  public void addAllAnswers(Collection<? extends Answer> c) {
    for (Answer a : c) {
      this.addAnswer(a);
    }
  }

  public void addAnswer(Answer answer) {
    this.answers.add(answer);
    answer.setTask(this);
  }

  public void removeAnswer(Answer a) {
    this.answers.remove(a);
  }

  public void deleteAllAnswers() {
    this.answers.forEach(a -> a.setTask(null));
  }
}
