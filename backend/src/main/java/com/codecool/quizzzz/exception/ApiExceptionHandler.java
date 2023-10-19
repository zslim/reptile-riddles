package com.codecool.quizzzz.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(value = {NotFoundException.class})
  public ResponseEntity<Object> handleNotFoundException(NotFoundException e) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    ApiException apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now(ZoneId.of("Z")));
    return new ResponseEntity<>(apiException, status);
  }
}
