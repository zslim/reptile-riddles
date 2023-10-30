package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;
import com.codecool.quizzzz.dto.answer.NewAnswerDTO;
import com.codecool.quizzzz.service.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
  private final AnswerRepository answerRepository;

  @Autowired
  public AnswerService(AnswerRepository answerRepository) {
    this.answerRepository = answerRepository;
  }

  public int create(int taskId, NewAnswerDTO newAnswerDTO) {
    return 0;
    //return answerRepository.addAnswerToTask(taskId, newAnswerDTO);
  }

  public int create(int taskId) {
    return 0;
    // return answerRepository.addAnswerToTask(taskId, new NewAnswerDTO("", false));
  }

  public int update(DetailedAnswerDTO detailedAnswerDTO) {
    return 0;
//    Optional<Integer> id = answerRepository.updateAnswer(detailedAnswerDTO);
//    if (id.isPresent()) {
//      return id.get();
//    }
//    throw new NotFoundException(String.format("There is no answer with answerId: %d", detailedAnswerDTO.answerId()));
  }

  public boolean checkIfCorrect(int answerId) {
    return false;
    //  return answerRepository.checkIfAnswerIsCorrect(answerId);
  }

  public DetailedAnswerDTO getById(int answerId) {
    return null;
//    Optional<Answer> answer = answerRepository.getAnswer(answerId);
//    if (answer.isEmpty()) {
//      throw new NotFoundException(String.format("There is no answer with answerId: %d", answerId));
//    }
//    return new DetailedAnswerDTO(answer.get().answerId(), answer.get().text(), answer.get().isCorrect());
  }
}
