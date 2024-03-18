package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.dto.game.GameListDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.model.Game;

import java.util.*;
import java.util.Optional;

public interface GameRepository {
  void addGame(Game game);
  void removeGame(UUID gameId);
  Optional<Game> findGameById(Long gameId);
  List<GameListDTO> getGameList();
  GameQuizDTO getQuizByGameId(Long gameId);
  Optional<Game> findGameByUUID(UUID gameUUID);
}
