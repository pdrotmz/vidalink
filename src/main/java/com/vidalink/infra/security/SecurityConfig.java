package com.vidalink.infra.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter authFilter;

    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public HttpFirewall httpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        // Permite quebras de linha codificadas em URL para resolver o erro %0A
        firewall.setAllowUrlEncodedLineFeed(true);
        firewall.setAllowUrlEncodedCarriageReturn(true);
        // Permite outros caracteres que podem ser necessários
        firewall.setAllowUrlEncodedPercent(true);
        firewall.setAllowUrlEncodedSlash(true);
        return firewall;
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.httpFirewall(httpFirewall());
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                    config.setAllowCredentials(true);
                    return config;
                })
                .and()
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // 🔓 Público
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/", "/index.html", "/assets/**", "/icon.svg", "/vite.svg").permitAll()


                        // 👤 USER pode submeter
                        .requestMatchers(HttpMethod.POST, "/submissions").hasRole("USER")

                        // 🔐 ADMIN acessa lista de pendentes
                        .requestMatchers(HttpMethod.GET, "/submissions/pending").hasRole("ADMIN")

                        // 🔐 ADMIN pode validar submissão
                        .requestMatchers(HttpMethod.PUT, "/submissions/{id}/validate").hasRole("ADMIN")

                        // 🔐 ADMIN pode rejeitar (deletar) submissão
                        .requestMatchers(HttpMethod.DELETE, "/submissions/{id}").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "api/users/**").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/users/me").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/api/users/*/edit-profile").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/api/users/*/profile-image").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/redeem/**").hasAnyRole("ADMIN", "USER")

                        .requestMatchers(HttpMethod.GET, "/placeholder.png").permitAll()
                        .requestMatchers(HttpMethod.GET, "/static/**").permitAll()
                        .requestMatchers( "/images/**").permitAll()


                        // 🎁 Recompensas

                        // 🔓 Público (listar recompensas ativas)
                        .requestMatchers(HttpMethod.GET, "/rewards/available").hasAnyRole("ADMIN", "USER")

                        .requestMatchers(HttpMethod.GET, "/rewards/**/image").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/files/**").permitAll()

                        // 🔐 ADMIN pode criar recompensas
                        .requestMatchers(HttpMethod.POST, "/rewards").hasRole("ADMIN")

                        // 👤 USER pode resgatar recompensa
                        .requestMatchers(HttpMethod.POST, "/rewards/redeem").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/rewards/redeem/**").hasRole("USER")

                        // 👤 USER pode ver suas recompensas conquistadas
                        .requestMatchers(HttpMethod.GET, "/rewards/my-rewards").hasAnyRole("USER", "ADMIN")

                        .requestMatchers(HttpMethod.GET, "rewards/search/").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/rewards/**").hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/rewards/**").hasRole("ADMIN")



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