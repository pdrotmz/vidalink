package com.vidalink.dto.auth;


import com.vidalink.model.user.UserRole;

public record RegisterRequest(String name, String email, String password, UserRole role) {
}
