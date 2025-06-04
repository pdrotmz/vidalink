package com.vidalink.services;

import com.vidalink.dto.auth.AuthRequest;
import com.vidalink.dto.auth.AuthResponse;
import com.vidalink.dto.auth.RegisterRequest;
import com.vidalink.infra.security.JwtService;
import com.vidalink.model.user.User;
import com.vidalink.model.user.UserRole;
import com.vidalink.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        UserRole role = defineUserRole(request.email());

        var user = User.builder()
                .username(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(role)
                .build();

        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt);
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        var jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt);
    }

    private UserRole defineUserRole(String email) {
        if(email.endsWith("@vidalink.com.br")) {
            return UserRole.ADMIN;
        }
        return UserRole.USER;
    }
}