package com.codecool.quizzzz.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerClassDTO {
  private String name;
  private Long gameId;

  public PlayerClassDTO() {
  }

  public PlayerClassDTO(String name, Long gameId) {
    this.name = name;
    this.gameId = gameId;
  }

}

