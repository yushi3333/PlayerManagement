package com.example.NBAplayer;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

@Entity
@Table(name="player")//table name
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

    // Constructors
    public Player() {}

    public Player(Long id, String team, String name, int gp, double minutes, double fgp, double fg3p, double ftp, double eff, double reb, double ast, double stl, double blk, double tov, double pts) {
        this.id = id;
        this.team = team;
        this.name = name;
        this.gp = gp;
        this.minutes = minutes;
        this.fgp = fgp;
        this.fg3p = fg3p;
        this.ftp = ftp;
        this.eff = eff;
        this.reb = reb;
        this.ast = ast;
        this.stl = stl;
        this.blk = blk;
        this.tov = tov;
        this.pts = pts;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGp() {
        return gp;
    }

    public void setGp(int gp) {
        this.gp = gp;
    }

    public double getMinutes() {
        return minutes;
    }

    public void setMinutes(double minutes) {
        this.minutes = minutes;
    }

    public double getFgp() {
        return fgp;
    }

    public void setFgp(double fgp) {
        this.fgp = fgp;
    }

    public double getFg3p() {
        return fg3p;
    }

    public void setFg3p(double fg3p) {
        this.fg3p = fg3p;
    }

    public double getFtp() {
        return ftp;
    }

    public void setFtp(double ftp) {
        this.ftp = ftp;
    }

    public double getEff() {
        return eff;
    }

    public void setEff(double eff) {
        this.eff = eff;
    }

    public double getReb() {
        return reb;
    }

    public void setReb(double reb) {
        this.reb = reb;
    }

    public double getAst() {
        return ast;
    }

    public void setAst(double ast) {
        this.ast = ast;
    }

    public double getStl() {
        return stl;
    }

    public void setStl(double stl) {
        this.stl = stl;
    }

    public double getBlk() {
        return blk;
    }

    public void setBlk(double blk) {
        this.blk = blk;
    }

    public double getTov() {
        return tov;
    }

    public void setTov(double tov) {
        this.tov = tov;
    }

    public double getPts() {
        return pts;
    }

    public void setPts(double pts) {
        this.pts = pts;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", team='" + team + '\'' +
                ", name='" + name + '\'' +
                ", gp=" + gp +
                ", minutes=" + minutes +
                ", fgp=" + fgp +
                ", fg3p=" + fg3p +
                ", ftp=" + ftp +
                ", eff=" + eff +
                ", reb=" + reb +
                ", ast=" + ast +
                ", stl=" + stl +
                ", blk=" + blk +
                ", tov=" + tov +
                ", pts=" + pts +
                '}';
    }
}
