package com.codecool.quizzzz.dao.quiz;

import com.codecool.quizzzz.controller.dto.quiz.NewQuizDTO;

import java.util.List;
import java.util.Optional;

public interface QuizDAO {
  List<QuizModel> getAllQuizzes();
  Optional<QuizModel> getQuizById(int quizId);
  int createQuiz(NewQuizDTO newQuizDTO);
  QuizModel editQuiz(int quizId, String newName);
  int deleteQuiz(int quizId);
}
