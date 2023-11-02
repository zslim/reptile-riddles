package com.codecool.quizzzz.dto.task;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;

import java.util.List;

public record GameTaskDTO(Long taskId, Long quizId, int taskIndex, String questionText, List<GameAnswerDTO> answers) {
}
