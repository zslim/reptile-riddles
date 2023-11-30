package com.codecool.quizzzz.model;

import com.codecool.quizzzz.exception.NotFoundException;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
public class Game {
  public static final int DEADLINE_OFFSET = 0;
  public static final int MIN_SCORE_PER_TASK = 500;
  public static final int MAX_SCORE_PER_TASK = 1000;
  private static Long nextId = 1L;
  private final Long gameId;
  private final Set<Player> playerSet = new HashSet<>();
  private final Quiz quiz;
  private int currentTaskIndex = -1;
  private LocalDateTime deadline;

  public Game(Quiz quiz) {
    this.gameId = nextId++;
    this.quiz = quiz;
  }

  public Long getGameId() {
    return gameId;
  }
  public void addPlayer(Player player) {
    playerSet.add(player);
  }

  public void removePlayer(Player player) {
    playerSet.remove(player);
  }

  public Player getPlayerByUsername(String username) {
    return playerSet.stream()
                    .filter(player -> player.getUsername().equals(username))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException(String.format("Player not found with username: %s",
                                                                           username)));
  }

  public Task advanceToNextTask() {
    currentTaskIndex++;
    return getCurrentTask();
  }

  public Task getCurrentTask() {
    return quiz.getTasks().get(currentTaskIndex);
  }

  public List<Player> getTopPlayers(int limit) {
    return playerSet.stream().sorted(Comparator.comparingInt(Player::getScore).reversed()).limit(limit).toList();
  }

  public int calculateScoreGain(LocalDateTime timeOfSubmit) {
    int secondsToMilliSeconds = 1000;
    int score = 0;
    if (timeOfSubmit.isBefore(deadline)) {
      int milliSecondsDifference = (int) ChronoUnit.MILLIS.between(timeOfSubmit, deadline);
      int timeLimit = quiz.getTasks().get(currentTaskIndex).getTimeLimit() * secondsToMilliSeconds;
      int scoreInterval = (MAX_SCORE_PER_TASK - MIN_SCORE_PER_TASK);
      double timeFactor = 1 - (double) (timeLimit - milliSecondsDifference) / timeLimit;
      score = (int) (MIN_SCORE_PER_TASK + (scoreInterval * timeFactor));
    }
    return score;
  }

  public void setDeadline(LocalDateTime deadline) {
    this.deadline = deadline;
  }

  public int getPlayerCount(){
    return playerSet.size();
  }

  public Player getPlayerByPlayerName(String username) {
    return playerSet.stream()
                    .filter(player -> player.getPlayerName().equals(username))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException(String.format("Player not found with username: %s",
                                                                           username)));
  }
}
