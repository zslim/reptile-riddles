package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.game.GameListDTO;
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
@RequestMapping("/api/game")
public class GameController {
  private final GameService gameService;

  @Autowired
  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  @PatchMapping("/submit/{gameId}")
  public ResponseEntity<Boolean> handleAnswerSubmit(@PathVariable Long gameId, @RequestParam Long answer,
                                                    @RequestParam String username) {
    return ResponseEntity.ok().body(gameService.handleAnswerSubmit(gameId, answer, username));
  }

  @GetMapping("/result/{gameId}")
  public ResponseEntity<List<PlayerDTO>> getResult(@PathVariable Long gameId) {
    return ResponseEntity.ok().body(gameService.getResult(gameId));
  }

  @GetMapping("/create/{quizId}")
  ResponseEntity<GameQuizDTO> getQuizById(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(gameService.createGame(quizId));
  }

  @PostMapping("/join/{gameId}")
  ResponseEntity<Boolean> joinToGame(@PathVariable Long gameId, @RequestBody NewPlayerDTO newPlayerDTO) {
    return ResponseEntity.ok().body(gameService.joinToGame(gameId, newPlayerDTO));
  }

  @GetMapping("/nextTask/{gameId}")
  ResponseEntity<GameTaskDTO> getNextTask(@PathVariable Long gameId) {
    return ResponseEntity.ok().body(gameService.getNextTaskFromGame(gameId));
  }

  @GetMapping("/list")
  public ResponseEntity<List<GameListDTO>> getGameList() {
    return ResponseEntity.ok().body(gameService.getGameList());
  }

  @GetMapping("/quiz/{gameId}")
  public ResponseEntity<GameQuizDTO> getQuiz(@PathVariable Long gameId) {
    return ResponseEntity.ok().body(gameService.getQuizByGameId(gameId));
  }
}
