package com.vidalink.services;

import com.vidalink.model.reward.Reward;
import com.vidalink.model.reward.RewardRedemption;
import com.vidalink.model.submission.Submission;
import com.vidalink.model.submission.SubmissionStatus;
import com.vidalink.model.user.User;
import com.vidalink.repository.RewardRedemptionRepository;
import com.vidalink.repository.RewardRepository;
import com.vidalink.repository.SubmissionRepository;
import com.vidalink.repository.UserRepository;
import com.vidalink.services.storage.LocalStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final LocalStorageService storageService;
    private final RewardRepository rewardRepository;
    private final RewardRedemptionRepository rewardRedemptionRepository;

    public void submit(MultipartFile file, String emailAuthor) {
        User author = userRepository.findByEmail(emailAuthor)
                .orElseThrow(() -> new RuntimeException("Autor não encontrado"));

        String path = storageService.saveFile(file);

        Submission submission = Submission.builder()
                .author(author)
                .filePath(path)
                .status(SubmissionStatus.EM_ANALISE)
                .createdAt(LocalDateTime.now())
                .build();

        submissionRepository.save(submission);
    }

    public List<Submission> listPending() {
        return submissionRepository.findByStatus(SubmissionStatus.EM_ANALISE);
    }

    public void validate(UUID submissionId) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submissão não encontrada"));

        submission.setStatus(SubmissionStatus.VALIDADO);
        submissionRepository.save(submission);

        User author = submission.getAuthor();
        User referenced = submission.getReferencedUser();

        author.addPoints(1);
        referenced.addPoints(1);

        userRepository.saveAll(List.of(author, referenced));

        checkAndApplyRewards(author);
        checkAndApplyRewards(referenced);
    }

    public void reject(UUID submissionId) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submissão não encontrada"));

        storageService.deleteFile(submission.getFilePath());
        submissionRepository.delete(submission);
    }

    private void checkAndApplyRewards(User user) {
        int currentPoints = user.getPoints();


        List<Reward> availableRewards = rewardRepository.findByPointsRequiredLessThanEqualAndActiveTrue((currentPoints));
        List<RewardRedemption> alreadyRedeemed = rewardRedemptionRepository.findByDonor(user);

        Set<UUID> redeemedRewardIds = alreadyRedeemed.stream()
                .map(r -> r.getReward().getId())
                .collect(Collectors.toSet());

        List<Reward> newRewards = availableRewards.stream()
                .filter(r -> !redeemedRewardIds.contains(r.getId()))
                .toList();

        List<RewardRedemption> redemptionsToSave = newRewards.stream()
                .map(reward -> {
                    RewardRedemption redemption = new RewardRedemption();
                    redemption.setDonor(user);
                    redemption.setReward(reward);
                    redemption.setRedemptionDate(LocalDate.now());
                    return redemption;
                }).toList();

        rewardRedemptionRepository.saveAll(redemptionsToSave);
    }
}

