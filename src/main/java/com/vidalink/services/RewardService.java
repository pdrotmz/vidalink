package com.vidalink.services;

import com.vidalink.dto.reward.RewardDTO;
import com.vidalink.model.reward.Reward;
import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.model.user.User;
import com.vidalink.repository.RewardRedemptionRepository;
import com.vidalink.repository.RewardRepository;
import com.vidalink.repository.UserRepository;
import com.vidalink.services.storage.LocalStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;
    private final RewardRedemptionRepository rewardRedemptionRepository;
    private final UserRepository userRepository;
    private final LocalStorageService fileStorageService;

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
                rewardRedemptionRepository.save(redemption);
                return true;
            }
        }
        return false;
    }

    public Reward getById(UUID id) {
        return rewardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recompensa não encontrada com ID: " + id));
    }

    public Reward createReward(String name, String description, Integer pointsRequired, MultipartFile file) throws IOException {
        String imageUrl = null;

        if (file != null && !file.isEmpty()) {

            imageUrl = fileStorageService.saveFile(file);
        }

        Reward reward = new Reward();
        reward.setName(name);
        reward.setDescription(description);
        reward.setPointsRequired(pointsRequired);
        reward.setImageUrl(imageUrl);
        reward.setActive(true);

        if(reward.getPointsRequired() < 0) {
            throw new RuntimeException("Número precisa ser maior que 0");
        }

        return rewardRepository.save(reward);
    }

    public List<Reward> getRewardsForUser(User user) {
        return rewardRedemptionRepository.findByDonor(user)
                .stream()
                .filter(r -> r.getReward() != null)
                .map(RewardRedemption::getReward)
                .collect(Collectors.toList());
    }


    public Optional<Reward> findById(UUID id) {
        return rewardRepository.findById(id);
    }

    public List<Reward> findRewardByName(String name) {
        List<Reward> rewards = rewardRepository.findByNameContainingIgnoreCase(name);
        if(rewards.isEmpty()) {
            throw new RuntimeException("Não há nenhuma recompensa!");
        }
        return rewards;
    }

    public String determineContentType(Path filePath) {
        String fileName = filePath.getFileName().toString().toLowerCase();
        if (fileName.endsWith(".png")) {
            return "image/png";
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (fileName.endsWith(".gif")) {
            return "image/gif";
        } else if (fileName.endsWith(".svg")) {
            return "image/svg+xml";
        } else if (fileName.endsWith(".webp")) {
            return "image/webp";
        } else {
            return "application/octet-stream";
        }
    }

    public void redeemReward(UUID userId, UUID rewardId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new RuntimeException("Recompensa não encontrada"));

        if (user.getPoints() < reward.getPointsRequired()) {
            throw new RuntimeException("Pontos insuficientes para resgatar esta recompensa.");
        }

        // Desconta os pontos
        user.setPoints(user.getPoints() - reward.getPointsRequired());
        userRepository.save(user);

        // Salva o vínculo no histórico de resgate
        RewardRedemption redemption = new RewardRedemption();
        redemption.setDonor(user);
        redemption.setReward(reward);
        rewardRedemptionRepository.save(redemption);
    }

    public Reward updateReward(UUID id, Reward updatedReward, MultipartFile file) {
        Reward existing = getById(id);
        existing.setName(updatedReward.getName());
        existing.setDescription(updatedReward.getDescription());
        existing.setPointsRequired(updatedReward.getPointsRequired());

        if (file != null && !file.isEmpty()) {
            String imagePath = fileStorageService.saveFile(file);
            existing.setImageUrl(imagePath);
        }

        return rewardRepository.save(existing);
    }

    public void deleteReward(UUID id) {
        Reward existing = getById(id);
        rewardRepository.delete(existing);
    }
}
