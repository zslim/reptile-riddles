package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.task.BriefTaskDTO;
import com.codecool.quizzzz.dto.task.EditorTaskDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
  private final TaskService taskService;

  public TaskController(@Autowired TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping("/quiz/{quizId}/{taskIndex}")
  public ResponseEntity<GameTaskDTO> getTask(@PathVariable Long quizId, @PathVariable int taskIndex) {
    return ResponseEntity.ok().body(taskService.getTask(quizId, taskIndex));
  }

  @GetMapping("/{taskId}")
  public ResponseEntity<EditorTaskDTO> getTask(@PathVariable Long taskId) {
    return ResponseEntity.ok().body(taskService.getTaskToEdit(taskId));
  }

  @GetMapping("/quiz/detailed/{quizId}")
  public ResponseEntity<List<EditorTaskDTO>> getAllDetailedTasksByQuiz(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(taskService.getAllDetailedByQuiz(quizId));
  }

  @GetMapping("/quiz/brief/{quizId}")
  public ResponseEntity<List<BriefTaskDTO>> getAllBriefTasksByQuiz(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(taskService.getAllBriefByQuiz(quizId));
  }

  @GetMapping("/quiz/{quizId}")
  public ResponseEntity<List<GameTaskDTO>> getAllTasksByQuiz(@PathVariable Long quizId) {
    return ResponseEntity.ok().body(taskService.getAllByQuiz(quizId));
  }

  @PostMapping("/quiz/{quizId}")
  public ResponseEntity<Long> createNewTask(@PathVariable Long quizId, @RequestBody EditorTaskDTO editorTaskDTO) {
    return ResponseEntity.ok().body(taskService.create(quizId, editorTaskDTO));
  }

  @PatchMapping("/{taskId}")
  public ResponseEntity<Long> updateTask(@PathVariable Long taskId, @RequestBody EditorTaskDTO editorTaskDTO) {
    return ResponseEntity.ok().body(taskService.update(taskId, editorTaskDTO));
  }

  @DeleteMapping("/{taskId}")
  public ResponseEntity<Boolean> deleteTask(@PathVariable Long taskId) {
    return ResponseEntity.ok().body(taskService.deleteTask(taskId));
  }
}
