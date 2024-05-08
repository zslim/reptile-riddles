package com.codecool.quizzzz.dto.quiz;
import java.util.UUID;

public record GameQuizDTO(Long gameId, UUID generatedId, String title, int taskCount, int playerCount) {
}