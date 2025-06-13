package com.vidalink.model.reward;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import javax.net.ssl.SSLSession;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_rewards")
@Data
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private String description;
    private Integer pointsRequired;
    private String imageUrl;
    private boolean active;

    @OneToMany(mappedBy = "reward")
    @JsonIgnore
    private List<RewardRedemption> redemptions;
}

