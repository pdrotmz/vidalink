package com.vidalink.controllers;

import com.vidalink.models.Usuario;
import com.vidalink.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/create")
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario user) {
        Usuario newUser = service.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> users = service.findAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("search-by/id/{id}")
    public ResponseEntity<Usuario> findUserById(@PathVariable String id) {
        Optional<Usuario> userId = service.findUserById(id);
        return userId.map(
                ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!"));
    }

    @PutMapping("update-by/id/{id}")
    public ResponseEntity<Usuario> updateUserById(@RequestBody Usuario user, @PathVariable String id) {
        Usuario updatedUser = service.updateUserById(user, id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }

    @DeleteMapping("delete-by/id/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable String id) {
        service.deleteUserById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}