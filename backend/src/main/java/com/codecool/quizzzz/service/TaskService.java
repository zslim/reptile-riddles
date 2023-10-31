package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.AnswerDTO;
import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.task.DetailedTaskDTO;
import com.codecool.quizzzz.dto.task.NewTaskDTO;
import com.codecool.quizzzz.dto.task.QuestionDTO;
import com.codecool.quizzzz.dto.task.TaskDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TaskService {
  private final TaskRepository taskRepository;
  private final AnswerRepository answerRepository;
  private final QuizRepository quizRepository;

  @Autowired
  public TaskService(TaskRepository taskRepository, AnswerRepository answerRepository, QuizRepository quizRepository) {
    this.taskRepository = taskRepository;
    this.answerRepository = answerRepository;
    this.quizRepository = quizRepository;
  }

  public List<TaskDTO> getAllByQuiz(Long quizId) {
    return taskRepository.findAllByQuizId(quizId)
                         .stream()
                         .map(this::convertTaskModelToDTO)
                         .sorted(Comparator.comparing(TaskDTO::taskIndex))
                         .toList();
  }

  private TaskDTO convertTaskModelToDTO(Task task) {
    return new TaskDTO(task.getId(),
                       task.getQuiz().getId(),
                       task.getIndex(),
                       task.getQuestion(),
                       convertAnswerListToAnswerDTOList(answerRepository.findAllByTaskId(task.getId())));
  }

  private List<AnswerDTO> convertAnswerListToAnswerDTOList(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDTO).toList();
  }

  private AnswerDTO convertAnswerModelToDTO(Answer answer) {
    return new AnswerDTO(answer.getId(), answer.getText());
  }

  public List<DetailedTaskDTO> getAllDetailedByQuiz(Long quizId) {
    return taskRepository.findAllByQuizId(quizId)
                         .stream()
                         .map(this::convertTaskModelToDetailedDTO)
                         .sorted(Comparator.comparing(DetailedTaskDTO::taskIndex))
                         .toList();
  }

  private DetailedTaskDTO convertTaskModelToDetailedDTO(Task task) {
    return new DetailedTaskDTO(task.getId(),
                               task.getQuiz().getId(),
                               task.getIndex(),
                               task.getQuestion(),
                               convertAnswerListToDetailedAnswerDTO(answerRepository.findAllByTaskId(task.getId())));
  }

  private List<DetailedAnswerDTO> convertAnswerListToDetailedAnswerDTO(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDetailedAnswerDTO).toList();
  }

  private DetailedAnswerDTO convertAnswerModelToDetailedAnswerDTO(Answer answer) {
    return new DetailedAnswerDTO(answer.getId(), answer.getText(), answer.isCorrect());
  }

  public Long create(Long quizId, NewTaskDTO newTaskDTO) {
    Task newTask = new Task();
    newTask.setQuestion(newTaskDTO.question());

    List<Answer> newAnswerList = newTaskDTO.answers().stream().map(newAnswerDTO -> {
      Answer newAnswer = new Answer();
      newAnswer.setText(newAnswerDTO.text());
      newAnswer.setCorrect(newAnswerDTO.isCorrect());
      return newAnswer;
    }).toList();
    newTask.setAnswers(newAnswerList);
    answerRepository.saveAll(newAnswerList);

    addTaskToQuizById(quizId, newTask);
    return taskRepository.save(newTask).getId();
  }

  public Long create(Long quizId) {
    Task newTask = new Task();
    addTaskToQuizById(quizId, newTask);
    return taskRepository.save(newTask).getId();
  }

  private void addTaskToQuizById(Long quizId, Task newTask) {
    Quiz quiz = quizRepository.findById(quizId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no quiz with quizId %d",
                                                                                     quizId)));
    quiz.getTasks().add(newTask);
  }

  public Long update(Long taskId, QuestionDTO questionDTO) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    task.setQuestion(questionDTO.question());
    return taskRepository.save(task).getId();
  }

  public TaskDTO getTask(Long quizId, int taskIndex) {
    Task task = taskRepository.findByQuizIdAndIndex(quizId, taskIndex)
                              .orElseThrow(() -> new NotFoundException(String.format(
                                      "There is no task with quizId %d and taskindex %d",
                                      quizId,
                                      taskIndex)));
    return convertTaskModelToDTO(task);
  }

  public TaskDTO getTask(Long taskId) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    return convertTaskModelToDTO(task);
  }

  public boolean deleteTask(Long taskId) {
    // TODO: delete answers as well
    taskRepository.deleteById(taskId);
    // TODO: figure out what this return value is for
    return true;
  }
}
