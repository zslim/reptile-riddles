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

import java.util.ArrayList;
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
    return new ArrayList<>();
//    return taskRepository.getAllTasksByQuiz(quizId)
//                         .stream()
//                         .map(this::convertTaskModelToDTO)
//                         .sorted(Comparator.comparing(TaskDTO::taskIndex))
//                         .toList();
  }

  private TaskDTO convertTaskModelToDTO(Task task) {
    return null;
//    return new TaskDTO(task.taskId(),
//                       task.quizId(),
//                       task.taskIndex(),
//                       task.question(),
//                       convertAnswerListToAnswerDTOList(answerRepository.getAnswersOfTask(task.taskId())));
  }

  private List<AnswerDTO> convertAnswerListToAnswerDTOList(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDTO).toList();
  }

  private AnswerDTO convertAnswerModelToDTO(Answer answer) {
    return null;
//    return new AnswerDTO(answer.answerId(), answer.text());
  }

  public List<DetailedTaskDTO> getAllDetailedByQuiz(int quizId) {
    return new ArrayList<>();
//    return taskRepository.getAllTasksByQuiz(quizId)
//                         .stream()
//                         .map(this::convertTaskModelToDetailedDTO)
//                         .sorted(Comparator.comparing(DetailedTaskDTO::taskIndex))
//                         .toList();
  }

  private DetailedTaskDTO convertTaskModelToDetailedDTO(Task task) {
    return null;
//    return new DetailedTaskDTO(task.taskId(),
//                               task.quizId(),
//                               task.taskIndex(),
//                               task.question(),
//                               convertAnswerListToDetailedAnswerDTO(answerRepository.getAnswersOfTask(task.taskId())));
  }

  private List<DetailedAnswerDTO> convertAnswerListToDetailedAnswerDTO(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDetailedAnswerDTO).toList();
  }

  private DetailedAnswerDTO convertAnswerModelToDetailedAnswerDTO(Answer answer) {
    return null;
//    return new DetailedAnswerDTO(answer.answerId(), answer.text(), answer.isCorrect());
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

  public int update(int taskId, QuestionDTO questionDTO) {
    return 0;
//    Optional<Task> task = taskRepository.updateTask(taskId, questionDTO.question());
//    return task.map(Task::taskId)
//               .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d", taskId)));
  }

  public TaskDTO getTask(int quizId, int taskIndex) {
    return null;
//    Optional<Task> task = taskRepository.getTask(quizId, taskIndex);
//    if (task.isPresent()) {
//      return convertTaskModelToDTO(task.get());
//    }
//    throw new NotFoundException(String.format("There is no task with quizId %d and taskIndex %d", quizId, taskIndex));
  }

  public TaskDTO getTask(int taskId) {
    return null;
//    Optional<Task> task = taskRepository.getTask(taskId);
//    if (task.isPresent()) {
//      return convertTaskModelToDTO(task.get());
//    }
//    throw new NotFoundException(String.format("There is no task with id %d.", taskId));
  }

  public boolean deleteTask(int taskId) {
    return false;
//    return taskRepository.deleteTask(taskId);
//    // TODO: delete answers as well
  }
}
