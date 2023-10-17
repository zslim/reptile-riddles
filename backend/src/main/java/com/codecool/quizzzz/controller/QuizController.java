package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("quiz")
public class QuizController {
  private final QuizService quizService;
  
  @Autowired
  public QuizController(QuizService quizService) {
    this.quizService = quizService;
  }
}
