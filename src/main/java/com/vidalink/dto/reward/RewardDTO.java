package com.vidalink.dto.reward;

import com.vidalink.model.reward.Reward;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RewardDTO {
    private UUID id;
    private String name;
    private String description;
    private int pointsRequired;
    private String imageUrl;

    public RewardDTO(Reward reward) {
        this.id = reward.getId();
        this.name = reward.getName();
        this.description = reward.getDescription();
        this.pointsRequired = reward.getPointsRequired();
        this.imageUrl = reward.getImageUrl();
    }
}
