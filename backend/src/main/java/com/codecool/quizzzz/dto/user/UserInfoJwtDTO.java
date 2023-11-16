package com.codecool.quizzzz.dto.user;

import java.util.List;

public record UserInfoJwtDTO(String jwt, String username, List<String> roles) {
}
