package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.task.DetailedTaskDTO;
import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.dto.task.QuestionDTO;
import com.codecool.quizzzz.dto.task.TaskDTO;
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

  @GetMapping("/quiz/detailed/{quizId}")
  public ResponseEntity<List<DetailedTaskDTO>> getAllDetailedTasksByQuiz(@PathVariable int quizId) {
    return ResponseEntity.ok().body(taskService.getAllDetailedByQuiz(quizId));
  }

  @GetMapping("/quiz/{quizId}")
  public ResponseEntity<List<TaskDTO>> getAllTasksByQuiz(@PathVariable int quizId) {
    return ResponseEntity.ok().body(taskService.getAllByQuiz(quizId));
  }

  @PostMapping("/quiz/{quizId}")
  public ResponseEntity<Integer> createNewTask(@PathVariable int quizId, @RequestBody NewTaskDTO newTaskDTO) {
    return ResponseEntity.ok().body(taskService.create(quizId, newTaskDTO));
  }

  @PostMapping("/quiz/{quizId}/empty")
  public ResponseEntity<Integer> createNewTask(@PathVariable int quizId) {
    return ResponseEntity.ok().body(taskService.create(quizId));
  }

  @PatchMapping("/{taskId}")
  public ResponseEntity<Integer> updateTask(@PathVariable int taskId, @RequestBody QuestionDTO questionDTO) {
    return ResponseEntity.ok().body(taskService.update(taskId, questionDTO));
  }

  @GetMapping("/quiz/{quizId}/{taskIndex}")
  public ResponseEntity<TaskDTO> getTask(@PathVariable int quizId, @PathVariable int taskIndex) {
    return ResponseEntity.ok().body(taskService.getTask(quizId, taskIndex));
  }

  @GetMapping("/{taskId}")
  public ResponseEntity<TaskDTO> getTask(@PathVariable int taskId) {
    return ResponseEntity.ok().body(taskService.getTask(taskId));
  }

  @DeleteMapping("/{taskId}")
  public ResponseEntity<Boolean> deleteTask(@PathVariable int taskId) {
    return ResponseEntity.ok().body(taskService.deleteTask(taskId));
  }
}
