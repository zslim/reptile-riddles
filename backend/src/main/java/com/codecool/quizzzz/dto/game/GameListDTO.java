package com.codecool.quizzzz.dto.game;
import java.util.UUID;

public record GameListDTO(Long gameId, UUID generatedId, int playerCount, String quizTitle) {
}
