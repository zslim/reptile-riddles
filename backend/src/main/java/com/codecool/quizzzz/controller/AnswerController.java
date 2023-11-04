package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.answer.EditorAnswerDTO;
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
  public ResponseEntity<Long> createAnswer(@PathVariable Long taskId, @RequestBody EditorAnswerDTO editorAnswerDTO) {
    Long answerId = answerService.create(taskId, editorAnswerDTO);
    return ResponseEntity.created(URI.create("/answer/" + answerId)).body(answerId);
  }

  @PatchMapping("/update/{answerId}")
  public ResponseEntity<Long> updateAnswer(@PathVariable Long answerId, @RequestBody EditorAnswerDTO editorAnswerDTO) {
    return ResponseEntity.ok().body(answerService.update(answerId, editorAnswerDTO));
  }

  @DeleteMapping("/{answerId}")
  public ResponseEntity<Long> deleteAnswer(@PathVariable Long answerId) {
    answerService.delete(answerId);
    return ResponseEntity.ok(answerId);
  }

  @GetMapping("/validate/{answerId}")
  public ResponseEntity<Boolean> checkIfAnswerIsCorrect(@PathVariable Long answerId) {
    return ResponseEntity.ok().body(answerService.checkIfCorrect(answerId));
  }
}
