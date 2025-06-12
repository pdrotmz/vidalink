package com.vidalink.dto.reward;

import com.vidalink.model.reward.Reward;

import java.util.UUID;

public class RewardResponseDTO {
    private UUID id;
    private String name;
    private String description;
    private Integer pointsRequired;
    private String imageUrl;

    public RewardResponseDTO(Reward reward) {
        this.id = reward.getId();
        this.name = reward.getName();
        this.description = reward.getDescription();
        this.pointsRequired = reward.getPointsRequired();
        this.imageUrl = reward.getImageUrl(); // ou reward.getImagem() se for um path
    }
}
