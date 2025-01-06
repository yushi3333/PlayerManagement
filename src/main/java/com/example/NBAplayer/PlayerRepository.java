package com.example.NBAplayer;

import org.springframework.data.jpa.repository.JpaRepository;

//Create a repository interface to interact with the database.
public interface PlayerRepository extends JpaRepository<Player, Long> {
}
