import { createPlayer } from './api';

// 示例球员数据
const SAMPLE_PLAYERS = [
  {
    team: "Los Angeles Lakers",
    name: "LeBron James",
    gp: 82,
    minutes: 35.2,
    fgp: 0.520,
    fg3p: 0.350,
    ftp: 0.750,
    eff: 25.8,
    reb: 7.5,
    ast: 7.3,
    stl: 1.2,
    blk: 0.6,
    tov: 3.1,
    pts: 25.0
  },
  {
    team: "Golden State Warriors",
    name: "Stephen Curry",
    gp: 82,
    minutes: 34.2,
    fgp: 0.480,
    fg3p: 0.420,
    ftp: 0.920,
    eff: 24.8,
    reb: 4.5,
    ast: 6.3,
    stl: 1.1,
    blk: 0.2,
    tov: 3.2,
    pts: 29.4
  },
  {
    team: "Boston Celtics",
    name: "Jayson Tatum",
    gp: 82,
    minutes: 36.9,
    fgp: 0.465,
    fg3p: 0.350,
    ftp: 0.855,
    eff: 22.8,
    reb: 8.1,
    ast: 4.6,
    stl: 1.1,
    blk: 0.7,
    tov: 2.6,
    pts: 26.9
  },
  {
    team: "Milwaukee Bucks",
    name: "Giannis Antetokounmpo",
    gp: 82,
    minutes: 32.1,
    fgp: 0.553,
    fg3p: 0.275,
    ftp: 0.685,
    eff: 28.3,
    reb: 11.8,
    ast: 5.7,
    stl: 1.0,
    blk: 1.3,
    tov: 3.4,
    pts: 31.1
  },
  {
    team: "Dallas Mavericks",
    name: "Luka Dončić",
    gp: 82,
    minutes: 36.2,
    fgp: 0.490,
    fg3p: 0.340,
    ftp: 0.742,
    eff: 26.7,
    reb: 8.0,
    ast: 8.6,
    stl: 1.4,
    blk: 0.5,
    tov: 3.7,
    pts: 27.1
  },
  {
    team: "Denver Nuggets",
    name: "Nikola Jokić",
    gp: 82,
    minutes: 33.7,
    fgp: 0.632,
    fg3p: 0.383,
    ftp: 0.822,
    eff: 31.5,
    reb: 11.8,
    ast: 9.8,
    stl: 1.3,
    blk: 0.7,
    tov: 3.6,
    pts: 24.5
  },
  {
    team: "Phoenix Suns",
    name: "Devin Booker",
    gp: 82,
    minutes: 34.6,
    fgp: 0.494,
    fg3p: 0.361,
    ftp: 0.855,
    eff: 23.2,
    reb: 4.5,
    ast: 5.5,
    stl: 1.0,
    blk: 0.3,
    tov: 2.8,
    pts: 27.8
  },
  {
    team: "Philadelphia 76ers",
    name: "Joel Embiid",
    gp: 82,
    minutes: 34.6,
    fgp: 0.548,
    fg3p: 0.330,
    ftp: 0.857,
    eff: 29.8,
    reb: 11.3,
    ast: 3.4,
    stl: 1.0,
    blk: 1.7,
    tov: 3.4,
    pts: 30.6
  }
];

// 初始化示例数据
export const initializeSampleData = async () => {
  try {
    // 检查是否已经有数据
    const response = await fetch('http://localhost:8080/api/players');
    const existingPlayers = await response.json();
    
    // 如果没有数据，添加示例数据
    if (existingPlayers.length === 0) {
      console.log('正在初始化示例球员数据...');
      
      for (const player of SAMPLE_PLAYERS) {
        try {
          await createPlayer(player);
        } catch (error) {
          console.error(`添加球员 ${player.name} 失败:`, error);
        }
      }
      
      console.log('示例数据初始化完成！');
    }
  } catch (error) {
    console.error('初始化数据时出错:', error);
  }
};

export default initializeSampleData; 