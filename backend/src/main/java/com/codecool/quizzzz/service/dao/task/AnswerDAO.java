package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.model.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerDAO {
  List<Answer> getAnswersOfTask(int taskId);
  Optional<Answer> getAnswer(int answerId);
  int addAnswerToTask(int taskId, NewAnswerDTO newAnswerDTO);
  void addAnswersToTask(int taskId, List<NewAnswerDTO> newAnswerDTOs);
  boolean checkIfAnswerIsCorrect(int answerId);
  Optional<Integer> updateAnswer(DetailedAnswerDTO detailedAnswerDTO);
}
