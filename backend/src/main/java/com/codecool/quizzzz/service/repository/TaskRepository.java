package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  Optional<Task> findByQuizIdAndIndex(Long quizId, int index);
  List<Task> findAllByQuizId(Long quizId);
}
