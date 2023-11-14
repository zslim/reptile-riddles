package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.model.Quiz;
import java.util.List;

public interface GameRepository {
  //  public void updateScore(Long GameId, Long PlayerId, int scoreChange);
  GameQuizDTO addGame(Quiz quiz);
  void removeGame(Long gameId);
  Long addPlayerToGameWithId(Long gameId, String name);
  GameTaskDTO getNextTaskFromGame(Long gameId);
  Boolean handleAnswerSubmit(Long gameId, Long playerId, Long answerId);
  List<PlayerDTO> getResult(Long gameId);
}
