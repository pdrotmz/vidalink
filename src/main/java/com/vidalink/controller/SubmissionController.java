package com.vidalink.controller;

import com.vidalink.model.submission.Submission;
import com.vidalink.services.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void submit(
            @RequestParam("file") MultipartFile file,
            @RequestParam("emailAuthor") String emailAuthor
    ) {
        submissionService.submit(file, emailAuthor);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Submission>> listPending() {
        return ResponseEntity.ok(submissionService.listPending());
    }

    @PutMapping("/{id}/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> validate(@PathVariable UUID id) {
        submissionService.validate(id);
        return ResponseEntity.ok("Submissão validada");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> reject(@PathVariable UUID id) {
        submissionService.reject(id);
        return ResponseEntity.ok("Submissão rejeitada e deletada");
    }
}

