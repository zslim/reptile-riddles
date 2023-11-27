package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.IncomingEditorQuizDTO;
import com.codecool.quizzzz.dto.quiz.OutgoingEditorQuizDTO;
import com.codecool.quizzzz.dto.task.BriefTaskDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.model.user.Credentials;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import com.codecool.quizzzz.service.repository.QuizRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizService {
  private static final int MIN_ANSWER_COUNT = 2;
  private static final int MAX_ANSWER_COUNT = 6;
  private final QuizRepository quizRepository;
  private final EntityManager entityManager;
  private final TaskRepository taskRepository;
  private final AnswerRepository answerRepository;
  private final AuthenticationService authenticationService;

  @Autowired
  public QuizService(QuizRepository quizRepository, EntityManager entityManager, TaskRepository taskRepository,
                     AnswerRepository answerRepository, AuthenticationService authenticationService) {
    this.quizRepository = quizRepository;
    this.entityManager = entityManager;
    this.taskRepository = taskRepository;
    this.answerRepository = answerRepository;
    this.authenticationService = authenticationService;
  }

  public List<OutgoingEditorQuizDTO> getPublic() {
    return quizRepository.findByIsPublicAndIsValid(true, true).stream().map(this::modelToDTO).toList();
  }

  private OutgoingEditorQuizDTO modelToDTO(Quiz quiz) {
    List<BriefTaskDTO> taskList = quiz.getTasks().stream().map(this::convertTaskModelToBriefTaskDTO).toList();
    return new OutgoingEditorQuizDTO(quiz.getId(),
                                     quiz.getTitle(),
                                     taskList,
                                     quiz.getCreatedAt(),
                                     quiz.getLastModifiedTimestamp());
  }

  private BriefTaskDTO convertTaskModelToBriefTaskDTO(Task task) {
    return new BriefTaskDTO(task.getId(), task.getIndex(), task.getQuestion());
  }

  public OutgoingEditorQuizDTO getById(Long quizId) {
    Quiz foundQuiz = quizRepository.findById(quizId)
                                   .orElseThrow(() -> new NotFoundException(String.format(
                                           "The quiz with id %d doesn't exist!",
                                           quizId)));
    return modelToDTO(foundQuiz);
  }

  public LocalDateTime getQuizLastModifiedAt(Long quizId) {
    return quizRepository.findById(quizId)
                         .orElseThrow(() -> new NotFoundException(String.format("The quiz with id %d doesn't exist!",
                                                                                quizId)))
                         .getLastModifiedTimestamp();
  }

  public Long create() {
    Quiz quiz = new Quiz();
    quiz.setCreator(authenticationService.getUser());
    return quizRepository.save(quiz).getId();
  }

  public Long update(Long quizId, IncomingEditorQuizDTO incomingEditorQuizDTO) {
    Quiz foundQuiz = quizRepository.findById(quizId)
                                   .orElseThrow(() -> new NotFoundException(String.format(
                                           "The quiz with id %d doesn't exist!",
                                           quizId)));
    foundQuiz.setTitle(incomingEditorQuizDTO.title());
    foundQuiz.setPublic(incomingEditorQuizDTO.isPublic());
    foundQuiz.setValid(isQuizValid(foundQuiz));
    foundQuiz.setPublic(incomingEditorQuizDTO.isPublic());
    return quizRepository.save(foundQuiz).getId();
  }

  private boolean isQuizValid(Quiz quiz) {
    if (isNotEmpty(quiz.getTitle())) {
      List<Task> tasks = quiz.getTasks();
      return !tasks.isEmpty() && tasks.stream().allMatch(this::isTaskValid);
    }
    return false;
  }

  private boolean isNotEmpty(String string) {
    return !string.trim().isEmpty();
  }

  private boolean isTaskValid(Task task) {
    if (isNotEmpty(task.getQuestion())) {
      List<Answer> answers = task.getAnswers();
      return isBetween(answers.size()) && isAnswerListValid(answers);
    }
    return false;
  }

  private boolean isBetween(int size) {
    return size >= MIN_ANSWER_COUNT && size <= MAX_ANSWER_COUNT;
  }

  private boolean isAnswerListValid(List<Answer> answers) {
    return answers.stream().anyMatch(Answer::isCorrect) && answers.stream().allMatch(this::isAnswerValid);
  }

  private boolean isAnswerValid(Answer answer) {
    return isNotEmpty(answer.getText());
  }

  public void deleteById(Long quizId) {
    quizRepository.deleteById(quizId);
  }

  public List<OutgoingEditorQuizDTO> getMy() {
    Credentials userCredentials = (Credentials) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return quizRepository.findByCreatorId(userCredentials.user_id()).stream().map(this::modelToDTO).toList();
  }

  public Long copy(Long quizId) {
    Quiz quiz = getQuiz(quizId);
    removeIdsFromQuiz(quiz);
    return quizRepository.save(quiz).getId();
  }

  private Quiz getQuiz(Long quizId) {
    Quiz quiz = quizRepository.findById(quizId)
                              .orElseThrow(() -> new NotFoundException(String.format(
                                      "The quiz with id %d doesn't exist!",
                                      quizId)));
    quiz.setTasks(getTasksByQuizId(quiz.getId()));
    return quiz;
  }

  private void removeIdsFromQuiz(Quiz quiz) {
    entityManager.detach(quiz);
    quiz.setId(null);
    quiz.setCreator(authenticationService.getUser());
    quiz.getTasks().forEach(task -> {
      task.setId(null);
      task.getAnswers().forEach(answer -> answer.setId(null));
    });
  }

  private List<Task> getTasksByQuizId(Long quizId) {
    List<Task> tasks = taskRepository.findAllByQuizId(quizId);
    for (Task task : tasks) {
      task.setAnswers(answerRepository.findAllByTaskId(task.getId()));
    }
    return tasks;
  }
}
