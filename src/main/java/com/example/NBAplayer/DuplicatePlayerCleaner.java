package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Order(3)
public class DuplicatePlayerCleaner implements CommandLineRunner {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("正在检查重复球员...");
        
        // 获取所有球员
        List<Player> allPlayers = playerRepository.findAll();
        
        // 按姓名分组，找出重复的球员
        Map<String, List<Player>> playersByName = allPlayers.stream()
                .collect(Collectors.groupingBy(Player::getName));
        
        // 找出有重复的球员姓名
        Map<String, List<Player>> duplicates = playersByName.entrySet().stream()
                .filter(entry -> entry.getValue().size() > 1)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        
        if (duplicates.isEmpty()) {
            System.out.println("没有发现重复球员。");
            return;
        }
        
        System.out.println("发现 " + duplicates.size() + " 个重复球员姓名：");
        
        int totalRemoved = 0;
        
        // 处理每个重复的球员姓名
        for (Map.Entry<String, List<Player>> entry : duplicates.entrySet()) {
            String playerName = entry.getKey();
            List<Player> duplicatePlayers = entry.getValue();
            
            System.out.println("球员: " + playerName + " (重复 " + duplicatePlayers.size() + " 次)");
            
            // 保留第一个球员，删除其余的
            Player playerToKeep = duplicatePlayers.get(0);
            List<Player> playersToRemove = duplicatePlayers.subList(1, duplicatePlayers.size());
            
            System.out.println("  保留: ID=" + playerToKeep.getId() + ", 球队=" + playerToKeep.getTeam());
            
            for (Player playerToRemove : playersToRemove) {
                System.out.println("  删除: ID=" + playerToRemove.getId() + ", 球队=" + playerToRemove.getTeam());
                playerRepository.delete(playerToRemove);
                totalRemoved++;
            }
        }
        
        System.out.println("清理完成！总共删除了 " + totalRemoved + " 个重复球员。");
        
        // 显示清理后的统计
        long remainingPlayers = playerRepository.count();
        System.out.println("清理后剩余球员数量: " + remainingPlayers);
    }
} 