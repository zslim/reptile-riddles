package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
  List<Answer> findAllByTaskId(Long taskId);
}
