package com.vidalink.controller;

import com.vidalink.dto.profile.UserProfileMultipartDTO;
import com.vidalink.dto.user.UserResponseDTO;
import com.vidalink.model.user.User;
import com.vidalink.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/admin/users")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        Optional<User> user = Optional.ofNullable(userService.findById(id));
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping(value = "/{id}/edit-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResponseDTO> updateUserProfile(
            @PathVariable UUID id,
            @RequestPart("user") @Valid UserProfileMultipartDTO updateDTO,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage
    ) throws IOException {
        User updatedUser = userService.editionProfile(id, updateDTO, profileImage);
        return ResponseEntity.ok(UserResponseDTO.from(updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
}