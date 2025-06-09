package com.vidalink.controller;

import com.vidalink.dto.profile.UserProfileMultipartDTO;
import com.vidalink.dto.user.UserResponseDTO;
import com.vidalink.model.user.User;
import com.vidalink.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User createdUser = userService.registerUser(user);
        return ResponseEntity.status(201).body(createdUser);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMyProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponseDTO.from(user));

    }

    @PutMapping("/me/email")
    public ResponseEntity<UserResponseDTO> updateMyEmail(
            @AuthenticationPrincipal User loggedUser,
            @RequestBody @Valid User updatedUser
    ) {
        try {
            User updated = userService.updateLabelById(loggedUser.getId(), updatedUser);
            return ResponseEntity.ok(UserResponseDTO.from(updated));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/{id}/edit-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUserProfile(
            @PathVariable UUID id,
            @RequestPart("user") @Valid UserProfileMultipartDTO updateDTO,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            User updatedUser = userService.editionProfile(id, updateDTO, profileImage);
            return ResponseEntity.ok(UserResponseDTO.from(updatedUser));
        } catch (Exception e) {
            e.printStackTrace(); // ou logger.error("Erro ao editar perfil", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
