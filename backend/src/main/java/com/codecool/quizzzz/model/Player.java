package com.codecool.quizzzz.model;
import lombok.Getter;
import java.util.Set;
import java.util.HashSet;

@Getter
public class Player {
  private final Long playerId;
  private final String playerName;
  private int score = 0;
  private Set<Integer> answeredTaskIndexes = new HashSet<>();

  public Player(Long playerId, String playerName) {
    this.playerId = playerId;
    this.playerName = playerName;
  }

  public void updateScore(int gainedScore, int taskIndex){
    if (!answeredTaskIndexes.contains(taskIndex)){
      score += gainedScore;
      answeredTaskIndexes.add(taskIndex);
    }
  }
}

