package com.codecool.quizzzz.model;

import lombok.Getter;

@Getter
public class Player {
  private static Long nextId = 1L;
  private final Long playerId;
  private final String username;
  private final String playerName;
  private int score = 0;

  public Player(String playerName, String username) {
    this.playerId = nextId++;
    this.playerName = playerName;
    this.username = username;
  }

  public void updateScore(int gainedScore) {
    score += gainedScore;
  }
}

