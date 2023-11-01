package com.codecool.quizzzz.dto.task;

import com.codecool.quizzzz.dto.answer.DetailedAnswerDTO;

import java.util.List;

public record DetailedTaskDTO(int taskId, int quizId, int taskIndex, String question,
                              List<DetailedAnswerDTO> answers) {
}
