package com.codecool.quizzzz.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
  // private final Logger logger;
  private final Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

  //@Autowired
  // public ApiExceptionHandler(Logger logger) {
  //  this.logger = logger;
  //}

  @ExceptionHandler(value = {NotFoundException.class})
  public ResponseEntity<Object> handleNotFoundException(NotFoundException e) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    ApiException apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now(ZoneId.of("Z")));
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    e.printStackTrace(pw);
    String sStackTrace = sw.toString();
    // logger.logError(sStackTrace);
    logger.error(sStackTrace);
    return new ResponseEntity<>(apiException, status);
  }
}
