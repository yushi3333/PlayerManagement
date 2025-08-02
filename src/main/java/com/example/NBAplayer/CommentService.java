package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByPlayerId(Long playerId) {
        return commentRepository.findByPlayerIdOrderByCreatedAtDesc(playerId);
    }

    public List<Comment> getCommentsByTeamName(String teamName) {
        return commentRepository.findByTeamNameOrderByCreatedAtDesc(teamName);
    }

    public List<Comment> getCommentsByUserId(Long userId) {
        return commentRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Comment createComment(Comment comment, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.setUser(user);
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, Comment commentDetails, Long userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Check if user owns the comment or is admin
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this comment");
        }

        comment.setContent(commentDetails.getContent());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id, Long userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Check if user owns the comment or is admin
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this comment");
        }

        commentRepository.deleteById(id);
    }
} 