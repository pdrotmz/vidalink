package com.vidalink.model.submission;

import com.vidalink.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author; // quem fez o upload

    @Column(name = "referenced_email")
    private String referencedEmail; // email de quem indicou

    private String filePath;

    @Enumerated(EnumType.STRING)
    private SubmissionStatus status;

    private LocalDateTime createdAt;
}
