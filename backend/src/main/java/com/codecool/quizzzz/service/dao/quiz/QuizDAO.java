package com.codecool.quizzzz.service.dao.quiz;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.model.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizDAO {
  List<Quiz> getAll();
  Optional<Quiz> getById(int quizId);
  int create(NewQuizDTO newQuizDTO);
  Quiz edit(int quizId, String newName);
  Optional<Integer> deleteById(int quizId);
}
