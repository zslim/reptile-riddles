package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.model.Answer;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MemoryAnswerDAO implements AnswerDAO {
  private static int nextAnswerId = 5;
  private final Set<Answer> answers;

  public MemoryAnswerDAO() {
    answers = new HashSet<>(List.of(new Answer(1, 1, "Nothing", false),
                                    new Answer(1, 2, "I don't know", false),
                                    new Answer(1, 3, "Something", true),
                                    new Answer(1, 4, "Haha", false),
                                    new Answer(2, 5, "Nothing", false),
                                    new Answer(2, 6, "I don't know", false),
                                    new Answer(2, 7, "Something", true),
                                    new Answer(2, 8, "Haha", false)));
  }

  @Override
  public List<Answer> getAnswersOfTask(int taskId) {
    return answers.stream()
                  .filter(answer -> answer.taskId() == taskId)
                  .sorted(Comparator.comparing(Answer::answerId))
                  .toList();
  }

  @Override
  public int addAnswerToTask(int taskId, NewAnswerDTO newAnswerDTO) {
    Answer newAnswer = new Answer(taskId, nextAnswerId++, newAnswerDTO.text(), newAnswerDTO.isCorrect());
    answers.add(newAnswer);
    return newAnswer.answerId();
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

  @Override
  public Optional<Integer> updateAnswer(DetailedAnswerDTO detailedAnswerDTO) {
    Optional<Answer> answerToUpdate = answers.stream()
                                             .filter(answer -> answer.answerId() == detailedAnswerDTO.answerId())
                                             .findFirst();
    if (answerToUpdate.isEmpty()) {
      return Optional.empty();
    }
    answers.remove(answerToUpdate.get());
    answers.add(new Answer(answerToUpdate.get().taskId(),
                           detailedAnswerDTO.answerId(),
                           detailedAnswerDTO.text(),
                           detailedAnswerDTO.isCorrect()));
    return Optional.of(detailedAnswerDTO.answerId());
  }

}
