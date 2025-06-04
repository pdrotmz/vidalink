package com.vidalink.services;

import com.vidalink.model.reward.Reward;
import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.model.user.User;
import com.vidalink.repository.RewardRedemptionRepository;
import com.vidalink.repository.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;
    private final RewardRedemptionRepository rewardRedemptionRepository;

    public List<Reward> getActiveRewards() {
        return rewardRepository.findByActiveTrueOrderByPointsRequiredAsc();
    }

    public boolean redeemRewardIfEligible(User user) {
        List<RewardRedemption> redeemed = rewardRedemptionRepository.findByDonor(user);
        Set<UUID> redeemedIds = redeemed.stream()
                .map(r -> r.getReward().getId())
                .collect(Collectors.toSet());

        List<Reward> allAvailable = rewardRepository.findByActiveTrueOrderByPointsRequiredAsc();

        for (Reward reward : allAvailable) {
            if (user.getPoints() >= reward.getPointsRequired() && !redeemedIds.contains(reward.getId())) {
                RewardRedemption redemption = new RewardRedemption();
                redemption.setDonor(user);
                redemption.setReward(reward);
                redemption.setRedemptionDate(LocalDate.now());
                rewardRedemptionRepository.save(redemption);
                return true;
            }
        }
        return false;
    }

    public Reward createReward(Reward reward) {
        reward.setId(null); // garante novo insert
        reward.setActive(true);
        return rewardRepository.save(reward);
    }

    public List<Reward> getRewardsForUser(User user) {
        return rewardRedemptionRepository.findByDonor(user)
                .stream()
                .map(RewardRedemption::getReward)
                .collect(Collectors.toList());
    }

    public Reward getById(UUID id) {
        return rewardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recompensa não encontrada com ID: " + id));
    }

    public List<Reward> findRewardByName(String name) {
        List<Reward> rewards = rewardRepository.findByNameContainingIgnoreCase(name);
        if(rewards.isEmpty()) {
            throw new RuntimeException("Não há nenhuma recompensa!");
        }
        return rewards;
    }

    public Reward updateReward(UUID id, Reward updatedReward) {
        Reward existing = getById(id);
        existing.setName(updatedReward.getName());
        existing.setDescription(updatedReward.getDescription());
        existing.setPointsRequired(updatedReward.getPointsRequired());
        return rewardRepository.save(existing);
    }

    public void deleteReward(UUID id) {
        Reward existing = getById(id);
        rewardRepository.delete(existing);
    }
}
