package com.vidalink.services;

import com.vidalink.dto.profile.UserProfileMultipartDTO;
import com.vidalink.model.user.User;
import com.vidalink.repository.UserRepository;
import com.vidalink.services.storage.LocalStorageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public User editionProfile(UUID id, UserProfileMultipartDTO dto, MultipartFile profileImage) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));

            updateFields(user, dto, profileImage);
            return userRepository.save(user);

        } catch (EntityNotFoundException e) {
            throw e;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar imagem do perfil: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erro interno ao editar perfil: " + e.getMessage(), e);
        }
    }

    public Resource loadProfileImage(UUID id) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        String filename = user.getProfileImage();
        if (filename == null || filename.isBlank()) {
            throw new FileNotFoundException("Imagem de perfil não encontrada");
        }

        // Caminho da imagem salva
        Path imagePath = Paths.get("uploads/profile-images", filename);

        if (!Files.exists(imagePath)) {
            throw new FileNotFoundException("Imagem não encontrada no sistema de arquivos");
        }

        return new FileSystemResource(imagePath);
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
            user.setProfileImage(filename);
        }
    }

    public void deleteUserById(UUID id) {
        userRepository.deleteById(id);
    }
}