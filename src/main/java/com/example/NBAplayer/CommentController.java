package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        return comment.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/player/{playerId}")
    public List<Comment> getCommentsByPlayerId(@PathVariable Long playerId) {
        return commentService.getCommentsByPlayerId(playerId);
    }

    @GetMapping("/team/{teamName}")
    public List<Comment> getCommentsByTeamName(@PathVariable String teamName) {
        return commentService.getCommentsByTeamName(teamName);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            // 这里需要根据用户名获取用户ID，简化处理
            Long userId = 1L; // 实际应用中需要从数据库查询
            
            Comment createdComment = commentService.createComment(comment, userId);
            return ResponseEntity.ok(createdComment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            // 这里需要根据用户名获取用户ID，简化处理
            Long userId = 1L; // 实际应用中需要从数据库查询
            
            Comment updatedComment = commentService.updateComment(id, commentDetails, userId);
            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            // 这里需要根据用户名获取用户ID，简化处理
            Long userId = 1L; // 实际应用中需要从数据库查询
            
            commentService.deleteComment(id, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 