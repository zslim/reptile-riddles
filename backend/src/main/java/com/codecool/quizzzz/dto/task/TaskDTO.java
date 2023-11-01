package com.codecool.quizzzz.dto.task;

import com.codecool.quizzzz.dto.answer.AnswerDTO;

import java.util.List;

public record TaskDTO(int taskId, int quizId, int taskIndex, String question, List<AnswerDTO> answers) {
}
