package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Game;

public interface GameRepository {
  void addGame(Game game);
  Game findGameById(Long gameId);
}
