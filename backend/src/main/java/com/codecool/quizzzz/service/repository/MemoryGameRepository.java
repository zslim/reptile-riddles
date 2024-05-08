package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.dto.game.GameListDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.model.Game;

import java.util.List;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class MemoryGameRepository implements GameRepository {
  private Set<Game> gameSet = new HashSet<>();

  @Override
  public void addGame(Game game) {
    gameSet.add(game);
  }

  @Override
  public void removeGame(UUID gameId) {
    gameSet = gameSet.stream()
                     .filter(game -> !Objects.equals(game.getGeneratedId(), gameId))
                     .collect(Collectors.toSet());
  }

  @Override
  public Optional<Game> findGameById(Long gameId) {
    return gameSet.stream().filter(game -> Objects.equals(game.getGameId(), gameId)).findFirst();
  }

  @Override
  public Optional<Game> findGameByUUID(UUID gameUUID) {
    return gameSet.stream().filter(game -> Objects.equals(game.getGeneratedId(), gameUUID)).findFirst();
  }

  @Override
  public List<GameListDTO> getGameList() {
    return gameSet.stream()
                  .map(game -> new GameListDTO(game.getGameId(),
                                               game.getGeneratedId(),
                                               game.getPlayerSet().size(),
                                               game.getQuiz().getTitle()))
                  .toList();
  }

  @Override
  public GameQuizDTO getQuizByGameId(Long gameId) {
    Game selectedGame = gameSet.stream().filter(game -> gameId.equals(game.getGameId())).findFirst().orElseThrow();
    return new GameQuizDTO(selectedGame.getGameId(),
                           selectedGame.getGeneratedId(),
                           selectedGame.getQuiz().getTitle(),
                           selectedGame.getQuiz().getTaskCount(),
                           selectedGame.getPlayerSet().size());
  }
}
