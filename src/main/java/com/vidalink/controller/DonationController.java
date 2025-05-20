package com.vidalink.controller;

import com.vidalink.model.donation.Donation;
import com.vidalink.model.donation.DonationType;
import com.vidalink.services.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping("/register")
    public Donation registerDonation(@RequestParam UUID donorId,
                                     @RequestParam DonationType type) {
        return donationService.registerDonation(donorId, type);
    }

    @GetMapping("/donor/{donorId}")
    public List<Donation> getDonations(@PathVariable UUID donorId) {
        return donationService.getDonationsByDonor(donorId);
    }

    @GetMapping("/points/{donorId}")
    public int getPoints(@PathVariable UUID donorId) {
        return donationService.calculatePoints(donorId);
    }
}