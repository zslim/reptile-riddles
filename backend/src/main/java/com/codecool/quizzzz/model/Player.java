package com.codecool.quizzzz.model;

import java.util.UUID;

import com.codecool.quizzzz.model.user.Credentials;
import lombok.Getter;

@Getter
public class Player {
  private static Long nextId = 1L;
  private final Long playerId;
  private final UUID generatedId;
  private final Credentials credentials;
  private final String playerName;
  private int score = 0;

  public Player(String playerName, Credentials credentials) {
    this.playerId = nextId++;
    this.generatedId = UUID.randomUUID();
    this.playerName = playerName;
    this.credentials = credentials;
  }

  public void updateScore(int gainedScore) {
    score += gainedScore;
  }
}
