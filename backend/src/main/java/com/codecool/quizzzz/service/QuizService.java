package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.dto.quiz.QuizDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
  private final QuizRepository quizRepository;

  @Autowired
  public QuizService(QuizRepository quizRepository) {
    this.quizRepository = quizRepository;
  }

  public List<QuizDTO> getAll() {
    return quizRepository.findAll().stream().map(this::convertQuizModelToDTO).toList();
  }

  private QuizDTO convertQuizModelToDTO(Quiz quiz) {
    List<Long> taskIdList = quiz.getTasks().stream().map(Task::getId).toList();
    return new QuizDTO(quiz.getId(), quiz.getTitle(), taskIdList);
  }

  public QuizDTO getById(Long quizId) {
    Optional<Quiz> result = quizRepository.findById(quizId);
    if (result.isEmpty()) {
      throw new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId));
    }
    return convertQuizModelToDTO(result.get());
  }

  public Long create(NewQuizDTO newQuizDTO) {
    Quiz newQuiz = new Quiz();
    newQuiz.setTitle(newQuizDTO.title());
    return quizRepository.save(newQuiz).getId();
  }

  public Long create() {
    return quizRepository.save(new Quiz()).getId();
  }

  public Long rename(NewQuizDTO newQuizDTO, Long quizId) {
    Quiz toRename = quizRepository.findById(quizId)
                                  .orElseThrow(() -> new NotFoundException(String.format(
                                          "The quiz with id %d doesn't exist!",
                                          quizId)));
    toRename.setTitle(newQuizDTO.title());
    return quizRepository.save(toRename).getId();
  }

  public Long deleteById(Long quizId) {
    // TODO: delete tasks and answers as well
    quizRepository.deleteById(quizId);
    // TODO: figure out what this return value needs to be
    return 0L;
  }
}
