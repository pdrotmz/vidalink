package com.vidalink.services;

import com.vidalink.model.reward.Reward;
import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.repository.RewardRedemptionRepository;
import com.vidalink.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class RewardRedemptionService {

    @Autowired
    private RewardRedemptionRepository redemptionRepository;

    @Autowired
    private RewardService rewardService;

    @Autowired
    private UserService donorService;

    @Autowired
    private DonationService donationService;

    public RewardRedemption redeem(UUID donorId, UUID rewardId) {
        int donorPoints = donationService.calculatePoints(donorId);
        Reward reward = rewardService.getById(rewardId);

        if (donorPoints < reward.getPointsRequired()) {
            throw new RuntimeException("Not enough points to redeem this reward.");
        }

        RewardRedemption redemption = new RewardRedemption();
        redemption.setDonor(donorService.findById(donorId));
        redemption.setReward(reward);
        redemption.setRedemptionDate(LocalDate.now());

        return redemptionRepository.save(redemption);
    }

    public List<RewardRedemption> getRedemptionsByDonor(UUID donorId) {
        return redemptionRepository.findByDonorId(donorId);
    }
}
