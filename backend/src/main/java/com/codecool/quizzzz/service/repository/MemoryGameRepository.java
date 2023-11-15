package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Game;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class MemoryGameRepository implements GameRepository {
  private final Set<Game> gameSet = new HashSet<>();

  @Override
  public void addGame(Game game) {
    gameSet.add(game);
  }

  @Override
  public Game findGameById(Long gameId) {
    return gameSet.stream().filter(game -> Objects.equals(game.getGameId(), gameId)).findFirst().orElse(null);
  }
}
