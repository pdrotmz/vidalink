package com.vidalink.controller;

import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.services.RewardRedemptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/redeem")
public class RewardRedemptionController {

    @Autowired
    private RewardRedemptionService redemptionService;

    @PostMapping
    public RewardRedemption redeemReward(@RequestParam UUID donorId,
                                         @RequestParam UUID rewardId) {
        return redemptionService.redeem(donorId, rewardId);
    }

    @GetMapping("/{donorId}")
    public List<RewardRedemption> getRedemptions(@PathVariable UUID donorId) {
        return redemptionService.getRedemptionsByDonor(donorId);
    }
}