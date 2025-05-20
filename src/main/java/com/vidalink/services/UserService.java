package com.vidalink.services;

import com.vidalink.model.user.User;
import com.vidalink.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(UUID id) {
        if(userRepository.findById(id).isEmpty()) {
            throw new IllegalArgumentException("Erro ao achar o user!");
        }
        return userRepository.findById(id);
    }

    @Transactional
    public User updateLabelById(UUID id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setEmail(user.getEmail());
            User updatedUser = userRepository.save(existingUser);
            return updatedUser;
        }).orElseThrow(() -> new EntityNotFoundException("User não encontrada!"));
    }

    public void deleteUserById(UUID id) {
        userRepository.deleteById(id);
    }
}