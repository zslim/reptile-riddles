package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.dto.game.GameListDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.model.Game;

import java.util.*;
import java.util.stream.Collectors;

public class MemoryGameRepository implements GameRepository {
  private Set<Game> gameSet = new HashSet<>();

  @Override
  public void addGame(Game game) {
    gameSet.add(game);
  }

  @Override
  public void removeGame(Long gameId) {
    gameSet = gameSet.stream().filter(game -> !Objects.equals(game.getGameId(), gameId)).collect(Collectors.toSet());
  }

  @Override
  public Optional<Game> findGameById(Long gameId) {
    return gameSet.stream().filter(game -> Objects.equals(game.getGameId(), gameId)).findFirst();
  }

  @Override
  public List<GameListDTO> getGameList() {
    return gameSet.stream()
                  .map(game -> new GameListDTO(game.getGameId(), game.getPlayerSet().size(), game.getQuiz().getTitle()))
                  .toList();
  }

  @Override
  public GameQuizDTO getQuizByGameId(Long gameId) {
    Game selectedGame = gameSet.stream().filter(game -> gameId.equals(game.getGameId())).findFirst().orElseThrow();
    return new GameQuizDTO(selectedGame.getGameId(),
                           selectedGame.getQuiz().getTitle(),
                           selectedGame.getQuiz().getTaskCount(),
                           selectedGame.getPlayerSet().size());
  }
}
