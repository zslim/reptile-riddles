package com.codecool.quizzzz.dto.quiz;

import java.util.List;

public record QuizDTO(int id, String title, List<Integer> taskIdList) {
}
