package com.codecool.quizzzz.service.logger;

public interface Logger {
  void logError(String content);
  void logError(String content, String type);
  void logInfo(String content);
  void logInfo(String content, String type);
}
