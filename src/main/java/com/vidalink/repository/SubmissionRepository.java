package com.vidalink.repository;

import com.vidalink.model.submission.Submission;
import com.vidalink.model.submission.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    List<Submission> findByStatus(SubmissionStatus status);
}
