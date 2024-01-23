package com.codecool.quizzzz.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
}
