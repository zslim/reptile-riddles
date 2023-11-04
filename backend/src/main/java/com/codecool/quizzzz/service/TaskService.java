package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.EditorAnswerDTO;
import com.codecool.quizzzz.dto.answer.GameAnswerDTO;
import com.codecool.quizzzz.dto.task.BriefTaskDTO;
import com.codecool.quizzzz.dto.task.EditorTaskDTO;
import com.codecool.quizzzz.dto.task.GameTaskDTO;
import com.codecool.quizzzz.dto.task.QuestionDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import jakarta.transaction.Transactional;
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

  public List<GameTaskDTO> getAllByQuiz(Long quizId) {
    return taskRepository.findAllByQuizId(quizId)
                         .stream()
                         .map(this::modelToGameDTO)
                         .sorted(Comparator.comparing(GameTaskDTO::taskIndex))
                         .toList();
  }

  public List<EditorTaskDTO> getAllDetailedByQuiz(Long quizId) {
    return taskRepository.findAllByQuizId(quizId)
                         .stream()
                         .map(this::modelToEditorDTO)
                         .sorted(Comparator.comparing(EditorTaskDTO::taskIndex))
                         .toList();
  }

  public List<BriefTaskDTO> getAllBriefByQuiz(Long quizId) {
    return taskRepository.findAllByQuizId(quizId)
                         .stream()
                         .map(this::modelToBriefDTO)
                         .sorted(Comparator.comparing(BriefTaskDTO::taskIndex))
                         .toList();
  }

  @Transactional
  public Long create(Long quizId, EditorTaskDTO editorTaskDTO) {
    Quiz quiz = quizRepository.findById(quizId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no quiz with quizId %d",
                                                                                     quizId)));
    Task newTask = new Task();
    updateTaskFromDTO(newTask, editorTaskDTO);
    quiz.addTask(newTask);
    quizRepository.save(quiz);
    return newTask.getId();
  }

  @Transactional
  public Long update(Long taskId, EditorTaskDTO editorTaskDTO) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    updateTaskFromDTO(task, editorTaskDTO);
    return taskRepository.save(task).getId();
  }

  public GameTaskDTO getTask(Long quizId, int taskIndex) {
    Task task = taskRepository.findByQuizIdAndIndex(quizId, taskIndex)
                              .orElseThrow(() -> new NotFoundException(String.format(
                                      "There is no task with quizId %d and taskindex %d",
                                      quizId,
                                      taskIndex)));
    return modelToGameDTO(task);
  }

  public GameTaskDTO getTask(Long taskId) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    return modelToGameDTO(task);
  }

  public EditorTaskDTO getTaskToEdit(Long taskId) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    return modelToEditorDTO(task);
  }

  public boolean deleteTask(Long taskId) {
    taskRepository.deleteById(taskId);
    return true;
  }

  private GameTaskDTO modelToGameDTO(Task task) {
    return new GameTaskDTO(task.getId(),
                           task.getQuiz().getId(),
                           task.getIndex(),
                           task.getQuestion(),
                           convertAnswerListToAnswerDTOList(answerRepository.findAllByTaskId(task.getId())));
  }

  private EditorTaskDTO modelToEditorDTO(Task task) {
    return new EditorTaskDTO(task.getId(),
                             task.getIndex(),
                             task.getQuestion(),
                             convertAnswerListToDetailedAnswerDTO(answerRepository.findAllByTaskId(task.getId())),
                             task.getModifiedAt());
  }

  private BriefTaskDTO modelToBriefDTO(Task task) {
    return new BriefTaskDTO(task.getId(), task.getIndex(), task.getQuestion(), task.getModifiedAt());
  }

  private List<GameAnswerDTO> convertAnswerListToAnswerDTOList(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDTO).toList();
  }

  private GameAnswerDTO convertAnswerModelToDTO(Answer answer) {
    return new GameAnswerDTO(answer.getId(), answer.getText());
  }

  private List<EditorAnswerDTO> convertAnswerListToDetailedAnswerDTO(List<Answer> answerList) {
    return answerList.stream().map(this::convertAnswerModelToDetailedAnswerDTO).toList();
  }

  private EditorAnswerDTO convertAnswerModelToDetailedAnswerDTO(Answer answer) {
    return new EditorAnswerDTO(answer.getId(), answer.getText(), answer.isCorrect(), answer.getModifiedAt());
  }

  private void updateTaskFromDTO(Task task, EditorTaskDTO editorTaskDTO) {
    task.setQuestion(editorTaskDTO.question());
    task.setIndex(editorTaskDTO.taskIndex());
    task.deleteAllAnswers();
    for (EditorAnswerDTO editorAnswerDTO : editorTaskDTO.answers()) {
      Answer newAnswer = new Answer();
      newAnswer.setText(editorAnswerDTO.text());
      newAnswer.setCorrect(editorAnswerDTO.isCorrect());
      task.addAnswer(newAnswer);
    }
  }

  public BriefTaskDTO createQuestion(Long quizId, QuestionDTO questionDTO) {
    Task newTask = new Task();
    Quiz quiz = quizRepository.findById(quizId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no quiz with quizId %d",
                                                                                     quizId)));
    newTask.setQuiz(quiz);
    newTask.setQuestion(questionDTO.question());
    newTask.setIndex(questionDTO.taskIndex());
    Long id = taskRepository.save(newTask).getId();
    Task savedTask = taskRepository.findById(id).get();
    return new BriefTaskDTO(savedTask.getId(),
                            savedTask.getIndex(),
                            savedTask.getQuestion(),
                            savedTask.getModifiedAt());
  }

  public BriefTaskDTO updateQuestion(Long taskId, QuestionDTO questionDTO) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    task.setQuestion(questionDTO.question());
    task.setIndex(questionDTO.taskIndex());
    Long id = taskRepository.save(task).getId();
    Task updatedTask = taskRepository.findById(id).get();
    return new BriefTaskDTO(updatedTask.getId(),
                            updatedTask.getIndex(),
                            updatedTask.getQuestion(),
                            updatedTask.getModifiedAt());
  }
}
