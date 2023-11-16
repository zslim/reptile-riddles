package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.NewPlayerDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.*;
import com.codecool.quizzzz.service.repository.GameRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

  public GameQuizDTO createGame(Long quizId) {
    Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new NotFoundException("No quiz found with this id!"));
    Game newGame = new Game(quiz);
    gameRepository.addGame(newGame);
    return new GameQuizDTO(newGame.getGameId(), quiz.getTitle(), quiz.getTaskCount());
  }

  public boolean joinToGame(Long gameId, NewPlayerDTO newPlayerDTO) {
    Game game = gameRepository.findGameById(gameId).orElseThrow(() -> new NotFoundException("No game found with this id!"));
    String username = getUsernameFromSecurityContext();
    game.addPlayer(new Player(newPlayerDTO.playerName(), username));
    return true;
  }

  private String getUsernameFromSecurityContext() {
    return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
  }

  public GameTaskDTO getNextTaskFromGame(Long gameId) {
    Game game = gameRepository.findGameById(gameId)
                              .orElseThrow(() -> new NotFoundException("No game found with this id!"));
    Task nextTask = game.advanceToNextTask();
    game.setDeadline(LocalDateTime.now().plusSeconds((long) nextTask.getTimeLimit() + Game.DEADLINE_OFFSET));
    return taskToGameTaskDTO(nextTask, game.getDeadline(), game.getCurrentTaskIndex());
  }

  private GameTaskDTO taskToGameTaskDTO(Task nextTask, LocalDateTime deadline, int currentTaskIndex) {
    List<GameAnswerDTO> gameAnswerDTOList = getGameAnswerDTOList(nextTask.getAnswers());
    return new GameTaskDTO(nextTask.getQuestion(), gameAnswerDTOList, deadline, currentTaskIndex);
  }

  private List<GameAnswerDTO> getGameAnswerDTOList(List<Answer> answers) {
    return answers.stream().map((answer -> new GameAnswerDTO(answer.getId(), answer.getText()))).toList();
  }

  public Boolean handleAnswerSubmit(Long gameId, Long answerId) {
    Game game = gameRepository.findGameById(gameId).orElseThrow(() -> new NotFoundException("No game found with this id!"));
    String username = getUsernameFromSecurityContext();
    Player player = game.getPlayerByUsername(username);
    Answer answer = game.getCurrentTask().getAnswerById(answerId).orElseThrow();
    int scoreGain = answer.isCorrect() ? game.calculateScoreGain(LocalDateTime.now()) : 0;
    //TODO: make sure a player can't get points twice for the same question
    player.updateScore(scoreGain);
    return answer.isCorrect();
  }

  public List<PlayerDTO> getResult(Long gameId) {
    Game game = gameRepository.findGameById(gameId)
                              .orElseThrow(() -> new NotFoundException("No game found with this id!"));
    return game.getTopPlayers(5)
               .stream()
               .map(player -> new PlayerDTO(player.getPlayerId(), player.getScore(), player.getPlayerName()))
               .toList();
  }
}
