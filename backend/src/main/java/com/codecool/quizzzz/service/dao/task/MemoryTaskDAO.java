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
  private static int nextTaskId = 7;
  private final Set<Task> tasks;

  public MemoryTaskDAO() {
    tasks = new HashSet<>(Set.of(new Task(1, 1, 0, "What's up?"),
                                 new Task(2, 1, 1, "New question, same answers!"),
                                 new Task(3, 3, 0, "What is the capital of Thailand?"),
                                 new Task(4, 3, 1, "What is the capital of the American State of California?"),
                                 new Task(5, 3, 2, "How many stars are on the Australian flag?"),
                                 new Task(6, 3, 3, "How many countries share land border with Italy?")));
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
    return nextTaskId - 1;
  }

  @Override
  public Optional<Task> updateTask(int taskId, String question) {
    Optional<Task> taskToUpdate = tasks.stream().filter(task -> task.taskId() == taskId).findFirst();
    if (taskToUpdate.isEmpty()) {
      return Optional.empty();
    }
    tasks.remove(taskToUpdate.get());
    Task newTask = new Task(taskId, taskToUpdate.get().quizId(), taskToUpdate.get().taskIndex(), question);
    tasks.add(newTask);
    return Optional.of(newTask);
  }

  @Override
  public Optional<Task> getTask(int quizId, int taskIndex) {
    return tasks.stream().filter(task -> task.quizId() == quizId && task.taskIndex() == taskIndex).findFirst();
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
