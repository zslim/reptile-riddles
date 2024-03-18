package com.codecool.quizzzz.dto.game;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class GameDataClassDTO {
  private Long gameId;
  private UUID gameUUID;

  public GameDataClassDTO() {
  }

  public GameDataClassDTO(Long gameId, UUID gameUUID) {
    this.gameId = gameId;
    this.gameUUID = gameUUID;
  }

}
