package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.dto.quiz.QuizDTO;
import com.codecool.quizzzz.model.Quiz;
import com.codecool.quizzzz.service.repository.QuizRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {
  private final QuizRepository quizRepository;
  private final TaskRepository taskRepository;

  @Autowired
  public QuizService(QuizRepository quizRepository, TaskRepository taskRepository) {
    this.quizRepository = quizRepository;
    this.taskRepository = taskRepository;
  }

  public List<QuizDTO> getAll() {
    return new ArrayList<>();
//    return quizRepository.getAll().stream().map(this::convertQuizModelToDTO).toList();
  }

  private QuizDTO convertQuizModelToDTO(Quiz quiz) {
    return null;
//    List<Integer> taskIdList = taskRepository.getAllTasksByQuiz(quiz.id()).stream().map(Task::taskId).toList();
//    return new QuizDTO(quiz.id(), quiz.title(), taskIdList);
  }

  public QuizDTO getById(int quizId) {
    return null;
//    Optional<Quiz> result = quizRepository.getById(quizId);
//    if (result.isEmpty()) {
//      throw new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId));
//    }
//    return convertQuizModelToDTO(result.get());
  }

  public Long create(NewQuizDTO newQuizDTO) {
    Quiz newQuiz = new Quiz();
    newQuiz.setTitle(newQuizDTO.title());
    return quizRepository.save(newQuiz).getId();
  }

  public int create() {
    return 0;
//    return quizRepository.create(new NewQuizDTO(""));
  }

  public int rename(NewQuizDTO newQuizDTO, int quizId) {
    return 0;
//    Optional<Integer> id = quizRepository.rename(newQuizDTO, quizId);
//    return id.orElseThrow(() -> new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId)));
  }

  public int deleteById(int quizId) {
    return 0;
//    Optional<Integer> optionalId = quizRepository.deleteById(quizId);
//    // TODO: delete tasks and answers as well
//    if (optionalId.isPresent()) {
//      return optionalId.get();
//    }
//    throw new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId));
  }
}
