package com.codecool.quizzzz.dto.quiz;

import java.util.Set;

public record IncomingEditorQuizDTO(String title, boolean isPublic, Set<String> categories) {
}
