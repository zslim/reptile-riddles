package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.service.repository.GameRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GameService {
  private final QuizRepository quizRepository;
  private final GameRepository gameRepository;

  @Autowired
  public GameService(QuizRepository quizRepository, GameRepository gameRepository) {
    this.quizRepository = quizRepository;
    this.gameRepository = gameRepository;
  }

  public GameQuizDTO createGame(Long quizId){
    Quiz quiz = quizRepository.findById(quizId).orElseThrow();
    return gameRepository.addGame(quiz);
  }

  public Long joinToGame(Long gameId, String name){
    return gameRepository.addPlayerToGameWithId(gameId, name);
  }

  public GameTaskDTO getNextTaskFromGame(Long gameId){
    return gameRepository.getNextTaskFromGame(gameId);
  }

  public Boolean handleAnswerSubmit(Long gameId, Long playerId, Long answerId) {
    return gameRepository.handleAnswerSubmit(gameId, playerId, answerId);
  }

  public List<PlayerDTO> getResult(Long gameId){
    return gameRepository.getResult(gameId);
  }
}
