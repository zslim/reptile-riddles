package com.codecool.quizzzz.websocket;

public class TaskChangeClassDTO {
  private int taskIndex;
  private Long gameId;

  public TaskChangeClassDTO() {
  }

  public TaskChangeClassDTO(int taskIndex, Long gameId) {
    this.taskIndex = taskIndex;
    this.gameId = gameId;
  }

  public int getTaskIndex() {
    return taskIndex;
  }

  public void setTaskIndex(int taskIndex) {
    this.taskIndex = taskIndex;
  }

  public Long getGameId() {
    return gameId;
  }

  public void setGameId(Long gameId) {
    this.gameId = gameId;
  }
}
