package com.vidalink.controller;

import com.vidalink.dto.reward.RewardDTO;
import com.vidalink.dto.reward.RewardRedeemResponseDTO;
import com.vidalink.model.reward.Reward;
import com.vidalink.model.user.User;
import com.vidalink.services.RewardService;
import com.vidalink.services.storage.LocalStorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/rewards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RewardController {

    private final RewardService rewardService;
    private final LocalStorageService fileStorageService;


    @GetMapping("/available")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Reward>> listAvailableRewards() {
        return ResponseEntity.ok(rewardService.getActiveRewards());
    }


    @PostMapping("/redeem")
    public ResponseEntity<String> redeemReward(@AuthenticationPrincipal User user) {
        boolean redeemed = rewardService.redeemRewardIfEligible(user);
        if (redeemed) {
            return ResponseEntity.ok("Recompensa resgatada com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Você não tem pontos suficientes ou já recebeu todas as recompensas disponíveis.");
        }
    }

    @PostMapping("/redeem/{rewardId}")
    public ResponseEntity<RewardRedeemResponseDTO> redeemReward(
            @PathVariable UUID rewardId,
            @AuthenticationPrincipal User user) {

        rewardService.redeemReward(user.getId(), rewardId);

        return ResponseEntity.ok(
                new RewardRedeemResponseDTO("Recompensa resgatada com sucesso!", user.getPoints())
        );
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createReward(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("pointsRequired") Integer pointsRequired,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        try {
            Reward reward = rewardService.createReward(name, description, pointsRequired, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(reward);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem.");
        }
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<Resource> getRewardImage(@PathVariable UUID id) {
        try {
            Optional<Reward> rewardOpt = rewardService.findById(id);
            if (rewardOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Reward reward = rewardOpt.get();
            if (reward.getImageUrl() == null || reward.getImageUrl().isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Path filePath = Paths.get("uploads").resolve(reward.getImageUrl());
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            Resource file = new UrlResource(filePath.toUri());
            String contentType = rewardService.determineContentType(filePath);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao carregar imagem");
        }
    }



    @GetMapping("/my-rewards")
    public ResponseEntity<List<Reward>> listUserRewards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getRewardsForUser(user));
    }


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Reward> updateReward(
            @PathVariable UUID id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("pointsRequired") Integer pointsRequired,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        Reward reward = new Reward();
        reward.setName(name);
        reward.setDescription(description);
        reward.setPointsRequired(pointsRequired);

        return ResponseEntity.ok(rewardService.updateReward(id, reward, file));
    }



    @GetMapping("/search/{name}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reward>> listRewardsByName(@PathVariable String name) {
        List<Reward> rewards = rewardService.findRewardByName(name);
        return ResponseEntity.ok(rewards);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReward(@PathVariable UUID id) {
        rewardService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }
}
