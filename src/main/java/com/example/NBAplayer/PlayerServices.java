package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
//Create a service class to handle CRUD logic.
@Service
public class PlayerServices {
    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }
    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Long id, Player player) {
        // Fetch the player from the database using the ID
        Optional<Player> existingPlayerOpt = playerRepository.findById(id);
        if (existingPlayerOpt.isPresent()) {
            Player existingPlayer = existingPlayerOpt.get(); // Get the actual Player object
            existingPlayer.setTeam(player.getTeam());
            existingPlayer.setName(player.getName());
            existingPlayer.setGp(player.getGp());
            existingPlayer.setMinutes(player.getMinutes());
            existingPlayer.setFgp(player.getFgp());
            existingPlayer.setFg3p(player.getFg3p());
            existingPlayer.setFtp(player.getFtp());
            existingPlayer.setEff(player.getEff());
            existingPlayer.setReb(player.getReb());
            existingPlayer.setAst(player.getAst());
            existingPlayer.setStl(player.getStl());
            existingPlayer.setBlk(player.getBlk());
            existingPlayer.setTov(player.getTov());
            existingPlayer.setPts(player.getPts());

            return playerRepository.save(existingPlayer);

        }else{
            throw new RuntimeException("Player with ID " + id + " not found");
        }


    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }

}
