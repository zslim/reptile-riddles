package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import com.codecool.quizzzz.dto.quiz.GameQuizDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.user.NewPlayerDTO;
import com.codecool.quizzzz.dto.user.PlayerDTO;
import com.codecool.quizzzz.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {
  private final GameService gameService;

  @Autowired
  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  @GetMapping("/create/{quizId}")
  ResponseEntity<GameQuizDTO> getQuizById(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(gameService.createGame(quizId));
  }

  @PostMapping("/join/{gameId}")
  ResponseEntity<Long> joinToGame(@PathVariable Long gameId, @RequestBody NewPlayerDTO newPlayerDTO) {
    return ResponseEntity.ok().body(gameService.joinToGame(gameId, newPlayerDTO));
  }

  @GetMapping("/nextTask/{gameId}")
  ResponseEntity<GameTaskDTO> getNextTask(@PathVariable Long gameId) {
    return ResponseEntity.ok().body(gameService.getNextTaskFromGame(gameId));
  }

  @PostMapping("/submit/{gameId}/{playerId}")
  public ResponseEntity<Boolean> handleAnswerSubmit(@PathVariable Long gameId, @PathVariable Long playerId,
                                                    @RequestBody GameAnswerDTO answer) {
    System.out.println(answer.answerId());
    return ResponseEntity.ok().body(gameService.handleAnswerSubmit(gameId, playerId, answer.answerId()));
  }

  @GetMapping("/result/{gameId}")
  public ResponseEntity<List<PlayerDTO>> getResult(@PathVariable Long gameId) {
    return ResponseEntity.ok().body(gameService.getResult(gameId));
  }
}
