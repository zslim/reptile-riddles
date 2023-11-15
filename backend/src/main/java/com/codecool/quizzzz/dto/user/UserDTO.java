package com.codecool.quizzzz.dto.user;

import com.codecool.quizzzz.model.user.RoleEnum;

import java.util.Set;

public record UserDTO(long id, String username, String email, Set<RoleEnum> roles) {
}
