package com.vidalink.controller;

import com.vidalink.model.reward.Reward;
import com.vidalink.model.user.User;
import com.vidalink.services.RewardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rewards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RewardController {

    private final RewardService rewardService;

    // 1. Lista todas as recompensas ativas
    @GetMapping("/available")
    public ResponseEntity<List<Reward>> listAvailableRewards() {
        return ResponseEntity.ok(rewardService.getActiveRewards());
    }

    // 2. Tenta resgatar a próxima recompensa para o usuário autenticado
    @PostMapping("/redeem")
    public ResponseEntity<String> redeemReward(@AuthenticationPrincipal User user) {
        boolean redeemed = rewardService.redeemRewardIfEligible(user);
        if (redeemed) {
            return ResponseEntity.ok("Recompensa resgatada com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Você não tem pontos suficientes ou já recebeu todas as recompensas disponíveis.");
        }
    }

    // 3. Cria uma nova recompensa (requer ADMIN)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Reward> createReward(@RequestBody @Valid Reward reward) {
        return ResponseEntity.ok(rewardService.createReward(reward));
    }

    // 4. Lista recompensas resgatadas pelo usuário
    @GetMapping("/my-rewards")
    public ResponseEntity<List<Reward>> listUserRewards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getRewardsForUser(user));
    }

    // 5. Atualiza recompensa (requer ADMIN)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Reward> updateReward(@PathVariable UUID id, @RequestBody @Valid Reward reward) {
        return ResponseEntity.ok(rewardService.updateReward(id, reward));
    }

    @GetMapping("/search/{name}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reward>> listRewardsByName(@PathVariable String name) {
        List<Reward> rewards = rewardService.findRewardByName(name);
        return ResponseEntity.ok(rewards);
    }
    // 6. Remove recompensa (requer ADMIN)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReward(@PathVariable UUID id) {
        rewardService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }
}
