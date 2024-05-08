package com.codecool.quizzzz.dto.task;

import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class TaskDataClassDTO {
  private int taskIndex;
  private UUID gameId;

  public TaskDataClassDTO() {
  }

  public TaskDataClassDTO(int taskIndex, UUID gameId) {
    this.taskIndex = taskIndex;
    this.gameId = gameId;
  }
}
