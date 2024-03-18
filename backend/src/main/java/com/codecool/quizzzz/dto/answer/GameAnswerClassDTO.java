package com.codecool.quizzzz.dto.answer;

import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class GameAnswerClassDTO {
  private Long answerId;
  private String text;
  private Long gameId;
  private UUID playerId;

  public GameAnswerClassDTO() {
  }

  public GameAnswerClassDTO(Long answerId, String text, Long gameId, UUID playerId) {
    this.answerId = answerId;
    this.text = text;
    this.gameId = gameId;
    this.playerId = playerId;
  }
}
