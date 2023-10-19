package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/answer")
public class AnswerController {
  private final TaskService taskService;

  public AnswerController(@Autowired TaskService taskService) {
    this.taskService = taskService;
  }

  @PutMapping("/")
  public ResponseEntity<Integer> updateTaskAnswers(@RequestBody DetailedAnswerDTO detailedAnswerDTO) {
    return ResponseEntity.ok().body(taskService.updateAnswer(detailedAnswerDTO));
  }

  @GetMapping("/{answerId}")
  public ResponseEntity<Boolean> checkIfAnswerIsCorrect(@PathVariable int answerId) {
    return ResponseEntity.ok().body(taskService.checkIfAnswerIsCorrect(answerId));
  }
}
