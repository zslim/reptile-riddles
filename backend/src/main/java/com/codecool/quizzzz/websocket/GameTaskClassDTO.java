package com.codecool.quizzzz.websocket;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
public final class GameTaskClassDTO {
  private final String question;
  private final ArrayList<GameAnswerDTO> answers;
  private final LocalDateTime deadline;
  private final int taskIndex;

  public GameTaskClassDTO(String question, ArrayList<GameAnswerDTO> answers, LocalDateTime deadline, int taskIndex) {
    this.question = question;
    this.answers = answers;
    this.deadline = deadline;
    this.taskIndex = taskIndex;
  }
}
