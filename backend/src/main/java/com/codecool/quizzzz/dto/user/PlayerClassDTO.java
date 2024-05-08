package com.codecool.quizzzz.dto.user;

import lombok.Getter;
import lombok.Setter;
import java.util.UUID;
@Getter
@Setter
public class PlayerClassDTO {
  private String name;
  private UUID gameId;

  public PlayerClassDTO() {
  }

  public PlayerClassDTO(String name, UUID gameId) {
    this.name = name;
    this.gameId = gameId;
  }

}
