package com.codecool.quizzzz.dto.task;

import com.codecool.quizzzz.dto.answer.GameAnswerDTO;

import java.util.List;

public record GameTaskDTO(String question, List<GameAnswerDTO> answers, int timeLimit) {
}
