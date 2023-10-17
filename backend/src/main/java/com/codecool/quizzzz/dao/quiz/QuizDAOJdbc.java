package com.codecool.quizzzz.dao.quiz;

import com.codecool.quizzzz.controller.dto.quiz.NewQuizDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class QuizDAOJdbc implements QuizDAO{
  private final List<QuizModel> quizzes = new ArrayList<>();
  private static int currentId = 0;
  @Override
  public List<QuizModel> getAllQuizzes() {
    return new ArrayList<>(quizzes);
  }
  
  @Override
  public Optional<QuizModel> getQuizById(int quizId) {
    return quizzes.stream().filter(quiz -> quiz.id() == quizId).findFirst();
  }
  
  @Override
  public int createQuiz(NewQuizDTO newQuizDTO) {
    quizzes.add(new QuizModel(++currentId, newQuizDTO.title()));
    return currentId;
  }
  
  @Override
  public QuizModel editQuiz(int quizId, String newName) {
    return null;
  }
  
  @Override
  public int deleteQuiz(int quizId) {
    Optional<QuizModel> toDelete = quizzes.stream().filter(quizModel -> quizModel.id() == quizId).findFirst();
    toDelete.ifPresent(quizzes::remove);
    return quizId;
  }
}
