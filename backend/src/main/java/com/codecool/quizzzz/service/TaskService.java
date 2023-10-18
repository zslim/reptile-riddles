package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.AnswerDTO;
import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.dto.task.TaskDTO;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.dao.task.AnswerDAO;
import com.codecool.quizzzz.service.dao.task.TaskDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
  private final TaskDAO taskDAO;
  private final AnswerDAO answerDAO;

  public TaskService(@Autowired TaskDAO taskDAO, @Autowired AnswerDAO answerDAO) {
    this.taskDAO = taskDAO;
    this.answerDAO = answerDAO;
  }

  public List<TaskDTO> getAllTasksByQuiz(int quizId) {
    return taskDAO.getAllTasksByQuiz(quizId).stream().map(this::convertTaskModelToDTO).toList();
  }

  public int createNewTask(int quizId, NewTaskDTO newTaskDTO) {
    return taskDAO.createNewTask(quizId, newTaskDTO);
  }

  public TaskDTO getTask(int quizId, int taskIndex) {
    return convertTaskModelToDTO(taskDAO.getTask(quizId, taskIndex));
  }

  public TaskDTO getTask(int taskId) {
    return convertTaskModelToDTO(taskDAO.getTask(taskId));
  }

  public boolean deleteTask(int taskId) {
    return taskDAO.deleteTask(taskId);
  }

  public boolean checkIfAnswerIsCorrect(int answerId) {
    return answerDAO.checkIfAnswerIsCorrect(answerId);
  }

  private AnswerDTO convertAnswerModelToDTO(Answer answer) {
    return new AnswerDTO(answer.answerId(), answer.text());
  }

  private List<AnswerDTO> convertAnswerListToDTOList(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDTO).toList();
  }

  private TaskDTO convertTaskModelToDTO(Task task) {
    return new TaskDTO(task.taskId(),
                       task.quizId(),
                       task.taskIndex(),
                       task.question(),
                       convertAnswerListToDTOList(answerDAO.getAnswersOfTask(task.taskId())));
  }
}
