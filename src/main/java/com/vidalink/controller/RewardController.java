package com.vidalink.controller;

import com.vidalink.model.reward.Reward;
import com.vidalink.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping
    public List<Reward> getAvailableRewards() {
        return rewardService.getAvailableRewards();
    }
}