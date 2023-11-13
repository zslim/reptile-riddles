package com.codecool.quizzzz.dto.quiz;

import com.codecool.quizzzz.dto.task.BriefTaskDTO;

import java.time.LocalDateTime;
import java.util.List;

public record OutgoingEditorQuizDTO(Long id, String title, List<BriefTaskDTO> taskList, LocalDateTime createdAt,
                                    LocalDateTime modifiedAt) {
}
