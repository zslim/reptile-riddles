package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.quiz.IncomingEditorQuizDTO;
import com.codecool.quizzzz.dto.quiz.OutgoingEditorQuizDTO;
import com.codecool.quizzzz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
  private final QuizService quizService;

  @Autowired
  public QuizController(QuizService quizService) {
    this.quizService = quizService;
  }

  @GetMapping("/all")
  ResponseEntity<List<OutgoingEditorQuizDTO>> getAllQuizzes() {
    return ResponseEntity.ok().body(quizService.getAll());
  }

  @GetMapping("/my")
  ResponseEntity<List<OutgoingEditorQuizDTO>> getMyQuizzes() {
    return ResponseEntity.ok().body(quizService.getAll());
  }

  @GetMapping("/{quizId}")
  ResponseEntity<OutgoingEditorQuizDTO> getQuizById(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(quizService.getById(quizId));
  }

  @GetMapping("/modified/{quizId}")
  ResponseEntity<LocalDateTime> getQuizLastModifiedAt(@PathVariable Long quizId) {
    return ResponseEntity.ok(quizService.getQuizLastModifiedAt(quizId));
  }

  @PostMapping("/create")
  ResponseEntity<Long> createQuiz() {
    Long id = quizService.create();
    return ResponseEntity.created(URI.create(String.format("/quiz/%d", id))).body(id);
  }

  @PatchMapping("/{quizId}")
  ResponseEntity<Long> updateQuiz(@PathVariable Long quizId, @RequestBody IncomingEditorQuizDTO incomingEditorQuizDTO) {
    return ResponseEntity.ok().body(quizService.update(quizId, incomingEditorQuizDTO));
  }

  @DeleteMapping("/{quizId}")
  ResponseEntity<Boolean> deleteQuiz(@PathVariable Long quizId) {
    quizService.deleteById(quizId);
    return ResponseEntity.ok().body(true);
  }
}
