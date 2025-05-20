package com.vidalink.services;

import com.vidalink.model.reward.Reward;
import com.vidalink.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> getAvailableRewards() {
        return rewardRepository.findByActiveTrue();
    }

    public Reward getById(UUID id) {
        return rewardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reward not found"));
    }
}