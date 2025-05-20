package com.vidalink.infra.security;

import com.vidalink.dto.auth.AuthenticationDTO;
import com.vidalink.model.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TokenServiceTest {

    private TokenService tokenService;

    @BeforeEach
    void setUp() {
        tokenService = new TokenService();
        // Usando reflection para setar o valor do @Value
        var secretField = TokenService.class.getDeclaredFields()[0];
        secretField.setAccessible(true);
        try {
            secretField.set(tokenService, "token-vidalink");
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void shouldGenerateValidToken() {
        User user = new User();
        user.setEmail("testuser@gmail.com");

        String token = tokenService.generateToken(user);

        assertNotNull(token);
        assertTrue(token.startsWith("ey")); // começa com 'ey' por causa da estrutura JWT
    }

    @Test
    void shouldReturnNullForInvalidToken() {
        String fakeToken = "invalid.token.value";

        String subject = tokenService.validateToken(fakeToken);

        assertNull(subject);
    }
}
