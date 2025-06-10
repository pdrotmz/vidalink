package com.vidalink.controller;

import com.vidalink.dto.profile.UserProfileMultipartDTO;
import com.vidalink.dto.user.UserResponseDTO;
import com.vidalink.model.user.User;
import com.vidalink.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateReward(
            @PathVariable UUID id,
            @RequestPart("user") @Valid UserProfileMultipartDTO updateDTO,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            User updatedUser = userService.editionProfile(id, updateDTO, profileImage);
            return ResponseEntity.ok(UserResponseDTO.from(updatedUser));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));

        } catch (RuntimeException e) {
            logger.error("Erro ao editar perfil do usuário {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));

        } catch (Exception e) {
            logger.error("Erro inesperado ao editar perfil do usuário {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Erro interno do servidor"));
        }
    }
}
