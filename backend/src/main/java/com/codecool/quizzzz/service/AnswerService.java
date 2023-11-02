package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.EditorAnswerDTO;
import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.model.Answer;
import com.codecool.quizzzz.model.Task;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import com.codecool.quizzzz.service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
  private final AnswerRepository answerRepository;
  private final TaskRepository taskRepository;

  @Autowired
  public AnswerService(AnswerRepository answerRepository, TaskRepository taskRepository) {
    this.answerRepository = answerRepository;
    this.taskRepository = taskRepository;
  }

  public Long create(Long taskId, EditorAnswerDTO editorAnswerDTO) {
    Task task = taskRepository.findById(taskId)
                              .orElseThrow(() -> new NotFoundException(String.format("There is no task with taskId %d",
                                                                                     taskId)));
    Answer newAnswer = new Answer();
    newAnswer.setText(editorAnswerDTO.text());
    newAnswer.setCorrect(editorAnswerDTO.isCorrect());
    newAnswer.setTask(task);
    return answerRepository.save(newAnswer).getId();
  }

  public Long update(EditorAnswerDTO editorAnswerDTO) {
    Answer answer = answerRepository.findById(editorAnswerDTO.answerId())
                                    .orElseThrow(() -> new NotFoundException(String.format(
                                            "There is no answer with answerId: %d",
                                            editorAnswerDTO.answerId())));
    answer.setText(editorAnswerDTO.text());
    answer.setCorrect(editorAnswerDTO.isCorrect());
    return answerRepository.save(answer).getId();
  }

  public boolean checkIfCorrect(Long answerId) {
    return answerRepository.findById(answerId)
                           .orElseThrow(() -> new NotFoundException(String.format("There is no answer with answerId: %d",
                                                                                  answerId)))
                           .isCorrect();
  }
}
