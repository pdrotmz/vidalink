package com.vidalink.controller;

import com.vidalink.model.reward.Reward;
import com.vidalink.model.user.User;
import com.vidalink.services.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rewards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/CadastroProduto")
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
    public ResponseEntity<Reward> createReward(@RequestBody Reward reward) {
        return ResponseEntity.ok(rewardService.createReward(reward));
    }

    // 4. Lista recompensas resgatadas pelo usuário
    @GetMapping("/my-rewards")
    public ResponseEntity<List<Reward>> listUserRewards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getRewardsForUser(user));
    }
}