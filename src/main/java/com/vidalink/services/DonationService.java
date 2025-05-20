package com.vidalink.services;

import com.vidalink.model.donation.Donation;
import com.vidalink.model.donation.DonationType;
import com.vidalink.model.user.User;
import com.vidalink.repository.DonationRepository;
import com.vidalink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserService userService;

    public Donation registerDonation(UUID donorId, DonationType type) {
        User donor = userService.findById(donorId);

        Donation donation = new Donation();
        donation.setDonationDate(LocalDate.now());
        donation.setType(type);
        donation.setDonor(donor);

        return donationRepository.save(donation);
    }

    public List<Donation> getDonationsByDonor(UUID donorId) {
        return donationRepository.findByDonorId(donorId);
    }

    public int calculatePoints(UUID donorId) {
        List<Donation> donations = getDonationsByDonor(donorId);
        int points = 0;
        for (Donation d : donations) {
            points += (d.getType() == DonationType.SANGUE) ? 1 : 5;
        }
        return points;
    }
}
