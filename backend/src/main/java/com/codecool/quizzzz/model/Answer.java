package com.codecool.quizzzz.model;

public record Answer(int taskId, int answerId, String text, boolean isCorrect) {
}
