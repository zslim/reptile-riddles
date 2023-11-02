package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.EditorQuizDTO;
import com.codecool.quizzzz.dto.quiz.QuizDTO;
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

  public List<QuizDTO> getAll() {
    return quizRepository.findAll().stream().map(this::modelToDTO).toList();
  }

  public QuizDTO getById(Long quizId) {
    Quiz foundQuiz = quizRepository.findById(quizId)
                                   .orElseThrow(() -> new NotFoundException(String.format(
                                           "The quiz with id %d doesn't exist!",
                                           quizId)));
    return modelToDTO(foundQuiz);
  }

  public LocalDateTime getQuizLastModified(Long quizId) {
    return quizRepository.findById(quizId)
                         .orElseThrow(() -> new NotFoundException(String.format("The quiz with id %d doesn't exist!",
                                                                                quizId)))
                         .getModifiedAt();
  }

  public Long create() {
    return quizRepository.save(new Quiz()).getId();
  }

  public Long update(Long quizId, EditorQuizDTO editorQuizDTO) {
    Quiz foundQuiz = quizRepository.findById(quizId)
                                   .orElseThrow(() -> new NotFoundException(String.format(
                                           "The quiz with id %d doesn't exist!",
                                           quizId)));
    foundQuiz.setTitle(editorQuizDTO.title());
    foundQuiz.setPublic(editorQuizDTO.isPublic());
    return quizRepository.save(foundQuiz).getId();
  }

  public void deleteById(Long quizId) {
    quizRepository.deleteById(quizId);
  }

  private QuizDTO modelToDTO(Quiz quiz) {
    List<Long> taskIdList = quiz.getTasks().stream().map(Task::getId).toList();
    return new QuizDTO(quiz.getId(), quiz.getTitle(), taskIdList, quiz.getCreatedAt(), quiz.getModifiedAt());
  }
}
