package com.vidalink.controller;

import com.vidalink.dto.auth.AuthenticationDTO;
import com.vidalink.dto.auth.LoginResponseDTO;
import com.vidalink.dto.auth.RegisterDTO;
import com.vidalink.infra.security.TokenService;
import com.vidalink.model.user.UserRole;
import com.vidalink.model.user.User;
import com.vidalink.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthenticationControllerTest {

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenService tokenService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin() {
        // Arrange
        AuthenticationDTO authDTO = new AuthenticationDTO("user1", "password123");
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(authDTO.username(), authDTO.password());

        User mockUser = new User(authDTO.username(), "user1@email.com", "hashedPassword", UserRole.USER);

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(mockUser);
        when(authenticationManager.authenticate(token)).thenReturn(authentication);
        when(tokenService.generateToken(mockUser)).thenReturn("jwt-token");

        // Act
        ResponseEntity<?> response = authenticationController.login(authDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof LoginResponseDTO);
        assertEquals("jwt-token", ((LoginResponseDTO) response.getBody()).token());
    }

    @Test
    void testLogin_InvalidCredentials() {
        AuthenticationDTO authDTO = new AuthenticationDTO("wronguser", "wrongpass");
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(authDTO.username(), authDTO.password());

        when(authenticationManager.authenticate(token))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThrows(BadCredentialsException.class, () -> {
            authenticationController.login(authDTO);
        });
    }

    @Test
    void testLogin_TokenServiceThrowsException() {
        AuthenticationDTO authDTO = new AuthenticationDTO("user", "password");
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(authDTO.username(), authDTO.password());

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(new User());
        when(authenticationManager.authenticate(token)).thenReturn(authentication);
        when(tokenService.generateToken(any(User.class)))
                .thenThrow(new RuntimeException("Erro interno"));

        assertThrows(RuntimeException.class, () -> {
            authenticationController.login(authDTO);
        });
    }


    @Test
    void testRegister_NewUser() {
        // Arrange
        RegisterDTO registerDTO = new RegisterDTO("user2", "user2@email.com", "password456", UserRole.USER);
        when(userRepository.findByUsername(registerDTO.username())).thenReturn(null);

        // Act
        ResponseEntity<?> response = authenticationController.register(registerDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_ExistingUser() {
        // Arrange
        RegisterDTO registerDTO = new RegisterDTO("user3", "user3@email.com", "password789", UserRole.USER);
        when(userRepository.findByUsername(registerDTO.username()))
                .thenReturn(new User());

        // Act
        ResponseEntity<?> response = authenticationController.register(registerDTO);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(userRepository, never()).save(any(User.class));
    }
}
