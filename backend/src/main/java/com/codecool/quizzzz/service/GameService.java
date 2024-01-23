package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import com.codecool.quizzzz.dto.game.GameListDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.NewPlayerDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.*;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import com.codecool.quizzzz.service.repository.GameRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

@Service
public class GameService {
  private final QuizRepository quizRepository;
  private final TaskRepository taskRepository;
  private final AnswerRepository answerRepository;
  private final GameRepository gameRepository;
  private final EntityManager entityManager;

  @Autowired
  public GameService(QuizRepository quizRepository, TaskRepository taskRepository, AnswerRepository answerRepository,
                     GameRepository gameRepository, EntityManager entityManager) {
    this.quizRepository = quizRepository;
    this.taskRepository = taskRepository;
    this.answerRepository = answerRepository;
    this.gameRepository = gameRepository;
    this.entityManager = entityManager;
  }

  public GameQuizDTO createGame(Long quizId) {
    Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new NotFoundException("No quiz found with this id!"));
    quiz.setTasks(getTasksByQuizId(quiz.getId()));
    entityManager.detach(quiz);
    Game newGame = new Game(quiz);
    gameRepository.addGame(newGame);
    return new GameQuizDTO(newGame.getGameId(), quiz.getTitle(), quiz.getTaskCount(), newGame.getPlayerSet().size());
  }

  private List<Task> getTasksByQuizId(Long quizId) {
    List<Task> tasks = taskRepository.findAllByQuizId(quizId);
    for (Task task : tasks) {
      task.setAnswers(answerRepository.findAllByTaskId(task.getId()));
    }
    return tasks;
  }

  public boolean joinToGame(Long gameId, NewPlayerDTO newPlayerDTO) {
    Game game = gameRepository.findGameById(gameId)
                              .orElseThrow(() -> new NotFoundException("No game found with this id!"));
//    String username = getUsernameFromSecurityContext();
    if (game.isPlayerExist(newPlayerDTO.playerName()) == null) {
      String username = "notSoSafe";
      game.addPlayer(new Player(newPlayerDTO.playerName(), username));
    }
    return true;
  }

  private String getUsernameFromSecurityContext() {
    return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
  }

  public GameTaskDTO getNextTaskFromGame(Long gameId) {
    Game game = gameRepository.findGameById(gameId)
                              .orElseThrow(() -> new NotFoundException("No game found with this id!"));
    Task nextTask = game.advanceToNextTask();
    LocalDateTime lastValidTime = LocalDateTime.now()
                                               .plusSeconds((long) nextTask.getTimeLimit() + Game.DEADLINE_OFFSET);
    game.setDeadline(lastValidTime);
    return taskToGameTaskDTO(nextTask, lastValidTime, game.getCurrentTaskIndex());
  }

  private GameTaskDTO taskToGameTaskDTO(Task nextTask, LocalDateTime lastValidTime, int currentTaskIndex) {
    List<GameAnswerDTO> gameAnswerDTOList = getGameAnswerDTOList(nextTask.getAnswers());
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    return new GameTaskDTO(nextTask.getQuestion(),
                           gameAnswerDTOList,
                           lastValidTime.format(formatter),
                           currentTaskIndex);
  }

  private List<GameAnswerDTO> getGameAnswerDTOList(List<Answer> answers) {
    return answers.stream()
                  .map((answer -> new GameAnswerDTO(answer.getId(), answer.getText())))
                  .sorted(Comparator.comparing(GameAnswerDTO::answerId))
                  .toList();
  }

  public Boolean handleAnswerSubmit(Long gameId, Long answerId, String username) {
    Game game = gameRepository.findGameById(gameId)
                              .orElseThrow(() -> new NotFoundException("No game found with this id!"));
//    String username = getUsernameFromSecurityContext();
//    Player player = game.getPlayerByUsername(username);
    Player player = game.getPlayerByPlayerName(username);
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

  public List<GameListDTO> getGameList() {
    return gameRepository.getGameList();
  }

  public GameQuizDTO getQuizByGameId(Long gameId) {
    return gameRepository.getQuizByGameId(gameId);
  }
}
