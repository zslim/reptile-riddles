package com.codecool.quizzzz.service.dao.task;

import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.model.Task;

import java.util.List;

public interface TaskDAO {
  List<Task> getAllTasksByQuiz(int quizId);
  int createNewTask(int quizId, NewTaskDTO newTaskDTO);
  Task getTask(int quizId, int taskIndex);
  Task getTask(int taskId);
  boolean deleteTask(int quizId, int taskIndex);
  boolean deleteTask(int taskId);
}
