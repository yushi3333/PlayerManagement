
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlayers } from './components/api';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGroup from './components/card/CardGroup';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/home/Layout';
import Home from './components/home/Home';
import Player from './components/player/Player';
import Dashboard from './components/dashboard/Dashboard';
import TeamStats from './components/team/TeamStats';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { initializeSampleData } from './components/DataInitializer';

// NBA Team data with logos and colors
const NBA_TEAMS = {
  'Atlanta Hawks': {
    logo: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
    color: '#E03A3E',
    city: 'Atlanta'
  },
  'Boston Celtics': {
    logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
    color: '#007A33',
    city: 'Boston'
  },
  'Brooklyn Nets': {
    logo: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
    color: '#000000',
    city: 'Brooklyn'
  },
  'Charlotte Hornets': {
    logo: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
    color: '#1D1160',
    city: 'Charlotte'
  },
  'Chicago Bulls': {
    logo: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
    color: '#CE1141',
    city: 'Chicago'
  },
  'Cleveland Cavaliers': {
    logo: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg',
    color: '#860038',
    city: 'Cleveland'
  },
  'Dallas Mavericks': {
    logo: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
    color: '#00538C',
    city: 'Dallas'
  },
  'Denver Nuggets': {
    logo: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
    color: '#0E2240',
    city: 'Denver'
  },
  'Detroit Pistons': {
    logo: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
    color: '#C8102E',
    city: 'Detroit'
  },
  'Golden State Warriors': {
    logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    color: '#1D428A',
    city: 'Golden State'
  },
  'Houston Rockets': {
    logo: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
    color: '#CE1141',
    city: 'Houston'
  },
  'Indiana Pacers': {
    logo: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
    color: '#002D62',
    city: 'Indiana'
  },
  'LA Clippers': {
    logo: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
    color: '#C8102E',
    city: 'LA'
  },
  'Los Angeles Lakers': {
    logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
    color: '#552583',
    city: 'Los Angeles'
  },
  'Memphis Grizzlies': {
    logo: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg',
    color: '#5D76A9',
    city: 'Memphis'
  },
  'Miami Heat': {
    logo: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
    color: '#98002E',
    city: 'Miami'
  },
  'Milwaukee Bucks': {
    logo: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
    color: '#00471B',
    city: 'Milwaukee'
  },
  'Minnesota Timberwolves': {
    logo: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
    color: '#0C2340',
    city: 'Minnesota'
  },
  'New Orleans Pelicans': {
    logo: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
    color: '#0C2340',
    city: 'New Orleans'
  },
  'New York Knicks': {
    logo: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
    color: '#006BB6',
    city: 'New York'
  },
  'Oklahoma City Thunder': {
    logo: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
    color: '#007AC1',
    city: 'Oklahoma City'
  },
  'Orlando Magic': {
    logo: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
    color: '#0077C0',
    city: 'Orlando'
  },
  'Philadelphia 76ers': {
    logo: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
    color: '#006BB6',
    city: 'Philadelphia'
  },
  'Phoenix Suns': {
    logo: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
    color: '#1D1160',
    city: 'Phoenix'
  },
  'Portland Trail Blazers': {
    logo: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg',
    color: '#E03A3E',
    city: 'Portland'
  },
  'Sacramento Kings': {
    logo: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
    color: '#5A2D81',
    city: 'Sacramento'
  },
  'San Antonio Spurs': {
    logo: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
    color: '#C8102E',
    city: 'San Antonio'
  },
  'Toronto Raptors': {
    logo: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
    color: '#CE1141',
    city: 'Toronto'
  },
  'Utah Jazz': {
    logo: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg',
    color: '#002B5C',
    city: 'Utah'
  },
  'Washington Wizards': {
    logo: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
    color: '#002B5C',
    city: 'Washington'
  }
};

function App() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalPlayers: 0,
    avgPoints: 0,
    avgRebounds: 0,
    avgAssists: 0
  });

  // 检查用户登录状态
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = players.filter((player) => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    if (team === 'All Teams') {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter((player) => player.team === team);
      setFilteredPlayers(filtered);
    }
    navigate('/players');
  };

  const calculateStats = (playersData) => {
    if (playersData.length === 0) return;
    
    const totalPlayers = playersData.length;
    const avgPoints = playersData.reduce((sum, player) => sum + player.pts, 0) / totalPlayers;
    const avgRebounds = playersData.reduce((sum, player) => sum + player.reb, 0) / totalPlayers;
    const avgAssists = playersData.reduce((sum, player) => sum + player.ast, 0) / totalPlayers;

    setStats({
      totalPlayers,
      avgPoints: Math.round(avgPoints * 10) / 10,
      avgRebounds: Math.round(avgRebounds * 10) / 10,
      avgAssists: Math.round(avgAssists * 10) / 10
    });
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await getPlayers();
        setPlayers(data);
        setFilteredPlayers(data);
        calculateStats(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    // 初始化示例数据并获取球员数据
    const initializeData = async () => {
      try {
        await initializeSampleData();
        await fetchPlayers();
      } catch (error) {
        console.error('Error initializing data:', error);
        await fetchPlayers(); // 即使初始化失败也要获取现有数据
      }
    };

    initializeData();
  }, []);

  return (
    <div className="App">
      <Header 
        onSearch={handleSearch} 
        players={players} 
        onTeamSelect={handleTeamSelect}
        selectedTeam={selectedTeam}
        searchTerm={searchTerm}
        teams={NBA_TEAMS}
        user={user}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home teams={NBA_TEAMS} stats={stats} />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard players={players} teams={NBA_TEAMS} stats={stats} />} />
        <Route path='/players' element={<CardGroup players={filteredPlayers} teams={NBA_TEAMS} loading={loading} />} />
        <Route path='/player' element={<Player />} />
        <Route path='/team-stats' element={<TeamStats players={players} teams={NBA_TEAMS} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
