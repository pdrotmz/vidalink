package com.vidalink.controller;

import com.vidalink.dto.reward.RewardDTO;
import com.vidalink.dto.reward.RewardRedeemResponseDTO;
import com.vidalink.model.reward.Reward;
import com.vidalink.model.user.User;
import com.vidalink.services.RewardService;
import com.vidalink.services.storage.LocalStorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
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


    @GetMapping("/my-rewards")
    public ResponseEntity<List<Reward>> listUserRewards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getRewardsForUser(user));
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Reward> updateReward(
            @PathVariable UUID id,
            @RequestPart("reward") @Valid Reward reward,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
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
