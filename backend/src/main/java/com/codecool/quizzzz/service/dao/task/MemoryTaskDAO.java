package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.model.Task;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MemoryTaskDAO implements TaskDAO {
  private static int nextTaskId = 1;
  private final Set<Task> tasks;

  public MemoryTaskDAO() {
    tasks = new HashSet<>();
  }

  @Override
  public List<Task> getAllTasksByQuiz(int quizId) {
    return tasks.stream().filter(task -> task.quizId() == quizId).toList();
  }

  @Override
  public int createNewTask(int quizId, NewTaskDTO newTaskDTO) {
    int nextIndex = getAllTasksByQuiz(quizId).size();
    Task newTask = new Task(nextTaskId++, quizId, nextIndex, newTaskDTO.question());
    tasks.add(newTask);
    return newTask.taskIndex();
  }

  @Override
  public Task getTask(int quizId, int taskIndex) {
    return tasks.stream()
                .filter(task -> task.quizId() == quizId && task.taskIndex() == taskIndex)
                .findFirst()
                .orElse(null);
  }

  @Override
  public Task getTask(int taskId) {
    return tasks.stream().filter(task -> task.taskId() == taskId).findFirst().orElse(null);
  }

  @Override
  public boolean deleteTask(int quizId, int taskIndex) {
    Task taskToDelete = getTask(quizId, taskIndex);
    return tasks.remove(taskToDelete);
  }

  @Override
  public boolean deleteTask(int taskId) {
    Task taskToDelete = getTask(taskId);
    return tasks.remove(taskToDelete);
  }
}
