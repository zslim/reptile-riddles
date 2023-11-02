package com.codecool.quizzzz.service.filelogger;

import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

@Service
public class FileLoggerImpl implements FileLogger {
  private final String FILE_PATH = System.getenv("LOG_PATH");
  @Override
  public void logError(String content) {
    log(content, "ERROR");
  }

  @Override
  public void logInfo(String content) {
    log(content, "INFO");
  }

  private void log(String content, String type){
    try {
      PrintWriter writer = new PrintWriter(new FileWriter(FILE_PATH, true));
      writer.println(String.format("[%s]: [%s] \n" + content + "\n", LocalDateTime.now(), type));
      writer.close();
    } catch (IOException e) {
      System.out.println(e);
    }
  }
}
