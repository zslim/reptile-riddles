package com.codecool.quizzzz.service;

import com.codecool.quizzzz.controller.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.controller.dto.quiz.QuizDTO;
import com.codecool.quizzzz.dao.quiz.QuizDAO;
import com.codecool.quizzzz.dao.quiz.QuizModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
  private final QuizDAO quizDAO;
  
  @Autowired
  public QuizService(QuizDAO quizDAO) {
    this.quizDAO = quizDAO;
  }
  
  public List<QuizDTO> getAllQuizzes(){
    return quizDAO.getAllQuizzes().stream().map(e -> new QuizDTO(e.id(), e.title())).toList();
  }
  
  public QuizDTO getQuizById(int quizId){
    Optional<QuizModel> result = quizDAO.getQuizById(quizId);
    if (result.isEmpty()) throw new RuntimeException(String.format("The quiz with id %d doesn't exist!", quizId));
    return new QuizDTO(result.get().id(), result.get().title());
  }
  
  public int createQuiz(NewQuizDTO newQuizDTO){
    return quizDAO.createQuiz(newQuizDTO);
  }

  public int deleteQuiz(int quizId){
    return quizDAO.deleteQuiz(quizId);
  }
}
