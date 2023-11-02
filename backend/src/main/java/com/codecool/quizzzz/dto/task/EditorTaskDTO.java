package com.codecool.quizzzz.dto.task;

import com.codecool.quizzzz.dto.answer.EditorAnswerDTO;

import java.util.List;

public record EditorTaskDTO(Long taskId, int taskIndex, String question, List<EditorAnswerDTO> answers) {
}
