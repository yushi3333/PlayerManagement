package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtUtil jwtUtil, UserService userService) {
        return new JwtAuthenticationFilter(jwtUtil, userService);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.and())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                // 公开访问的端点
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("GET", "/api/players").permitAll()
                .requestMatchers("GET", "/api/players/{id}").permitAll()
                .requestMatchers("GET", "/api/comments/player/{playerId}").permitAll()
                .requestMatchers("GET", "/api/comments/team/{teamName}").permitAll()
                
                // 需要用户登录的端点
                .requestMatchers("POST", "/api/comments/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("PUT", "/api/comments/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("DELETE", "/api/comments/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("GET", "/api/comments").hasAnyRole("USER", "ADMIN")
                
                // 需要管理员权限的端点
                .requestMatchers("POST", "/api/players/**").hasRole("ADMIN")
                .requestMatchers("PUT", "/api/players/**").hasRole("ADMIN")
                .requestMatchers("DELETE", "/api/players/**").hasRole("ADMIN")
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
} 