package com.vidalink.dto.auth;

import com.vidalink.model.user.UserRole;

public record RegisterDTO(String username, String email, String password, UserRole role) {
}
