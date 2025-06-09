package com.vidalink.services;

import com.vidalink.dto.profile.UserProfileMultipartDTO;
import com.vidalink.model.user.User;
import com.vidalink.repository.UserRepository;
import com.vidalink.services.storage.LocalStorageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocalStorageService storageService;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Erro ao procurar donor"));
    }

    @Transactional
    public User updateLabelById(UUID id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setEmail(user.getEmail());
            User updatedUser = userRepository.save(existingUser);
            return updatedUser;
        }).orElseThrow(() -> new EntityNotFoundException("User não encontrada!"));
    }

    @Transactional
    public User editionProfile(UUID id, UserProfileMultipartDTO dto, MultipartFile profileImage) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));

        updateFields(user, dto, profileImage);
        return userRepository.save(user);
    }

    private void updateFields(User user, UserProfileMultipartDTO dto, MultipartFile image) throws IOException {
        Optional.ofNullable(dto.username())
                .filter(username -> !username.isBlank())
                .ifPresent(user::setUsername);

        Optional.ofNullable(dto.email())
                .filter(email -> !email.isBlank())
                .ifPresent(user::setEmail);

        if (image != null && !image.isEmpty()) {
            String filename = storageService.saveFile(image);
            user.setProfileImage("/uploads/" + filename);
        }
    }

    public void deleteUserById(UUID id) {
        userRepository.deleteById(id);
    }
}