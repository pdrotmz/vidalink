package com.vidalink.services.storage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@Slf4j
public class LocalStorageService implements StorageService {

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public String saveFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Arquivo vazio");
            }

            Files.createDirectories(Paths.get(uploadPath));

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadPath, fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "/images/" + fileName; // Retorna o caminho que o frontend pode acessar
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar o arquivo", e);
        }
    }

    @Override
    public void deleteFile(String path) {
        try {
            Path filePath = Paths.get(uploadPath, path);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.error("Erro ao deletar arquivo: {}", path, e);
        }
    }
}

