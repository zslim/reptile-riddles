package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.controller.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.controller.dto.quiz.QuizDTO;
import com.codecool.quizzzz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {
  private final QuizService quizService;

  @Autowired
  public QuizController(QuizService quizService) {
    this.quizService = quizService;
  }

  @GetMapping("/all")
  List<QuizDTO> getAllQuiz() {
    return quizService.getAll();
  }

  @GetMapping("/{quizId}")
  QuizDTO getQuizById(@PathVariable int quizId) {
    return quizService.getById(quizId);
  }

  @PostMapping("/create")
  int createQuiz(@RequestBody NewQuizDTO newQuizDTO) {
    return quizService.create(newQuizDTO);
  }

  @DeleteMapping("/{quizId}")
  int deleteQuiz(@PathVariable int quizId) {
    return quizService.deleteById(quizId);
  }
}
