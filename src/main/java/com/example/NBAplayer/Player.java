package com.example.NBAplayer;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import jakarta.persistence.*;


@Entity
@Table(name="player")//table name
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String team;
    private String name;
    private int gp;
    private double minutes;
    private double fgp;
    private double fg3p;
    private double ftp;
    private double eff;
    private double reb;
    private double ast;
    private double stl;
    private double blk;
    private double tov;
    private double pts;




}
