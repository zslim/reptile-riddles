package com.codecool.quizzzz;

import com.codecool.quizzzz.service.repository.GameRepository;
import com.codecool.quizzzz.service.repository.MemoryGameRepository;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
  public static void main(String[] args) {
//
//    OpenAiService service = new OpenAiService(System.getenv("OPENAI_KEY"));
//    CompletionRequest completionRequest = CompletionRequest.builder()
//                                                           .prompt("Somebody once told me the world is gonna roll me")
//                                                           .model("babbage-002")
//                                                                   .echo(true)
//                                                                   .build();
//    service.createCompletion(completionRequest).getChoices().forEach(System.out::println);

    SpringApplication.run(BackendApplication.class, args);
  }

  @Bean
  GameRepository createGameRepository() {
    return new MemoryGameRepository();
  }
}
