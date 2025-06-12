package com.vidalink.dto.user;

import com.vidalink.model.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserResponseDTO {
    private UUID id;
    private String username;
    private String email;
    private String profileImage;

    public static UserResponseDTO from(User user) {
        String imageUrl = user.getProfileImage() != null
                ? "https://vidalink.onrender.com/api/users/" + user.getId() + "/profile-image"
                : null;

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .profileImage(imageUrl)
                .build();
    }
}
