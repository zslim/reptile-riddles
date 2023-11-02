package com.codecool.quizzzz.dto.quiz;

import java.time.LocalDateTime;
import java.util.List;

public record QuizDTO(Long id, String title, List<Long> taskIdList, LocalDateTime createdAt, LocalDateTime modifiedAt) {
}
