package com.codecool.quizzzz.model;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class Game {
  private final Long gameId;
  private final Set<Player> playerSet = new HashSet<>();
  private final Quiz quiz;
  private Long lastPlayerId = 0L;
  private int currentTaskIndex = 0;
  private LocalDateTime deadline;
  private final int DEADLINE_OFFSET = 0;
  private final int MIN_SCORE_PER_TASK = 500;
  private final int MAX_SCORE_PER_TASK = 1000;

  public Game(Long gameId, Quiz quiz) {
    this.gameId = gameId;
    this.quiz = quiz;
  }

  public Long addPlayer(String name) {
    lastPlayerId++;
    playerSet.add(new Player(lastPlayerId, name));
    return lastPlayerId;
  }

  public List<PlayerDTO> getResult() {
    return playerSet.stream()
                    .sorted(Comparator.comparingInt(Player::getScore))
                    .limit(5)
                    .map(player -> new PlayerDTO(player.getPlayerId(), player.getScore(), player.getPlayerName()))
                    .collect(Collectors.toList());
  }

  public GameTaskDTO getNextTask() {
    Task nextTask = quiz.getTasks().get(currentTaskIndex);
    deadline = LocalDateTime.now().plusSeconds((long) nextTask.getTimeLimit() + DEADLINE_OFFSET);
    currentTaskIndex++;
    return taskToGameTaskDTO(nextTask);
  }

  private GameTaskDTO taskToGameTaskDTO(Task nextTask) {
    List<GameAnswerDTO> gameAnswerDTOList = getGameAnswerDTOList(nextTask.getAnswers());
    return new GameTaskDTO(nextTask.getQuestion(), gameAnswerDTOList, deadline, currentTaskIndex);
  }

  private List<GameAnswerDTO> getGameAnswerDTOList(List<Answer> answers) {
    return answers.stream()
                  .map((answer -> new GameAnswerDTO(answer.getId(), answer.getText())))
                  .collect(Collectors.toList());
  }

  public Boolean handleAnswerSubmit(Long playerId, Long answerId) {
    Answer selectedAnswer = quiz.getTasks()
                                .stream()
                                .flatMap(task -> task.getAnswers().stream())
                                .filter(answer -> answer.getId().equals(answerId))
                                .findFirst()
                                .orElseThrow();

    Player submittingPlayer = playerSet.stream()
                                       .filter(player -> player.getPlayerId().equals(playerId))
                                       .findFirst()
                                       .orElseThrow();

    int gainedScore = selectedAnswer.isCorrect() ? calculateScoreGain() : 0;
    submittingPlayer.updateScore(gainedScore, selectedAnswer.getTask().getIndex());

    return selectedAnswer.isCorrect();
  }

  private int calculateScoreGain() {
    int score = 0;
    if (LocalDateTime.now().isBefore(deadline)) {
      int secondsDifference = (int) ChronoUnit.SECONDS.between(LocalDateTime.now(), deadline);
      int timeLimit = quiz.getTasks().get(currentTaskIndex - 1).getTimeLimit();
      int scoreInterval = (MAX_SCORE_PER_TASK - MIN_SCORE_PER_TASK);
      double timeFactor =  1 - (double) (timeLimit - secondsDifference) / timeLimit;
      score = (int) (MIN_SCORE_PER_TASK + (scoreInterval * timeFactor));
    }
    return score;
  }
}
