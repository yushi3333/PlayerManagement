package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 创建默认管理员用户
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setEmail("admin@nba.com");
            adminUser.setRole(UserRole.ADMIN);
            userRepository.save(adminUser);
            System.out.println("Default admin user created: admin/admin123");
        }

        // 创建默认普通用户
        if (!userRepository.existsByUsername("user")) {
            User normalUser = new User();
            normalUser.setUsername("user");
            normalUser.setPassword(passwordEncoder.encode("user123"));
            normalUser.setEmail("user@nba.com");
            normalUser.setRole(UserRole.USER);
            userRepository.save(normalUser);
            System.out.println("Default user created: user/user123");
        }
    }
} 