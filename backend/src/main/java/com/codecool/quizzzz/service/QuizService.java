package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.IncomingEditorQuizDTO;
import com.codecool.quizzzz.dto.quiz.OutgoingEditorQuizDTO;
import com.codecool.quizzzz.dto.task.BriefTaskDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizService {
  private final QuizRepository quizRepository;

  @Autowired
  public QuizService(QuizRepository quizRepository) {
    this.quizRepository = quizRepository;
  }

  public List<OutgoingEditorQuizDTO> getAll() {
    return quizRepository.findAll().stream().map(this::modelToDTO).toList();
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
    return quizRepository.save(new Quiz()).getId();
  }

  public Long update(Long quizId, IncomingEditorQuizDTO incomingEditorQuizDTO) {
    Quiz foundQuiz = quizRepository.findById(quizId)
                                   .orElseThrow(() -> new NotFoundException(String.format(
                                           "The quiz with id %d doesn't exist!",
                                           quizId)));
    foundQuiz.setTitle(incomingEditorQuizDTO.title());
    foundQuiz.setPublic(incomingEditorQuizDTO.isPublic());
    return quizRepository.save(foundQuiz).getId();
  }

  public void deleteById(Long quizId) {
    quizRepository.deleteById(quizId);
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
    return new BriefTaskDTO(task.getId(), task.getIndex(), task.getQuestion(), task.getModifiedAt());
  }
}
