package com.codecool.quizzzz.dto.task;

import java.time.LocalDateTime;

public record OutgoingQuestionDTO(String question, Long taskId, int taskIndex, int timeLimit,
                                  LocalDateTime modifiedAt) {
}
