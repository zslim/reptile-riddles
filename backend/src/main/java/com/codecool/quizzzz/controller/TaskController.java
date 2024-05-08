package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.task.BriefTaskDTO;
import com.codecool.quizzzz.dto.task.EditorTaskDTO;
import com.codecool.quizzzz.dto.task.IncomingQuestionDTO;
import com.codecool.quizzzz.dto.task.OutgoingQuestionDTO;
import com.codecool.quizzzz.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {
  private final TaskService taskService;

  public TaskController(@Autowired TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping("/{taskId}")
  public ResponseEntity<EditorTaskDTO> getTask(@PathVariable Long taskId) {
    return ResponseEntity.ok().body(taskService.getTaskToEdit(taskId));
  }

  @GetMapping("/quiz/brief/{quizId}")
  public ResponseEntity<List<BriefTaskDTO>> getAllBriefTasksByQuiz(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(taskService.getAllBriefByQuiz(quizId));
  }

  @PostMapping("/question/{quizId}")
  public ResponseEntity<OutgoingQuestionDTO> createNewQuestion(@PathVariable Long quizId,
                                                               @RequestBody IncomingQuestionDTO questionDTO) {
    return ResponseEntity.ok().body(taskService.createQuestion(quizId, questionDTO));
  }

  @PatchMapping("/question/{taskId}")
  public ResponseEntity<OutgoingQuestionDTO> updateQuestion(@PathVariable Long taskId,
                                                            @RequestBody IncomingQuestionDTO questionDTO) {
    return ResponseEntity.ok().body(taskService.updateQuestion(taskId, questionDTO));
  }

  @DeleteMapping("/{taskId}")
  public ResponseEntity<Boolean> deleteTask(@PathVariable Long taskId) {
    return ResponseEntity.ok().body(taskService.deleteTask(taskId));
  }
}
