package com.codecool.quizzzz;

import com.codecool.quizzzz.service.dao.quiz.MemoryQuizDAO;
import com.codecool.quizzzz.service.dao.quiz.QuizDAO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }

  @Bean
  public QuizDAO quizDAO() {
    return new MemoryQuizDAO();
  }

}
