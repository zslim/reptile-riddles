package com.codecool.quizzzz.dto.task;

import java.util.List;

public record NewTaskDTO(String question, List<String> correctAnswers, List<String> incorrectAnswers) {
}
