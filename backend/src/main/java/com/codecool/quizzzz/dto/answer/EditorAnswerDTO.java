package com.codecool.quizzzz.dto.answer;

import java.time.LocalDateTime;

public record EditorAnswerDTO(Long answerId, String text, boolean isCorrect, LocalDateTime modifiedAt) {
}
