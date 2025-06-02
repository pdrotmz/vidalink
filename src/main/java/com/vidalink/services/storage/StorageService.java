package com.vidalink.services.storage;


import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String saveFile(MultipartFile file);
    void deleteFile(String path);
}
