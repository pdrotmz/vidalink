package com.vidalink.controller;

import com.vidalink.model.user.User;
import com.vidalink.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private UserService donorService;

    @GetMapping
    public List<User> getAll() {
        return donorService.findAll();
    }

    @PostMapping
    public User create(@RequestBody User donor) {
        return donorService.registerUser(donor);
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable UUID id) {
        return donorService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        donorService.deleteUserById(id);
    }
}