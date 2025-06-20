package com.vidalink.repository;

import com.vidalink.model.reward.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RewardRepository extends JpaRepository<Reward, UUID> {
    Optional<Reward> findById(UUID id);

    List<Reward> findByNameContainingIgnoreCase(String name);

    List<Reward> findByPointsRequiredLessThanEqualAndActiveTrue(Integer points);

    List<Reward> findByActiveTrueOrderByPointsRequiredAsc();
}
