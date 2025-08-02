package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@Order(2)
public class StartingFiveInitializer implements CommandLineRunner {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public void run(String... args) throws Exception {
        // 检查是否已经有完整的首发五人数据
        long playerCount = playerRepository.count();
        if (playerCount < 150) { // 如果球员数量少于150，说明需要添加首发五人
            System.out.println("正在添加首发五人数据...");
            
            // 添加首发五人数据
            List<Player> startingFive = Arrays.asList(
                // 湖人队首发五人
                createPlayer("Los Angeles Lakers", "Austin Reaves", 82, 32.1, 0.486, 0.367, 0.864, 15.9, 4.3, 5.5, 0.8, 0.3, 1.8, 15.9),
                createPlayer("Los Angeles Lakers", "Rui Hachimura", 68, 26.8, 0.534, 0.420, 0.739, 11.2, 3.8, 1.2, 0.6, 0.4, 0.8, 11.2),
                
                // 勇士队首发五人
                createPlayer("Golden State Warriors", "Andrew Wiggins", 71, 27.0, 0.452, 0.354, 0.752, 13.2, 4.5, 1.7, 0.6, 0.4, 1.2, 13.2),
                createPlayer("Golden State Warriors", "Kevon Looney", 74, 23.9, 0.634, 0.000, 0.619, 5.0, 5.6, 1.2, 0.4, 0.5, 0.8, 5.0),
                
                // 凯尔特人队首发五人
                createPlayer("Boston Celtics", "Derrick White", 82, 32.6, 0.461, 0.386, 0.904, 15.2, 4.2, 5.2, 1.0, 1.2, 1.5, 15.2),
                createPlayer("Boston Celtics", "Jrue Holiday", 69, 33.5, 0.480, 0.429, 0.833, 12.5, 5.4, 4.8, 0.8, 0.3, 1.5, 12.5),
                
                // 雄鹿队首发五人
                createPlayer("Milwaukee Bucks", "Malik Beasley", 79, 29.6, 0.415, 0.410, 0.714, 11.3, 3.7, 1.4, 0.7, 0.1, 0.8, 11.3),
                createPlayer("Milwaukee Bucks", "Bobby Portis", 82, 24.5, 0.507, 0.370, 0.789, 13.8, 7.4, 1.3, 0.6, 0.3, 1.1, 13.8),
                
                // 独行侠队首发五人
                createPlayer("Dallas Mavericks", "Josh Green", 75, 25.3, 0.478, 0.385, 0.750, 8.9, 3.0, 2.0, 0.7, 0.2, 0.8, 8.9),
                createPlayer("Dallas Mavericks", "Dereck Lively II", 55, 23.5, 0.747, 0.000, 0.506, 8.8, 6.9, 1.1, 0.7, 1.4, 1.0, 8.8),
                
                // 掘金队首发五人
                createPlayer("Denver Nuggets", "Aaron Gordon", 82, 31.5, 0.556, 0.295, 0.638, 13.6, 6.5, 3.0, 0.8, 0.6, 1.4, 13.6),
                createPlayer("Denver Nuggets", "Kentavious Caldwell-Pope", 76, 31.3, 0.456, 0.401, 0.891, 10.1, 2.4, 2.4, 1.3, 0.4, 1.0, 10.1),
                
                // 太阳队首发五人
                createPlayer("Phoenix Suns", "Grayson Allen", 75, 33.5, 0.495, 0.461, 0.878, 13.5, 3.9, 3.0, 0.9, 0.2, 1.1, 13.5),
                createPlayer("Phoenix Suns", "Jusuf Nurkić", 76, 27.3, 0.519, 0.000, 0.629, 10.7, 11.0, 3.9, 1.0, 1.1, 2.3, 10.7),
                
                // 76人队首发五人
                createPlayer("Philadelphia 76ers", "Kelly Oubre Jr.", 68, 30.2, 0.439, 0.317, 0.683, 15.4, 5.0, 1.5, 1.1, 0.7, 1.2, 15.4),
                createPlayer("Philadelphia 76ers", "Nicolas Batum", 60, 25.8, 0.426, 0.396, 0.636, 5.3, 4.1, 2.1, 0.8, 0.6, 0.7, 5.3),
                
                // 热火队首发五人
                createPlayer("Miami Heat", "Duncan Robinson", 68, 27.4, 0.450, 0.397, 0.857, 12.9, 2.6, 2.8, 0.5, 0.2, 1.0, 12.9),
                createPlayer("Miami Heat", "Haywood Highsmith", 66, 20.1, 0.436, 0.396, 0.667, 6.1, 3.2, 0.9, 0.6, 0.3, 0.6, 6.1),
                
                // 快船队首发五人
                createPlayer("LA Clippers", "Terance Mann", 75, 24.4, 0.519, 0.350, 0.783, 8.8, 3.4, 1.6, 0.5, 0.2, 0.8, 8.8),
                createPlayer("LA Clippers", "Ivica Zubac", 76, 26.4, 0.649, 0.000, 0.697, 11.6, 9.3, 1.4, 0.3, 1.2, 1.5, 11.6),
                
                // 雷霆队首发五人
                createPlayer("Oklahoma City Thunder", "Luguentz Dort", 79, 28.3, 0.438, 0.397, 0.810, 10.9, 3.6, 1.4, 0.9, 0.3, 1.1, 10.9),
                createPlayer("Oklahoma City Thunder", "Josh Giddey", 80, 25.1, 0.475, 0.336, 0.800, 12.3, 6.4, 4.8, 0.6, 0.4, 2.0, 12.3),
                
                // 森林狼队首发五人
                createPlayer("Minnesota Timberwolves", "Mike Conley", 76, 28.9, 0.444, 0.441, 0.889, 10.6, 2.9, 6.5, 1.0, 0.1, 1.3, 10.6),
                createPlayer("Minnesota Timberwolves", "Nickeil Alexander-Walker", 82, 23.3, 0.438, 0.389, 0.786, 8.0, 2.2, 2.0, 0.8, 0.3, 0.8, 8.0),
                
                // 鹈鹕队首发五人
                createPlayer("New Orleans Pelicans", "Herbert Jones", 76, 29.6, 0.438, 0.418, 0.855, 11.0, 3.6, 2.6, 1.4, 0.8, 1.2, 11.0),
                createPlayer("New Orleans Pelicans", "Jonas Valančiūnas", 82, 23.5, 0.559, 0.000, 0.782, 12.2, 8.8, 2.1, 0.3, 0.8, 1.8, 12.2),
                
                // 国王队首发五人
                createPlayer("Sacramento Kings", "Harrison Barnes", 82, 27.4, 0.473, 0.387, 0.847, 12.2, 3.0, 1.2, 0.7, 0.1, 0.8, 12.2),
                createPlayer("Sacramento Kings", "Keegan Murray", 78, 31.5, 0.481, 0.359, 0.836, 15.2, 5.5, 1.7, 0.7, 0.6, 1.0, 15.2),
                
                // 灰熊队首发五人
                createPlayer("Memphis Grizzlies", "Marcus Smart", 20, 29.1, 0.431, 0.224, 0.864, 14.5, 2.7, 4.3, 2.1, 0.3, 2.0, 14.5),
                createPlayer("Memphis Grizzlies", "Luke Kennard", 39, 22.5, 0.453, 0.453, 0.833, 11.0, 2.9, 3.3, 0.4, 0.1, 0.8, 11.0),
                
                // 爵士队首发五人
                createPlayer("Utah Jazz", "Keyonte George", 75, 27.0, 0.390, 0.339, 0.773, 13.0, 2.8, 4.4, 0.6, 0.1, 2.1, 13.0),
                createPlayer("Utah Jazz", "John Collins", 64, 26.4, 0.534, 0.371, 0.804, 15.1, 8.5, 1.1, 0.6, 0.6, 1.4, 15.1),
                
                // 火箭队首发五人
                createPlayer("Houston Rockets", "Dillon Brooks", 72, 30.3, 0.426, 0.396, 0.803, 12.7, 3.4, 1.7, 0.9, 0.1, 1.4, 12.7),
                createPlayer("Houston Rockets", "Jabari Smith Jr.", 76, 31.8, 0.456, 0.361, 0.785, 13.7, 8.1, 1.6, 0.7, 0.8, 1.3, 13.7),
                
                // 马刺队首发五人
                createPlayer("San Antonio Spurs", "Tre Jones", 76, 29.2, 0.456, 0.333, 0.789, 9.6, 3.8, 6.6, 1.3, 0.1, 1.5, 9.6),
                createPlayer("San Antonio Spurs", "Keldon Johnson", 75, 32.6, 0.455, 0.352, 0.756, 15.7, 5.5, 2.8, 0.8, 0.2, 1.6, 15.7),
                
                // 开拓者队首发五人
                createPlayer("Portland Trail Blazers", "Shaedon Sharpe", 32, 33.1, 0.407, 0.336, 0.714, 15.9, 5.0, 2.9, 0.8, 0.3, 1.8, 15.9),
                createPlayer("Portland Trail Blazers", "Jerami Grant", 54, 33.0, 0.407, 0.402, 0.818, 21.0, 3.5, 2.8, 0.8, 0.8, 1.8, 21.0),
                
                // 黄蜂队首发五人
                createPlayer("Charlotte Hornets", "Cody Martin", 28, 19.6, 0.386, 0.200, 0.667, 3.6, 2.7, 1.6, 0.5, 0.2, 0.8, 3.6),
                createPlayer("Charlotte Hornets", "Mark Williams", 19, 26.7, 0.637, 0.000, 0.636, 12.7, 9.7, 1.2, 0.4, 1.1, 1.4, 12.7),
                
                // 魔术队首发五人
                createPlayer("Orlando Magic", "Markelle Fultz", 21, 26.6, 0.471, 0.000, 0.700, 8.6, 3.8, 4.1, 1.0, 0.3, 1.5, 8.6),
                createPlayer("Orlando Magic", "Wendell Carter Jr.", 55, 25.3, 0.525, 0.329, 0.691, 11.8, 8.7, 2.1, 0.6, 0.5, 1.4, 11.8),
                
                // 活塞队首发五人
                createPlayer("Detroit Pistons", "Marcus Sasser", 60, 16.2, 0.436, 0.336, 0.857, 8.3, 1.6, 3.3, 0.6, 0.1, 1.1, 8.3),
                createPlayer("Detroit Pistons", "Isaiah Stewart", 50, 21.4, 0.471, 0.377, 0.743, 11.0, 6.8, 1.4, 0.4, 0.8, 1.1, 11.0),
                
                // 奇才队首发五人
                createPlayer("Washington Wizards", "Corey Kispert", 74, 22.6, 0.462, 0.385, 0.833, 8.9, 2.1, 1.1, 0.4, 0.2, 0.6, 8.9),
                createPlayer("Washington Wizards", "Daniel Gafford", 57, 26.5, 0.690, 0.000, 0.721, 11.0, 8.0, 1.5, 0.6, 1.6, 1.2, 11.0),
                
                // 篮网队首发五人
                createPlayer("Brooklyn Nets", "Dennis Smith Jr.", 56, 18.6, 0.434, 0.296, 0.667, 6.6, 2.9, 3.6, 1.2, 0.3, 1.2, 6.6),
                createPlayer("Brooklyn Nets", "Nicolas Claxton", 71, 29.8, 0.628, 0.200, 0.549, 11.8, 9.9, 1.9, 0.9, 2.1, 1.4, 11.8),
                
                // 尼克斯队首发五人
                createPlayer("New York Knicks", "OG Anunoby", 23, 35.6, 0.487, 0.387, 0.750, 14.1, 4.4, 1.7, 1.7, 0.5, 1.1, 14.1),
                createPlayer("New York Knicks", "Isaiah Hartenstein", 75, 25.3, 0.644, 0.000, 0.707, 7.8, 8.3, 2.5, 0.8, 1.1, 1.2, 7.8),
                
                // 公牛队首发五人
                createPlayer("Chicago Bulls", "Ayo Dosunmu", 76, 29.7, 0.492, 0.402, 0.797, 12.2, 2.8, 3.2, 0.8, 0.3, 1.2, 12.2),
                createPlayer("Chicago Bulls", "Nikola Vučević", 82, 34.3, 0.484, 0.294, 0.845, 18.0, 10.5, 3.3, 0.7, 0.8, 1.8, 18.0),
                
                // 骑士队首发五人
                createPlayer("Cleveland Cavaliers", "Max Strus", 72, 31.1, 0.410, 0.350, 0.795, 12.2, 4.7, 4.0, 0.6, 0.3, 1.1, 12.2),
                createPlayer("Cleveland Cavaliers", "Jarrett Allen", 77, 30.8, 0.630, 0.000, 0.742, 16.5, 10.5, 2.6, 0.7, 1.1, 1.5, 16.5),
                
                // 老鹰队首发五人
                createPlayer("Atlanta Hawks", "Bogdan Bogdanović", 79, 28.3, 0.427, 0.371, 0.836, 16.9, 3.4, 3.1, 1.0, 0.2, 1.4, 16.9),
                createPlayer("Atlanta Hawks", "Clint Capela", 73, 24.4, 0.573, 0.000, 0.636, 11.5, 10.6, 1.2, 0.6, 1.5, 1.2, 11.5),
                
                // 猛龙队首发五人
                createPlayer("Toronto Raptors", "Gradey Dick", 60, 16.6, 0.424, 0.365, 0.875, 6.9, 1.8, 1.1, 0.4, 0.1, 0.6, 6.9),
                createPlayer("Toronto Raptors", "Kelly Olynyk", 68, 20.1, 0.494, 0.392, 0.833, 8.1, 4.9, 3.8, 0.6, 0.4, 1.2, 8.1),
                
                // 步行者队首发五人
                createPlayer("Indiana Pacers", "Aaron Nesmith", 75, 24.9, 0.442, 0.415, 0.833, 8.9, 3.1, 1.0, 0.6, 0.4, 0.7, 8.9),
                createPlayer("Indiana Pacers", "Obi Toppin", 73, 21.1, 0.567, 0.404, 0.714, 10.3, 3.9, 1.4, 0.4, 0.3, 0.8, 10.3)
            );
            
            // 保存首发五人数据
            playerRepository.saveAll(startingFive);
            System.out.println("成功添加 " + startingFive.size() + " 个首发五人球员数据！");
        } else {
            System.out.println("数据库中已有完整的首发五人数据，跳过添加。");
        }
    }
    
    private Player createPlayer(String team, String name, int gp, double minutes, double fgp, double fg3p, double ftp, double eff, double reb, double ast, double stl, double blk, double tov, double pts) {
        Player player = new Player();
        player.setTeam(team);
        player.setName(name);
        player.setGp(gp);
        player.setMinutes(minutes);
        player.setFgp(fgp);
        player.setFg3p(fg3p);
        player.setFtp(ftp);
        player.setEff(eff);
        player.setReb(reb);
        player.setAst(ast);
        player.setStl(stl);
        player.setBlk(blk);
        player.setTov(tov);
        player.setPts(pts);
        return player;
    }
} 