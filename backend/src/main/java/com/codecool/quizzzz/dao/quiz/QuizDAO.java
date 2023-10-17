package com.codecool.quizzzz.dao.quiz;

import com.codecool.quizzzz.service.QuizService;

import java.util.List;
import java.util.Set;

public interface QuizDAO {
  List<QuizModel> getAllQuizzes();
  QuizModel getQuizById(int id);
  List<QuizModel> getQuizzesByName(String namePart);
}
