package com.vidalink.model.donation;

import com.vidalink.model.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tb_donation")
@Data
public class Donation {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private LocalDate donationDate;

    @Enumerated(EnumType.STRING)
    private DonationType type; // SANGUE, ÓRGÃO

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private User donor;
}
