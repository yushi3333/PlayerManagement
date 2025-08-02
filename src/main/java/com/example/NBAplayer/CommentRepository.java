package com.example.NBAplayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPlayerIdOrderByCreatedAtDesc(Long playerId);
    List<Comment> findByTeamNameOrderByCreatedAtDesc(String teamName);
    List<Comment> findByUserIdOrderByCreatedAtDesc(Long userId);
} 