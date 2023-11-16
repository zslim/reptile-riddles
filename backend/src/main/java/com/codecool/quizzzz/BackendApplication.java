package com.codecool.quizzzz;

import com.codecool.quizzzz.service.repository.GameRepository;
import com.codecool.quizzzz.service.repository.MemoryGameRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }

  @Bean
  GameRepository createGameRepository() {
    return new MemoryGameRepository();
  }
}
