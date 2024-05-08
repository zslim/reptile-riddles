package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.answer.EditorAnswerDTO;
import com.codecool.quizzzz.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {
  private final AnswerService answerService;

  public AnswerController(@Autowired AnswerService answerService) {
    this.answerService = answerService;
  }

  @PostMapping("/task/{taskId}")
  public ResponseEntity<LocalDateTime> createAnswer(@PathVariable Long taskId,
                                                    @RequestBody EditorAnswerDTO editorAnswerDTO) {
    LocalDateTime modifiedAt = answerService.create(taskId, editorAnswerDTO);
    return ResponseEntity.created(URI.create("/answer")).body(modifiedAt);
  }

  @PatchMapping("/update/{answerId}")
  public ResponseEntity<LocalDateTime> updateAnswer(@PathVariable Long answerId,
                                                    @RequestBody EditorAnswerDTO editorAnswerDTO) {
    return ResponseEntity.ok().body(answerService.update(answerId, editorAnswerDTO));
  }

  @DeleteMapping("/{answerId}")
  public ResponseEntity<Long> deleteAnswer(@PathVariable Long answerId) {
    answerService.delete(answerId);
    return ResponseEntity.ok(answerId);
  }

}
