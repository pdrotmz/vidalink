package com.vidalink.model.reward;

import com.vidalink.model.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
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
    private Reward reward;

    private LocalDate redemptionDate;
}

