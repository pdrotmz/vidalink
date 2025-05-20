package com.vidalink.controller;

import com.vidalink.model.user.User;
import com.vidalink.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @GetMapping
    public ResponseEntity<User> getMyProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    // Atualizar e-mail do próprio usuário
    @PutMapping
    public ResponseEntity<User> updateMyEmail(@AuthenticationPrincipal User loggedUser,
                                              @RequestBody @Valid User updatedUser) {
        try {
            User updated = userService.updateLabelById(loggedUser.getId(), updatedUser);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}