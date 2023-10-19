package com.codecool.quizzzz.service.dao;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.service.dao.task.AnswerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerService {
  private final AnswerDAO answerDAO;

  @Autowired
  public AnswerService(AnswerDAO answerDAO) {
    this.answerDAO = answerDAO;
  }

  public int updateAnswer(DetailedAnswerDTO detailedAnswerDTO) {
    Optional<Integer> id = answerDAO.updateAnswer(detailedAnswerDTO);
    if (id.isPresent()) {
      return id.get();
    }
    throw new NotFoundException(String.format("There is no answer with answerId: %d", detailedAnswerDTO.answerId()));
  }

  public boolean checkIfAnswerIsCorrect(int answerId) {
    return answerDAO.checkIfAnswerIsCorrect(answerId);
  }
}
