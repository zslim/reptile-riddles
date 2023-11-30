package com.codecool.quizzzz.service.logger;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

//@Service
public class FileLogger implements Logger {
  private final String FILE_PATH = System.getenv("LOG_PATH");

  @Override
  public void logError(String content) {
    log(content, "ERROR");
  }

  private void log(String content, String type) {
    try {
      PrintWriter writer = new PrintWriter(new FileWriter(FILE_PATH, true));
      writer.println(String.format("[%s]: [%s] \n%s\n", LocalDateTime.now(), type, content));
      writer.close();
    }
    catch (IOException e) {
      System.out.println(e);
    }
  }

  @Override
  public void logError(String content, String type) {
    log(content, "ERROR: " + type);
  }

  @Override
  public void logInfo(String content) {
    log(content, "INFO");
  }

  @Override
  public void logInfo(String content, String type) {
    log(content, "INFO: " + type);
  }
}
