package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.AnswerDTO;
import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.task.DetailedTaskDTO;
import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.dto.task.TaskDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.dao.task.AnswerDAO;
import com.codecool.quizzzz.service.dao.task.TaskDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
  private final TaskDAO taskDAO;
  private final AnswerDAO answerDAO;

  public TaskService(@Autowired TaskDAO taskDAO, @Autowired AnswerDAO answerDAO) {
    this.taskDAO = taskDAO;
    this.answerDAO = answerDAO;
  }

  public List<TaskDTO> getAllByQuiz(int quizId) {
    return taskDAO.getAllTasksByQuiz(quizId).stream().map(this::convertTaskModelToDTO).toList();
  }

  private TaskDTO convertTaskModelToDTO(Task task) {
    return new TaskDTO(task.taskId(),
                       task.quizId(),
                       task.taskIndex(),
                       task.question(),
                       convertAnswerListToAnswerDTOList(answerDAO.getAnswersOfTask(task.taskId())));
  }

  private List<AnswerDTO> convertAnswerListToAnswerDTOList(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDTO).toList();
  }

  private AnswerDTO convertAnswerModelToDTO(Answer answer) {
    return new AnswerDTO(answer.answerId(), answer.text());
  }

  public List<DetailedTaskDTO> getAllDetailedByQuiz(int quizId) {
    return taskDAO.getAllTasksByQuiz(quizId).stream().map(this::convertTaskModelToDetailedDTO).toList();
  }

  private DetailedTaskDTO convertTaskModelToDetailedDTO(Task task) {
    return new DetailedTaskDTO(task.taskId(),
                               task.quizId(),
                               task.taskIndex(),
                               task.question(),
                               convertAnswerListToDetailedAnswerDTO(answerDAO.getAnswersOfTask(task.taskId())));
  }

  private List<DetailedAnswerDTO> convertAnswerListToDetailedAnswerDTO(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDetailedAnswerDTO).toList();
  }

  private DetailedAnswerDTO convertAnswerModelToDetailedAnswerDTO(Answer answer) {
    return new DetailedAnswerDTO(answer.answerId(), answer.text(), answer.isCorrect());
  }

  public int create(int quizId, NewTaskDTO newTaskDTO) {
    int taskId = taskDAO.createNewTask(quizId, newTaskDTO);
    answerDAO.addAnswersToTask(taskId, newTaskDTO.answers());
    return taskId;
  }

  public int updateAnswer(DetailedAnswerDTO detailedAnswerDTO) {
    Optional<Integer> id = answerDAO.updateAnswer(detailedAnswerDTO);
    if (id.isPresent()) {
      return id.get();
    }
    throw new NotFoundException(String.format("There is no answer with answerId: %d", detailedAnswerDTO.answerId()));
  }

  public TaskDTO getTask(int quizId, int taskIndex) {
    Optional<Task> task = taskDAO.getTask(quizId, taskIndex);
    if (task.isPresent()) {
      return convertTaskModelToDTO(task.get());
    }
    throw new NotFoundException(String.format("There is no task with quizId %d and taskIndex %d", quizId, taskIndex));
  }

  public TaskDTO getTask(int taskId) {
    Optional<Task> task = taskDAO.getTask(taskId);
    if (task.isPresent()) {
      return convertTaskModelToDTO(task.get());
    }
    throw new NotFoundException(String.format("There is no task with id %d.", taskId));
  }

  public boolean deleteTask(int taskId) {
    return taskDAO.deleteTask(taskId);
  }

  public boolean checkIfAnswerIsCorrect(int answerId) {
    return answerDAO.checkIfAnswerIsCorrect(answerId);
  }
}
