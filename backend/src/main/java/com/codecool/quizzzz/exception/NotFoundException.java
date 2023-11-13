package com.codecool.quizzzz.exception;

public class NotFoundException extends RuntimeException {
  public NotFoundException(String message) {
    super(message);
  }

  public NotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public NotFoundException(String subject, long id) {
    super(String.format(subject + " not found with id: " + id));
  }
}
