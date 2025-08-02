package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Create a REST controller to expose the CRUD operations via HTTP.

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/players")
public class PlayerController {
    @Autowired
    private PlayerServices playerServices;

    // 公开访问 - 所有用户都可以查看球员信息
    @GetMapping
    public List<Player> getPlayers() {
        return playerServices.getAllPlayers();
    }

    // 公开访问 - 所有用户都可以查看单个球员信息
    @GetMapping("/{id}")
    public Player getPlayById(@PathVariable Long id){
        return playerServices.getPlayerById(id).orElse(null);
    }

    // 需要管理员权限 - 创建球员
    @PostMapping()
    public ResponseEntity<Player> createPlayer(@RequestBody Player player){
        try {
            Player createdPlayer = playerServices.createPlayer(player);
            return ResponseEntity.ok(createdPlayer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // 需要管理员权限 - 更新球员
    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player){
        try {
            Player updatedPlayer = playerServices.updatePlayer(id, player);
            return ResponseEntity.ok(updatedPlayer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // 需要管理员权限 - 删除球员
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable Long id){
        try {
            playerServices.deletePlayer(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
