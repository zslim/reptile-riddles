package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.model.Answer;

import java.util.List;

public interface AnswerDAO {
  List<Answer> getAnswersOfTask(int taskId);
  void addAnswerToTask(int taskId, NewAnswerDTO newAnswerDTO);
  void addAnswersToTask(int taskId, List<NewAnswerDTO> newAnswerDTOs);
  boolean checkIfAnswerIsCorrect(int answerId);
}
