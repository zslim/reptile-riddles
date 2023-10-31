package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnswerService {
  private final AnswerRepository answerRepository;
  private final TaskRepository taskRepository;

  @Autowired
  public AnswerService(AnswerRepository answerRepository, TaskRepository taskRepository) {
    this.answerRepository = answerRepository;
    this.taskRepository = taskRepository;
  }

  public Long create(Long taskId, NewAnswerDTO newAnswerDTO) {
    Answer newAnswer = new Answer();
    newAnswer.setText(newAnswerDTO.text());
    newAnswer.setCorrect(newAnswerDTO.isCorrect());
    Answer savedAnswer = answerRepository.save(newAnswer);
    Optional<Task> taskOptional = taskRepository.findById(taskId);
    if (taskOptional.isPresent()) {
      return saveAnswer(taskOptional.get(), savedAnswer);
    }
    throw new NotFoundException("\"There is no task with taskId: " + taskId);
  }

  public Long create(Long taskId) {
    Answer newAnswer = new Answer();
    newAnswer.setText("");
    newAnswer.setCorrect(false);
    Answer savedAnswer = answerRepository.save(newAnswer);
    Optional<Task> taskOptional = taskRepository.findById(taskId);

    if (taskOptional.isPresent()) {
      return saveAnswer(taskOptional.get(), savedAnswer);
    }
    throw new NotFoundException("\"There is no task with taskId: " + taskId);
  }

  public Long update(DetailedAnswerDTO detailedAnswerDTO) {
    Optional<Answer> answerOptional = answerRepository.findById(detailedAnswerDTO.answerId());
    if (answerOptional.isPresent()) {
      Answer answer = answerOptional.get();
      answer.setText(detailedAnswerDTO.text());
      answer.setCorrect(detailedAnswerDTO.isCorrect());
      Answer savedAnswer = answerRepository.save(answer);
      return savedAnswer.getId();
    }
    throw new NotFoundException(String.format("There is no answer with answerId: %d", detailedAnswerDTO.answerId()));
  }

  public boolean checkIfCorrect(Long answerId) {
    Optional<Answer> answerOptional = answerRepository.findById(answerId);
    if (answerOptional.isPresent()) {
      return answerOptional.get().isCorrect();
    }
    throw new NotFoundException(String.format("There is no answer with answerId: " + answerId));
  }

  public DetailedAnswerDTO getById(Long answerId) {
    Optional<Answer> answerOptional = answerRepository.findById(answerId);
    if (answerOptional.isPresent()) {
      Answer answer = answerOptional.get();
      return new DetailedAnswerDTO(answer.getId(), answer.getText(), answer.isCorrect());
    }
    throw new NotFoundException(String.format("There is no answer with answerId: " + answerId));
  }

  private Long saveAnswer(Task task, Answer savedAnswer) {
    List<Answer> answerList = task.getAnswers();
    answerList.add(savedAnswer);
    task.setAnswers(answerList);
    taskRepository.save(task);
    return savedAnswer.getId();
  }
}
