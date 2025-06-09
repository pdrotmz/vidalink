package com.vidalink.model.reward;

import jakarta.persistence.*;
import lombok.Data;

import javax.net.ssl.SSLSession;
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
    private boolean active;
    private String imageUrl;
}

