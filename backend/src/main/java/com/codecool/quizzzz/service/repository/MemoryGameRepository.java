package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.model.Game;
import com.codecool.quizzzz.model.Quiz;

import java.util.HashSet;
import java.util.Set;
import java.util.List;

public class MemoryGameRepository implements GameRepository {
  private final Set<Game> gameSet = new HashSet<>();
  private Long lastGameId = 0L;

  public GameQuizDTO addGame(Quiz quiz) {
    Game newGame = new Game(++lastGameId, quiz);
    gameSet.add(newGame);
    return gameToGameQuizDTO(newGame);
  }

  public void removeGame(Long gameId) {
    Game gameToRemove = gameSet.stream().filter(game -> game.getGameId().equals(gameId)).findFirst().orElseThrow();
    gameSet.remove(gameToRemove);
  }

  private GameQuizDTO gameToGameQuizDTO(Game game) {
    return new GameQuizDTO(game.getGameId(), game.getQuiz().getTitle(), game.getQuiz().getTasks().size());
  }

  public Long addPlayerToGameWithId(Long gameId, String name){
    Game selectedGame = gameSet.stream().filter(game -> game.getGameId().equals(gameId)).findFirst().orElseThrow();
    return selectedGame.addPlayer(name);
  }

  public GameTaskDTO getNextTaskFromGame(Long gameId){
    Game selectedGame = gameSet.stream().filter(game -> game.getGameId().equals(gameId)).findFirst().orElseThrow();
    return selectedGame.getNextTask();
  }

  public Boolean handleAnswerSubmit(Long gameId, Long playerId, Long answerId){
    Game selectedGame = gameSet.stream().filter(game -> game.getGameId().equals(gameId)).findFirst().orElseThrow();
    return selectedGame.handleAnswerSubmit(playerId, answerId);
  }

  public List<PlayerDTO> getResult(Long gameId){
    Game selectedGame = gameSet.stream().filter(game -> game.getGameId().equals(gameId)).findFirst().orElseThrow();
    return selectedGame.getResult();
  }

}
