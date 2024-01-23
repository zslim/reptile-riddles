package com.codecool.quizzzz.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskChangeClassDTO {
  private int taskIndex;
  private Long gameId;

  public TaskChangeClassDTO() {
  }

  public TaskChangeClassDTO(int taskIndex, Long gameId) {
    this.taskIndex = taskIndex;
    this.gameId = gameId;
  }
}
