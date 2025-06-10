package com.vidalink.services;

import com.vidalink.model.reward.Reward;
import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.model.user.User;
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
        User donor = donorService.findById(donorId);
        Reward reward = rewardService.getById(rewardId);

        validateRedemptionEligibility(donor, reward, donorId);

        RewardRedemption redemption = new RewardRedemption();
        redemption.setDonor(donor);
        redemption.setReward(reward);

        return redemptionRepository.save(redemption);
    }

    private void validateRedemptionEligibility(User donor, Reward reward, UUID donorId) {
        int donorPoints = donationService.calculatePoints(donorId);

        if (donorPoints < reward.getPointsRequired()) {
            throw new IllegalArgumentException("Você não tem pontos suficientes para resgatar esta recompensa.");
        }

        if (redemptionRepository.existsByDonorAndReward(donor, reward)) {
            throw new IllegalStateException("Você já resgatou essa recompensa.");
        }
    }

    public List<RewardRedemption> getRedemptionsByDonor(UUID donorId) {
        return redemptionRepository.findByDonorId(donorId);
    }
}
