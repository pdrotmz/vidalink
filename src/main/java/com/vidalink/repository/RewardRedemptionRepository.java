package com.vidalink.repository;

import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RewardRedemptionRepository extends JpaRepository<RewardRedemption, UUID> {
    List<RewardRedemption> findByDonorId(UUID donorId);

    List<RewardRedemption> findByDonor(User user);
}
