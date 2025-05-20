package com.vidalink.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors()
                .and()
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize

                        // Auth Endpoints
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()

                        // Donation
                        .requestMatchers(HttpMethod.POST, "/api/donations/register").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/donations/donor/").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/donations/points/").hasRole("USER")

                        // Donor
                        .requestMatchers(HttpMethod.POST, "/api/donors").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/donors/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/donors/").hasRole("ADMIN")

                        // Reward
                        .requestMatchers(HttpMethod.POST, "api/rewards").hasRole("USER")

                        // Reward Redemption
                        .requestMatchers(HttpMethod.POST, "api/redeem").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/redeem/").hasRole("ADMIN")

                        // User
                        .requestMatchers(HttpMethod.POST, "user/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "user").hasRole("ADMIN")

                        // Admin
                        .requestMatchers(HttpMethod.PUT, "admin/users/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "admin/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "admin/users").hasRole("ADMIN")

                        // H2 Database Endpoints
                        .requestMatchers(HttpMethod.POST, "/h2-console/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/h2-console/**").permitAll()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}