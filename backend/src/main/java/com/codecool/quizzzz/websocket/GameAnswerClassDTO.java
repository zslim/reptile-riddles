package com.codecool.quizzzz.websocket;

public class GameAnswerClassDTO {
  private Long answerId;
  private String text;
  private Long gameId;
  private String username;

  public GameAnswerClassDTO() {
  }

  public GameAnswerClassDTO(Long answerId, String text, Long gameId, String username) {
    this.answerId = answerId;
    this.text = text;
    this.gameId = gameId;
    this.username = username;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Long getAnswerId() {
    return answerId;
  }

  public String getText() {
    return text;
  }

  public Long getGameId() {
    return gameId;
  }

  public void setAnswerId(Long answerId) {
    this.answerId = answerId;
  }

  public void setText(String text) {
    this.text = text;
  }

  public void setGameId(Long gameId) {
    this.gameId = gameId;
  }
}

