package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.dto.task.TaskDTO;
import com.codecool.quizzzz.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
  private final TaskService taskService;

  public TaskController(@Autowired TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping("/quiz/{quizId}")
  public List<TaskDTO> getAllTasksByQuiz(@PathVariable int quizId) {
    return taskService.getAllByQuiz(quizId);
  }

  @PostMapping("/quiz/{quizId}")
  public int createNewTask(@PathVariable int quizId, @RequestBody NewTaskDTO newTaskDTO) {
    return taskService.create(quizId, newTaskDTO);
  }

  @GetMapping("/quiz/{quizId}/{taskIndex}")
  public TaskDTO getTask(@PathVariable int quizId, @PathVariable int taskIndex) {
    return taskService.getTask(quizId, taskIndex);
  }

  @GetMapping("/{taskId}")
  public TaskDTO getTask(@PathVariable int taskId) {
    return taskService.getTask(taskId);
  }

  @DeleteMapping("/{taskId}")
  public boolean deleteTask(@PathVariable int taskId) {
    return taskService.deleteTask(taskId);
  }

  @GetMapping("answer/{answerId}")
  public boolean checkIfAnswerIsCorrect(@PathVariable int answerId) {
    return taskService.checkIfAnswerIsCorrect(answerId);
  }
}
