package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.dto.quiz.QuizDTO;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.service.dao.quiz.QuizDAO;
import com.codecool.quizzzz.service.dao.quiz.QuizModel;
import com.codecool.quizzzz.service.dao.task.TaskDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
  private final QuizDAO quizDAO;
  private final TaskDAO taskDAO;

  @Autowired
  public QuizService(QuizDAO quizDAO, TaskDAO taskDAO) {
    this.quizDAO = quizDAO;
    this.taskDAO = taskDAO;
  }

  public List<QuizDTO> getAll() {
    return quizDAO.getAll().stream().map(this::convertQuizModelToDTO).toList();
  }

  public QuizDTO getById(int quizId) {
    Optional<QuizModel> result = quizDAO.getById(quizId);
    if (result.isEmpty()) {
      throw new RuntimeException(String.format("The quiz with id %d doesn't exist!", quizId));
    }
    return convertQuizModelToDTO(result.get());
  }

  public int create(NewQuizDTO newQuizDTO) {
    return quizDAO.create(newQuizDTO);
  }

  public int deleteById(int quizId){
    Optional<Integer> optionalId = quizDAO.deleteById(quizId);
    if (optionalId.isPresent()) return optionalId.get();
    throw new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId));
  }

  private QuizDTO convertQuizModelToDTO(QuizModel quizModel) {
    List<Integer> taskIdList = taskDAO.getAllTasksByQuiz(quizModel.id()).stream().map(Task::taskId).toList();
    return new QuizDTO(quizModel.id(), quizModel.title(), taskIdList);
  }
}