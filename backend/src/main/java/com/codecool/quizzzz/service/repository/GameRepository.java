package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Game;

import java.util.Optional;

public interface GameRepository {
  void addGame(Game game);
  Optional<Game> findGameById(Long gameId);
}
