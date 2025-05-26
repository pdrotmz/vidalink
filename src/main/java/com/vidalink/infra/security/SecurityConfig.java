package com.vidalink.infra.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter authFilter;

    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // Auth Requests
                        .requestMatchers("/api/auth/**").permitAll()

                        // Author Requests
                        .requestMatchers(HttpMethod.POST, "/author/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/author/filter-by/").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/author/filter-by/name/").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/author/find-all").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/author/update-by/id/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/author/delete-by/id/**").hasRole("ADMIN")

                        // Book Requests
                        .requestMatchers(HttpMethod.POST, "/book/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/book/list-all").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/book/search-by/id/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/book/search-by/title/").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/book/search-by/isbn/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/book/filter-by/release-date/").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/book/filter-by/category/").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/book/filter-by/author/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/book/filter-by/price-between").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/book/update-by/id/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/book/delete-by/id/").hasRole("ADMIN")


                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService); // apenas UserDetailsService
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
