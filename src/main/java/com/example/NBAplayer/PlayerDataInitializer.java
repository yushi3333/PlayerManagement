package com.example.NBAplayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@Order(1)
public class PlayerDataInitializer implements CommandLineRunner {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public void run(String... args) throws Exception {
        // 检查是否已有球员数据
        if (playerRepository.count() == 0) {
            System.out.println("正在初始化球员数据...");
            
            // 创建球员数据列表 - 每支球队首发五人
            List<Player> players = Arrays.asList(
                // 湖人队首发五人
                createPlayer("Los Angeles Lakers", "LeBron James", 82, 35.2, 0.520, 0.350, 0.750, 25.8, 7.5, 7.3, 1.2, 0.6, 3.1, 25.0),
                createPlayer("Los Angeles Lakers", "Anthony Davis", 76, 34.0, 0.553, 0.257, 0.784, 24.7, 12.5, 3.7, 1.1, 2.4, 2.2, 24.7),
                createPlayer("Los Angeles Lakers", "D'Angelo Russell", 71, 32.5, 0.415, 0.386, 0.829, 18.0, 3.1, 6.1, 0.9, 0.3, 2.1, 18.0),
                createPlayer("Los Angeles Lakers", "Austin Reaves", 82, 32.1, 0.486, 0.367, 0.864, 15.9, 4.3, 5.5, 0.8, 0.3, 1.8, 15.9),
                createPlayer("Los Angeles Lakers", "Rui Hachimura", 68, 26.8, 0.534, 0.420, 0.739, 11.2, 3.8, 1.2, 0.6, 0.4, 0.8, 11.2),
                
                // 勇士队首发五人
                createPlayer("Golden State Warriors", "Stephen Curry", 82, 34.2, 0.480, 0.420, 0.920, 24.8, 4.5, 6.3, 1.1, 0.2, 3.2, 29.4),
                createPlayer("Golden State Warriors", "Klay Thompson", 77, 29.8, 0.430, 0.387, 0.876, 17.9, 3.3, 2.1, 0.7, 0.4, 1.3, 17.9),
                createPlayer("Golden State Warriors", "Draymond Green", 73, 26.5, 0.527, 0.309, 0.719, 8.5, 7.2, 6.8, 0.8, 0.9, 2.8, 8.5),
                createPlayer("Golden State Warriors", "Andrew Wiggins", 71, 27.0, 0.452, 0.354, 0.752, 13.2, 4.5, 1.7, 0.6, 0.4, 1.2, 13.2),
                createPlayer("Golden State Warriors", "Kevon Looney", 74, 23.9, 0.634, 0.000, 0.619, 5.0, 5.6, 1.2, 0.4, 0.5, 0.8, 5.0),
                
                // 凯尔特人队
                createPlayer("Boston Celtics", "Jayson Tatum", 82, 36.9, 0.465, 0.350, 0.855, 22.8, 8.1, 4.6, 1.1, 0.7, 2.6, 26.9),
                createPlayer("Boston Celtics", "Jaylen Brown", 80, 33.5, 0.494, 0.335, 0.765, 19.9, 5.2, 3.5, 1.1, 0.3, 2.4, 23.5),
                createPlayer("Boston Celtics", "Kristaps Porziņģis", 65, 29.6, 0.516, 0.376, 0.838, 20.1, 7.2, 2.0, 0.7, 1.9, 1.8, 20.1),
                
                // 雄鹿队
                createPlayer("Milwaukee Bucks", "Giannis Antetokounmpo", 82, 32.1, 0.553, 0.275, 0.685, 28.3, 11.8, 5.7, 1.0, 1.3, 3.4, 31.1),
                createPlayer("Milwaukee Bucks", "Damian Lillard", 78, 35.3, 0.424, 0.354, 0.920, 24.3, 4.4, 7.1, 0.9, 0.2, 2.8, 24.3),
                createPlayer("Milwaukee Bucks", "Brook Lopez", 79, 30.4, 0.486, 0.366, 0.820, 12.8, 5.0, 1.3, 0.5, 2.4, 1.2, 12.8),
                
                // 独行侠队
                createPlayer("Dallas Mavericks", "Luka Dončić", 82, 36.2, 0.490, 0.340, 0.742, 26.7, 8.0, 8.6, 1.4, 0.5, 3.7, 27.1),
                createPlayer("Dallas Mavericks", "Kyrie Irving", 58, 35.0, 0.494, 0.412, 0.905, 25.1, 5.0, 5.1, 1.1, 0.3, 2.1, 25.1),
                createPlayer("Dallas Mavericks", "Tim Hardaway Jr.", 79, 30.3, 0.407, 0.351, 0.850, 14.4, 3.5, 1.7, 0.7, 0.2, 1.0, 14.4),
                
                // 掘金队
                createPlayer("Denver Nuggets", "Nikola Jokić", 82, 33.7, 0.632, 0.383, 0.822, 31.5, 11.8, 9.8, 1.3, 0.7, 3.6, 24.5),
                createPlayer("Denver Nuggets", "Jamal Murray", 75, 31.5, 0.481, 0.421, 0.853, 21.2, 4.1, 6.5, 0.9, 0.3, 2.1, 21.2),
                createPlayer("Denver Nuggets", "Michael Porter Jr.", 81, 29.0, 0.484, 0.391, 0.800, 16.4, 7.0, 1.5, 0.6, 0.7, 1.2, 16.4),
                
                // 太阳队
                createPlayer("Phoenix Suns", "Devin Booker", 82, 34.6, 0.494, 0.361, 0.855, 23.2, 4.5, 5.5, 1.0, 0.3, 2.8, 27.8),
                createPlayer("Phoenix Suns", "Kevin Durant", 75, 37.2, 0.520, 0.415, 0.856, 26.8, 6.7, 5.0, 0.7, 1.2, 3.1, 26.8),
                createPlayer("Phoenix Suns", "Bradley Beal", 53, 32.6, 0.491, 0.430, 0.841, 18.2, 4.4, 5.0, 1.0, 0.4, 2.4, 18.2),
                
                // 76人队
                createPlayer("Philadelphia 76ers", "Joel Embiid", 82, 34.6, 0.548, 0.330, 0.857, 29.8, 11.3, 3.4, 1.0, 1.7, 3.4, 30.6),
                createPlayer("Philadelphia 76ers", "Tyrese Maxey", 82, 37.5, 0.460, 0.373, 0.868, 20.3, 3.7, 5.1, 1.0, 0.2, 1.6, 20.3),
                createPlayer("Philadelphia 76ers", "Tobias Harris", 82, 33.9, 0.487, 0.350, 0.876, 17.2, 6.5, 3.1, 0.8, 0.5, 1.4, 17.2),
                
                // 热火队
                createPlayer("Miami Heat", "Jimmy Butler", 60, 33.5, 0.497, 0.350, 0.856, 20.8, 5.3, 5.0, 1.8, 0.3, 1.8, 20.8),
                createPlayer("Miami Heat", "Bam Adebayo", 75, 34.8, 0.542, 0.000, 0.806, 19.3, 10.4, 3.9, 1.1, 0.9, 2.4, 19.3),
                createPlayer("Miami Heat", "Tyler Herro", 67, 33.5, 0.441, 0.392, 0.868, 20.1, 5.4, 4.2, 0.8, 0.2, 2.1, 20.1),
                
                // 快船队
                createPlayer("LA Clippers", "Kawhi Leonard", 68, 34.3, 0.512, 0.417, 0.871, 23.8, 6.1, 3.4, 1.7, 0.6, 1.5, 23.8),
                createPlayer("LA Clippers", "Paul George", 74, 33.8, 0.471, 0.371, 0.871, 22.6, 5.2, 3.5, 1.5, 0.4, 2.3, 22.6),
                createPlayer("LA Clippers", "James Harden", 72, 34.3, 0.428, 0.385, 0.877, 16.6, 5.1, 8.5, 1.1, 0.8, 2.4, 16.6),
                
                // 雷霆队
                createPlayer("Oklahoma City Thunder", "Shai Gilgeous-Alexander", 75, 34.0, 0.535, 0.351, 0.879, 30.1, 5.5, 6.2, 2.0, 0.9, 2.2, 30.1),
                createPlayer("Oklahoma City Thunder", "Jalen Williams", 82, 30.3, 0.540, 0.427, 0.813, 19.1, 4.0, 4.5, 1.1, 0.6, 1.8, 19.1),
                createPlayer("Oklahoma City Thunder", "Chet Holmgren", 82, 29.4, 0.530, 0.370, 0.797, 16.5, 7.9, 2.4, 0.6, 2.3, 1.9, 16.5),
                
                // 森林狼队
                createPlayer("Minnesota Timberwolves", "Anthony Edwards", 79, 35.1, 0.461, 0.357, 0.836, 25.9, 5.4, 5.1, 1.3, 0.5, 2.8, 25.9),
                createPlayer("Minnesota Timberwolves", "Karl-Anthony Towns", 62, 32.8, 0.502, 0.396, 0.876, 21.8, 8.3, 3.0, 0.7, 0.7, 2.6, 21.8),
                createPlayer("Minnesota Timberwolves", "Rudy Gobert", 76, 31.1, 0.650, 0.000, 0.636, 13.4, 12.9, 1.3, 0.7, 2.1, 1.5, 13.4),
                
                // 鹈鹕队
                createPlayer("New Orleans Pelicans", "Zion Williamson", 70, 31.5, 0.570, 0.333, 0.700, 22.5, 5.8, 5.0, 1.1, 0.6, 2.8, 22.5),
                createPlayer("New Orleans Pelicans", "Brandon Ingram", 64, 32.9, 0.488, 0.358, 0.801, 20.8, 5.1, 5.7, 0.8, 0.6, 2.4, 20.8),
                createPlayer("New Orleans Pelicans", "CJ McCollum", 66, 31.8, 0.452, 0.381, 0.793, 20.0, 4.3, 4.6, 0.8, 0.4, 1.8, 20.0),
                
                // 国王队
                createPlayer("Sacramento Kings", "De'Aaron Fox", 73, 35.9, 0.462, 0.370, 0.749, 24.6, 4.3, 6.0, 1.9, 0.4, 2.8, 24.6),
                createPlayer("Sacramento Kings", "Domantas Sabonis", 82, 34.6, 0.595, 0.371, 0.742, 19.1, 13.7, 8.2, 0.9, 0.6, 3.4, 19.1),
                createPlayer("Sacramento Kings", "Malik Monk", 72, 26.0, 0.443, 0.350, 0.829, 15.4, 2.9, 5.1, 0.6, 0.3, 1.8, 15.4),
                
                // 灰熊队
                createPlayer("Memphis Grizzlies", "Ja Morant", 9, 35.3, 0.474, 0.273, 0.810, 25.1, 5.6, 8.1, 1.0, 0.2, 3.3, 25.1),
                createPlayer("Memphis Grizzlies", "Desmond Bane", 42, 31.7, 0.460, 0.380, 0.860, 23.7, 4.4, 5.5, 0.9, 0.4, 2.0, 23.7),
                createPlayer("Memphis Grizzlies", "Jaren Jackson Jr.", 66, 28.4, 0.448, 0.359, 0.788, 18.6, 6.6, 1.6, 0.9, 1.6, 2.1, 18.6),
                
                // 爵士队
                createPlayer("Utah Jazz", "Lauri Markkanen", 55, 33.8, 0.480, 0.399, 0.899, 23.2, 8.2, 2.0, 0.9, 0.5, 1.8, 23.2),
                createPlayer("Utah Jazz", "Collin Sexton", 78, 23.9, 0.487, 0.391, 0.859, 18.7, 2.6, 4.9, 0.6, 0.1, 1.8, 18.7),
                createPlayer("Utah Jazz", "Jordan Clarkson", 81, 32.6, 0.418, 0.290, 0.892, 17.1, 3.4, 5.0, 0.6, 0.2, 2.0, 17.1),
                
                // 火箭队
                createPlayer("Houston Rockets", "Alperen Şengün", 63, 32.5, 0.537, 0.297, 0.695, 21.1, 9.3, 5.0, 1.2, 0.7, 2.6, 21.1),
                createPlayer("Houston Rockets", "Jalen Green", 82, 31.7, 0.419, 0.330, 0.804, 19.6, 3.8, 3.7, 0.8, 0.3, 2.3, 19.6),
                createPlayer("Houston Rockets", "Fred VanVleet", 73, 36.8, 0.402, 0.378, 0.854, 17.4, 3.8, 8.1, 1.4, 0.8, 1.6, 17.4),
                
                // 马刺队
                createPlayer("San Antonio Spurs", "Victor Wembanyama", 71, 29.7, 0.465, 0.325, 0.796, 21.4, 10.6, 3.9, 1.2, 3.6, 3.7, 21.4),
                createPlayer("San Antonio Spurs", "Devin Vassell", 68, 33.1, 0.430, 0.371, 0.800, 19.5, 3.8, 4.1, 1.1, 0.3, 1.5, 19.5),
                createPlayer("San Antonio Spurs", "Jeremy Sochan", 74, 29.6, 0.437, 0.315, 0.774, 11.6, 6.4, 3.4, 0.8, 0.5, 1.8, 11.6),
                
                // 开拓者队
                createPlayer("Portland Trail Blazers", "Anfernee Simons", 46, 33.5, 0.430, 0.385, 0.847, 22.6, 3.6, 5.5, 0.6, 0.2, 2.4, 22.6),
                createPlayer("Portland Trail Blazers", "Scoot Henderson", 62, 28.4, 0.385, 0.324, 0.816, 14.0, 3.1, 5.4, 0.7, 0.2, 3.2, 14.0),
                createPlayer("Portland Trail Blazers", "Deandre Ayton", 55, 31.9, 0.570, 0.000, 0.829, 16.7, 11.1, 1.6, 0.6, 0.8, 1.8, 16.7),
                
                // 黄蜂队
                createPlayer("Charlotte Hornets", "LaMelo Ball", 22, 31.9, 0.433, 0.358, 0.836, 23.9, 5.1, 8.0, 1.8, 0.3, 3.3, 23.9),
                createPlayer("Charlotte Hornets", "Miles Bridges", 69, 37.4, 0.462, 0.348, 0.852, 21.0, 7.3, 3.3, 1.0, 0.5, 2.1, 21.0),
                createPlayer("Charlotte Hornets", "Brandon Miller", 74, 32.2, 0.440, 0.374, 0.807, 17.3, 4.3, 2.4, 0.9, 0.6, 1.5, 17.3),
                
                // 魔术队
                createPlayer("Orlando Magic", "Paolo Banchero", 80, 33.8, 0.455, 0.335, 0.738, 20.0, 6.9, 5.3, 0.8, 0.5, 2.8, 20.0),
                createPlayer("Orlando Magic", "Franz Wagner", 72, 32.6, 0.481, 0.281, 0.842, 19.7, 5.3, 3.7, 1.1, 0.2, 1.8, 19.7),
                createPlayer("Orlando Magic", "Jalen Suggs", 75, 27.1, 0.471, 0.392, 0.753, 12.6, 3.1, 2.7, 1.4, 0.5, 1.5, 12.6),
                
                // 活塞队
                createPlayer("Detroit Pistons", "Cade Cunningham", 62, 33.5, 0.445, 0.359, 0.869, 22.7, 4.3, 7.5, 0.9, 0.4, 3.8, 22.7),
                createPlayer("Detroit Pistons", "Jaden Ivey", 74, 25.8, 0.416, 0.343, 0.747, 15.6, 3.4, 3.8, 0.7, 0.2, 2.0, 15.6),
                createPlayer("Detroit Pistons", "Ausar Thompson", 63, 25.3, 0.439, 0.186, 0.598, 8.8, 6.4, 1.9, 1.1, 0.9, 1.4, 8.8),
                
                // 奇才队
                createPlayer("Washington Wizards", "Kyle Kuzma", 70, 32.6, 0.460, 0.336, 0.773, 22.2, 6.6, 4.2, 0.5, 0.7, 2.8, 22.2),
                createPlayer("Washington Wizards", "Jordan Poole", 78, 29.3, 0.410, 0.326, 0.874, 17.1, 2.7, 4.5, 0.9, 0.3, 2.3, 17.1),
                createPlayer("Washington Wizards", "Tyus Jones", 66, 29.3, 0.433, 0.415, 0.813, 12.0, 2.7, 7.3, 1.1, 0.1, 1.0, 12.0),
                
                // 篮网队
                createPlayer("Brooklyn Nets", "Mikal Bridges", 82, 35.1, 0.457, 0.370, 0.814, 19.6, 4.5, 3.6, 1.0, 0.4, 1.6, 19.6),
                createPlayer("Brooklyn Nets", "Cameron Johnson", 58, 28.1, 0.445, 0.395, 0.791, 13.4, 4.3, 2.4, 0.8, 0.3, 1.0, 13.4),
                createPlayer("Brooklyn Nets", "Spencer Dinwiddie", 48, 30.7, 0.390, 0.328, 0.789, 12.6, 3.3, 6.0, 0.8, 0.2, 1.8, 12.6),
                
                // 尼克斯队
                createPlayer("New York Knicks", "Jalen Brunson", 77, 35.4, 0.479, 0.401, 0.847, 28.7, 3.6, 6.7, 0.9, 0.2, 2.2, 28.7),
                createPlayer("New York Knicks", "Julius Randle", 46, 35.4, 0.470, 0.311, 0.783, 24.0, 9.2, 5.0, 0.8, 0.3, 3.1, 24.0),
                createPlayer("New York Knicks", "Donte DiVincenzo", 81, 29.1, 0.440, 0.405, 0.747, 15.5, 3.7, 2.7, 1.3, 0.2, 1.1, 15.5),
                
                // 公牛队
                createPlayer("Chicago Bulls", "DeMar DeRozan", 79, 37.8, 0.480, 0.333, 0.853, 24.0, 4.3, 5.3, 1.1, 0.6, 2.0, 24.0),
                createPlayer("Chicago Bulls", "Zach LaVine", 25, 34.9, 0.454, 0.342, 0.854, 19.5, 5.2, 3.9, 0.8, 0.3, 2.3, 19.5),
                createPlayer("Chicago Bulls", "Coby White", 79, 36.5, 0.445, 0.376, 0.784, 19.1, 4.5, 5.1, 0.7, 0.2, 1.9, 19.1),
                
                // 骑士队
                createPlayer("Cleveland Cavaliers", "Donovan Mitchell", 55, 35.3, 0.461, 0.364, 0.866, 26.6, 5.1, 6.1, 1.8, 0.5, 2.8, 26.6),
                createPlayer("Cleveland Cavaliers", "Darius Garland", 57, 33.5, 0.441, 0.371, 0.836, 18.0, 2.7, 6.5, 1.3, 0.1, 2.4, 18.0),
                createPlayer("Cleveland Cavaliers", "Evan Mobley", 50, 31.6, 0.580, 0.217, 0.723, 15.7, 10.2, 2.8, 0.8, 1.4, 1.8, 15.7),
                
                // 老鹰队
                createPlayer("Atlanta Hawks", "Trae Young", 54, 36.0, 0.429, 0.371, 0.857, 25.7, 2.8, 10.8, 1.3, 0.2, 4.4, 25.7),
                createPlayer("Atlanta Hawks", "Dejounte Murray", 78, 35.7, 0.464, 0.361, 0.793, 22.5, 5.3, 6.4, 1.4, 0.3, 2.2, 22.5),
                createPlayer("Atlanta Hawks", "Jalen Johnson", 56, 28.4, 0.509, 0.359, 0.714, 16.0, 8.7, 3.6, 1.2, 0.8, 1.8, 16.0),
                
                // 猛龙队
                createPlayer("Toronto Raptors", "Scottie Barnes", 60, 34.9, 0.475, 0.281, 0.781, 19.9, 8.2, 6.1, 1.3, 1.5, 2.8, 19.9),
                createPlayer("Toronto Raptors", "RJ Barrett", 23, 31.9, 0.424, 0.320, 0.743, 18.2, 4.3, 3.0, 0.6, 0.2, 1.8, 18.2),
                createPlayer("Toronto Raptors", "Immanuel Quickley", 26, 32.4, 0.428, 0.391, 0.894, 18.6, 4.8, 6.8, 1.0, 0.1, 1.8, 18.6),
                
                // 步行者队
                createPlayer("Indiana Pacers", "Tyrese Haliburton", 69, 32.1, 0.477, 0.361, 0.855, 20.1, 3.9, 10.9, 1.2, 0.7, 2.5, 20.1),
                createPlayer("Indiana Pacers", "Pascal Siakam", 41, 32.6, 0.552, 0.374, 0.741, 21.3, 7.8, 3.7, 0.8, 0.3, 2.1, 21.3),
                createPlayer("Indiana Pacers", "Myles Turner", 77, 27.0, 0.527, 0.357, 0.773, 17.1, 6.9, 1.3, 0.5, 1.9, 1.4, 17.1)
            );
            
            // 保存所有球员数据
            playerRepository.saveAll(players);
            System.out.println("成功初始化 " + players.size() + " 个球员数据！");
        } else {
            System.out.println("数据库中已有球员数据，跳过初始化。");
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