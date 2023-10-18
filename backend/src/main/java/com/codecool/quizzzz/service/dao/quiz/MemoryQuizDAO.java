package com.codecool.quizzzz.service.dao.quiz;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class MemoryQuizDAO implements QuizDAO {
  private static int currentId = 0;
  private final List<QuizModel> quizzes = new ArrayList<>();

  @Override
  public List<QuizModel> getAll() {
    return new ArrayList<>(quizzes);
  }

  @Override
  public Optional<QuizModel> getById(int quizId) {
    return findById(quizId, quizzes);
  }

  @Override
  public int create(NewQuizDTO newQuizDTO) {
    quizzes.add(new QuizModel(++currentId, newQuizDTO.title()));
    return currentId;
  }

  @Override
  public QuizModel edit(int quizId, String newName) {
    return null;
  }

  @Override
  public int deleteById(int quizId) {
    Optional<QuizModel> toDelete = findById(quizId, quizzes);
    toDelete.ifPresent(quizzes::remove);
    return quizId;
  }

  private Optional<QuizModel> findById(int quizId, List<QuizModel> source) {
    return source.stream().filter(quizModel -> quizModel.id() == quizId).findFirst();
  }
}
