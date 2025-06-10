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
    private String nome;
    private String descricao;
    private int preco;
    private String imagemUrl;

    public RewardDTO(Reward reward) {
        this.id = reward.getId();
        this.nome = reward.getName();
        this.descricao = reward.getDescription();
        this.preco = reward.getPointsRequired();
        this.imagemUrl = reward.getImageUrl();
    }
}
