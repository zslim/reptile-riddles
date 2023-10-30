package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/answer")
public class AnswerController {
  private final AnswerService answerService;

  public AnswerController(@Autowired AnswerService answerService) {
    this.answerService = answerService;
  }

  @PostMapping("/task/{taskId}")
  public ResponseEntity<Long> createAnswer(@PathVariable Long taskId, @RequestBody NewAnswerDTO newAnswerDTO) {
    Long answerId = answerService.create(taskId, newAnswerDTO);
    return ResponseEntity.created(URI.create("/answer/" + answerId)).body(answerId);
  }

  @PostMapping("/task/{taskId}/empty")
  public ResponseEntity<Long> createAnswer(@PathVariable Long taskId) {
    Long answerId = answerService.create(taskId);
    return ResponseEntity.created(URI.create("/answer/" + answerId)).body(answerId);
  }

  @PutMapping("/update")
  public ResponseEntity<Long> updateAnswer(@RequestBody DetailedAnswerDTO detailedAnswerDTO) {
    return ResponseEntity.ok().body(answerService.update(detailedAnswerDTO));
  }

  @GetMapping("/validate/{answerId}")
  public ResponseEntity<Boolean> checkIfAnswerIsCorrect(@PathVariable Long answerId) {
    return ResponseEntity.ok().body(answerService.checkIfCorrect(answerId));
  }

  @GetMapping("/{answerId}")
  public ResponseEntity<DetailedAnswerDTO> getAnswer(@PathVariable Long answerId) {
    return ResponseEntity.ok().body(answerService.getById(answerId));
  }
}
