package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.model.Answer;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public class MemoryAnswerDAO implements AnswerDAO {
  private static int nextAnswerId = 1;
  private final Set<Answer> answers;

  public MemoryAnswerDAO() {
    answers = new HashSet<>();
  }

  @Override
  public List<Answer> getAnswersOfTask(int taskId) {
    return answers.stream().filter(answer -> answer.taskId() == taskId).toList();
  }

  @Override
  public void addAnswerToTask(int taskId, NewAnswerDTO newAnswerDTO) {
    Answer newAnswer = new Answer(taskId, nextAnswerId++, newAnswerDTO.text(), newAnswerDTO.isCorrect());
    answers.add(newAnswer);
  }

  @Override
  public void addAnswersToTask(int taskId, List<NewAnswerDTO> newAnswerDTOs) {
    List<Answer> newAnswers = newAnswerDTOs.stream()
                                           .map(dto -> new Answer(taskId, nextAnswerId++, dto.text(), dto.isCorrect()))
                                           .toList();
    answers.addAll(newAnswers);
  }

  @Override
  public boolean checkIfAnswerIsCorrect(int answerId) {
    Optional<Answer> answer = answers.stream().filter(a -> a.answerId() == answerId).findFirst();
    return answer.map(Answer::isCorrect).orElse(false);
  }
}
