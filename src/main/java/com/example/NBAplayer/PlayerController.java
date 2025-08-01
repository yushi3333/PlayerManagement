package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Create a REST controller to expose the CRUD operations via HTTP.

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/players")
public class PlayerController {
    @Autowired
    private PlayerServices playerServices;

    @GetMapping
    public List<Player> getPlayers() {
        return playerServices.getAllPlayers();
    }

    @GetMapping("/{id}")
    public Player getPlayById(@PathVariable Long id){
        return playerServices.getPlayerById(id).orElse(null);
    }

    //create player
    @PostMapping()
    public Player createPlayer(@RequestBody Player player){
        return playerServices.createPlayer(player);
    }
    //update
    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody Player player){


        return playerServices.updatePlayer(id, player);
    }
    //delete
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id){
        playerServices.deletePlayer(id);
    }






}
