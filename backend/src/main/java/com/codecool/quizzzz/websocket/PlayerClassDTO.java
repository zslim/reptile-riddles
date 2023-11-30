package com.codecool.quizzzz.websocket;

public class PlayerClassDTO {
  private String name;
  private Long gameId;

  public PlayerClassDTO() {
  }

  public PlayerClassDTO(String name, Long gameId) {
    this.name = name;
    this.gameId = gameId;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setGameId(Long gameId) {
    this.gameId = gameId;
  }

  public String getName() {
    return name;
  }

  public Long getGameId() {
    return gameId;
  }
}

