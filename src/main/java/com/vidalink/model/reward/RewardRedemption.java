package com.vidalink.model.reward;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vidalink.model.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_reward_redemption")
@Data
public class RewardRedemption {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    private User donor;

    @ManyToOne
    @JsonIgnoreProperties("redemptions") // Evita loop
    private Reward reward;

    private LocalDateTime redeemedAt = LocalDateTime.now();
}

