package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.model.Task;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
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
  public Optional<Task> getTask(int quizId, int taskIndex) {
    return tasks.stream()
                .filter(task -> task.quizId() == quizId && task.taskIndex() == taskIndex)
                .findFirst();
  }

  @Override
  public Optional<Task> getTask(int taskId) {
    return tasks.stream().filter(task -> task.taskId() == taskId).findFirst();
  }

  @Override
  public boolean deleteTask(int quizId, int taskIndex) {
    Optional<Task> taskToDelete = getTask(quizId, taskIndex);
    return taskToDelete.filter(tasks::remove).isPresent();
  }

  @Override
  public boolean deleteTask(int taskId) {
    Optional<Task> taskToDelete = getTask(taskId);
    return taskToDelete.filter(tasks::remove).isPresent();
  }
}