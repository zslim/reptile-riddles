package com.codecool.quizzzz.dao.quiz;

import com.codecool.quizzzz.controller.dto.quiz.NewQuizDTO;

import java.util.List;
import java.util.Optional;

public interface QuizDAO {
  List<QuizModel> getAll();
  Optional<QuizModel> getById(int quizId);
  int create(NewQuizDTO newQuizDTO);
  QuizModel edit(int quizId, String newName);
  int deleteById(int quizId);
}