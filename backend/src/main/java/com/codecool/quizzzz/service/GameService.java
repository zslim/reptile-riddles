package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.NewPlayerDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.model.*;
import com.codecool.quizzzz.service.repository.GameRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    Quiz quiz = quizRepository.findById(quizId).orElseThrow();
    Game newGame = new Game(quiz);
    gameRepository.addGame(newGame);
    return new GameQuizDTO(newGame.getGameId(), quiz.getTitle(), quiz.getTaskCount());
  }

  // TODO: get information about how players will be stored (gen. from user? what abt guest users? spring sec tokens?)
  public Long joinToGame(Long gameId, NewPlayerDTO newPlayerDTO) {
    Game game = gameRepository.findGameById(gameId);
    game.addPlayer(new Player(newPlayerDTO.playerName()));
    return 1L;
  }

  public GameTaskDTO getNextTaskFromGame(Long gameId) {
    Game game = gameRepository.findGameById(gameId);
    Task nextTask = game.advanceToNextTask();
    game.setDeadline(LocalDateTime.now().plusSeconds((long) nextTask.getTimeLimit() + Game.DEADLINE_OFFSET));
    return taskToGameTaskDTO(nextTask, game.getDeadline(), game.getCurrentTaskIndex());
  }

  public Boolean handleAnswerSubmit(Long gameId, Long playerId, Long answerId) {
    Game game = gameRepository.findGameById(gameId);
    Player player = game.getPlayerById(playerId);
    Answer answer = game.getCurrentTask().getAnswerById(answerId).orElseThrow();
    int scoreGain = answer.isCorrect() ? game.calculateScoreGain(LocalDateTime.now()) : 0;
    //TODO: make sure a player can't get points twice for the same question
    player.updateScore(scoreGain);
    return answer.isCorrect();
  }

  public List<PlayerDTO> getResult(Long gameId) {
    Game game = gameRepository.findGameById(gameId);
    return game.getTopPlayers(5)
               .stream()
               .map(player -> new PlayerDTO(player.getPlayerId(), player.getScore(), player.getPlayerName()))
               .toList();
  }

  private GameTaskDTO taskToGameTaskDTO(Task nextTask, LocalDateTime deadline, int currentTaskIndex) {
    List<GameAnswerDTO> gameAnswerDTOList = getGameAnswerDTOList(nextTask.getAnswers());
    return new GameTaskDTO(nextTask.getQuestion(), gameAnswerDTOList, deadline, currentTaskIndex);
  }

  private List<GameAnswerDTO> getGameAnswerDTOList(List<Answer> answers) {
    return answers.stream()
                  .map((answer -> new GameAnswerDTO(answer.getId(), answer.getText())))
                  .collect(Collectors.toList());
  }
}
