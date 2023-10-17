package com.codecool.quizzzz.dao.quiz;

import com.codecool.quizzzz.service.QuizService;

import java.util.List;
import java.util.Set;

public interface QuizDAO {
  List<QuizModel> getAllQuizzes();
  QuizModel getQuizById(int quizId);
  int createQuiz(String title);
  QuizModel editQuiz(int quizId, String newName);
  int deleteQuiz(int quizId);
}
