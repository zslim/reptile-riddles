package com.codecool.quizzzz.service.dao.quiz;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.model.Quiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class MemoryQuizDAO implements QuizDAO {
  private static int currentId = 2;
  private final List<Quiz> quizzes = new ArrayList<>();

  @Override
  public List<Quiz> getAll() {
    return new ArrayList<>(quizzes);
  }

  @Override
  public Optional<Quiz> getById(int quizId) {
    return findById(quizId, quizzes);
  }

  @Override
  public int create(NewQuizDTO newQuizDTO) {
    quizzes.add(new Quiz(++currentId, newQuizDTO.title()));
    return currentId;
  }

  @Override
  public Quiz edit(int quizId, String newName) {
    return null;
  }

  @Override
  public Optional<Integer> deleteById(int quizId) {
    Optional<Quiz> toDelete = findById(quizId, quizzes);
    if (toDelete.isPresent()){
      quizzes.remove(toDelete.get());
      return Optional.of(quizId);
    }
    return Optional.empty();
  }

  private Optional<Quiz> findById(int quizId, List<Quiz> source) {
    return source.stream().filter(quiz -> quiz.id() == quizId).findFirst();
  }
}
