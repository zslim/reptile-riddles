package com.codecool.quizzzz.dto.task;

import com.codecool.quizzzz.dto.answer.NewAnswerDTO;

import java.util.List;

public record NewTaskDTO(String question, List<NewAnswerDTO> answers) {
}
