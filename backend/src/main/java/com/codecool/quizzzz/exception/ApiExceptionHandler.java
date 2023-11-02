package com.codecool.quizzzz.exception;

import com.codecool.quizzzz.service.filelogger.FileLogger;
import com.codecool.quizzzz.service.filelogger.FileLoggerImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {
  private final FileLogger logger = new FileLoggerImpl();
  @ExceptionHandler(value = {NotFoundException.class})
  public ResponseEntity<Object> handleNotFoundException(NotFoundException e) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    ApiException apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now(ZoneId.of("Z")));
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    e.printStackTrace(pw);
    String sStackTrace = sw.toString(); // stack trace as a string
    logger.logError(sStackTrace);
    return new ResponseEntity<>(apiException, status);
  }
}
