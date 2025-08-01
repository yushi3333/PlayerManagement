# NBA球员管理系统 - 组件详细实现

## 📋 目录
- [Dashboard组件](#dashboard组件)
- [Home组件](#home组件)
- [Layout组件](#layout组件)
- [Player组件](#player组件)
- [TeamStats组件](#teamstats组件)
- [样式文件](#样式文件)

---

## 📊 Dashboard组件

### Dashboard.js
```jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faBasketballBall } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ players, teams, stats }) => {
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [sortField, setSortField] = useState('pts');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...filteredPlayers].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });
    setFilteredPlayers(sorted);
  };

  const handleTeamFilter = (team) => {
    setSelectedTeam(team);
    if (team === 'All Teams') {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player => player.team === team);
      setFilteredPlayers(filtered);
    }
  };

  const getTeamColor = (teamName) => {
    const team = Object.values(teams).find(t => t.city === teamName || t.name === teamName);
    return team ? team.color : '#6c757d';
  };

  return (
    <Container fluid className="mt-4">
      {/* 统计卡片 */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="2x" className="mb-2" />
              <Card.Title>Total Players</Card.Title>
              <Card.Text className="h3">{stats.totalPlayers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-2" />
              <Card.Title>Avg Points</Card.Title>
              <Card.Text className="h3">{stats.avgPoints}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-warning text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faBasketballBall} size="2x" className="mb-2" />
              <Card.Title>Avg Rebounds</Card.Title>
              <Card.Text className="h3">{stats.avgRebounds}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-2" />
              <Card.Title>Avg Assists</Card.Title>
              <Card.Text className="h3">{stats.avgAssists}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 筛选器 */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Team:</Form.Label>
            <Form.Select 
              value={selectedTeam} 
              onChange={(e) => handleTeamFilter(e.target.value)}
            >
              <option value="All Teams">All Teams</option>
              {Object.keys(teams).map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* 球员表格 */}
      <Card>
        <Card.Header>
          <h4>Player Statistics</h4>
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Player</th>
                <th>Team</th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('pts')}
                >
                  Points {sortField === 'pts' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('reb')}
                >
                  Rebounds {sortField === 'reb' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('ast')}
                >
                  Assists {sortField === 'ast' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Games</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.slice(0, 20).map((player) => (
                <tr key={player.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="me-2"
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: getTeamColor(player.team),
                          borderRadius: '50%'
                        }}
                      ></div>
                      {player.name}
                    </div>
                  </td>
                  <td>{player.team}</td>
                  <td>{player.pts}</td>
                  <td>{player.reb}</td>
                  <td>{player.ast}</td>
                  <td>{player.gp}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
```

### Dashboard.css
```css
.dashboard-card {
  transition: transform 0.2s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.sortable-header {
  cursor: pointer;
  user-select: none;
}

.sortable-header:hover {
  background-color: #f8f9fa;
}

.team-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

.stats-card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stats-card .card-body {
  padding: 1.5rem;
}

.stats-icon {
  opacity: 0.8;
}
```

---

## 🏠 Home组件

### Home.js
```jsx
import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';

const Home = ({ teams, stats }) => {
  const featuredTeams = Object.keys(teams).slice(0, 6);

  return (
    <Container fluid className="mt-4">
      {/* 欢迎横幅 */}
      <Row className="mb-4">
        <Col>
          <Card className="bg-gradient text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Card.Body className="text-center py-5">
              <FontAwesomeIcon icon={faBasketballBall} size="3x" className="mb-3" />
              <Card.Title className="h2">Welcome to NBA Player Management</Card.Title>
              <Card.Text className="h5">
                Explore comprehensive statistics and insights for NBA players and teams
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 统计概览 */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary mb-3" />
              <Card.Title>Total Players</Card.Title>
              <Card.Text className="h2 text-primary">{stats.totalPlayers}</Card.Text>
              <Card.Text className="text-muted">Active NBA players</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faChartLine} size="2x" className="text-success mb-3" />
              <Card.Title>Average Points</Card.Title>
              <Card.Text className="h2 text-success">{stats.avgPoints}</Card.Text>
              <Card.Text className="text-muted">Points per game</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faBasketballBall} size="2x" className="text-warning mb-3" />
              <Card.Title>Teams</Card.Title>
              <Card.Text className="h2 text-warning">{Object.keys(teams).length}</Card.Text>
              <Card.Text className="text-muted">NBA teams</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 特色球队轮播 */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>Featured Teams</h4>
            </Card.Header>
            <Card.Body>
              <Carousel>
                {chunk(featuredTeams, 3).map((teamGroup, index) => (
                  <Carousel.Item key={index}>
                    <Row>
                      {teamGroup.map(teamName => (
                        <Col md={4} key={teamName}>
                          <Card className="text-center team-card">
                            <Card.Body>
                              <img 
                                src={teams[teamName].logo} 
                                alt={teamName}
                                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                                className="mb-3"
                              />
                              <Card.Title>{teamName}</Card.Title>
                              <Card.Text className="text-muted">{teams[teamName].city}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 快速导航 */}
      <Row>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faUsers} size="3x" className="text-primary mb-3" />
              <Card.Title>Player Directory</Card.Title>
              <Card.Text>
                Browse through all NBA players with detailed statistics and performance metrics.
              </Card.Text>
              <a href="/players" className="btn btn-primary">View Players</a>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faChartLine} size="3x" className="text-success mb-3" />
              <Card.Title>Analytics Dashboard</Card.Title>
              <Card.Text>
                Explore comprehensive analytics and insights about player and team performance.
              </Card.Text>
              <a href="/dashboard" className="btn btn-success">View Dashboard</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// 辅助函数：将数组分块
const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export default Home;
```

### Home.css
```css
.home-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

.team-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e9ecef;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-3px);
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
}

.carousel-indicators {
  bottom: -50px;
}

.carousel-indicators button {
  background-color: #6c757d;
}
```

---

## 🏗 Layout组件

### Layout.js
```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <div className="layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

---

## 👤 Player组件

### Player.js
```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getPlayer } from '../api';

const Player = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const data = await getPlayer(id);
        setPlayer(data);
      } catch (err) {
        setError('Failed to load player data');
        console.error('Error fetching player:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayer();
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!player) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <Alert.Heading>Player Not Found</Alert.Heading>
          <p>The requested player could not be found.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faBasketballBall} className="me-2" />
                <h4 className="mb-0">Player Details</h4>
              </div>
              <a href="/players" className="btn btn-outline-secondary btn-sm">
                <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                Back to Players
              </a>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h3>{player.name}</h3>
                  <p className="text-muted">Team: {player.team}</p>
                  
                  <div className="mt-4">
                    <h5>Basic Information</h5>
                    <ul className="list-unstyled">
                      <li><strong>Games Played:</strong> {player.gp}</li>
                      <li><strong>Minutes per Game:</strong> {player.minutes}</li>
                      <li><strong>Field Goal %:</strong> {(player.fgp * 100).toFixed(1)}%</li>
                      <li><strong>3-Point %:</strong> {(player.fg3p * 100).toFixed(1)}%</li>
                      <li><strong>Free Throw %:</strong> {(player.ftp * 100).toFixed(1)}%</li>
                    </ul>
                  </div>
                </Col>
                
                <Col md={6}>
                  <h5>Performance Statistics</h5>
                  <div className="row">
                    <div className="col-6">
                      <div className="stat-card text-center p-3 mb-3">
                        <div className="stat-value text-primary">{player.pts}</div>
                        <div className="stat-label">Points</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="stat-card text-center p-3 mb-3">
                        <div className="stat-value text-success">{player.reb}</div>
                        <div className="stat-label">Rebounds</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="stat-card text-center p-3 mb-3">
                        <div className="stat-value text-warning">{player.ast}</div>
                        <div className="stat-label">Assists</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="stat-card text-center p-3 mb-3">
                        <div className="stat-value text-info">{player.stl}</div>
                        <div className="stat-label">Steals</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h6>Additional Stats</h6>
                    <ul className="list-unstyled">
                      <li><strong>Blocks:</strong> {player.blk}</li>
                      <li><strong>Turnovers:</strong> {player.tov}</li>
                      <li><strong>Efficiency:</strong> {player.eff}</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Player;
```

---

## 📈 TeamStats组件

### TeamStats.js
```jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faChartBar } from '@fortawesome/free-solid-svg-icons';

const TeamStats = ({ players, teams }) => {
  const [teamStats, setTeamStats] = useState({});
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [sortField, setSortField] = useState('avgPoints');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    calculateTeamStats();
  }, [players]);

  const calculateTeamStats = () => {
    const stats = {};
    
    Object.keys(teams).forEach(teamName => {
      const teamPlayers = players.filter(player => player.team === teamName);
      
      if (teamPlayers.length > 0) {
        const totalPoints = teamPlayers.reduce((sum, player) => sum + player.pts, 0);
        const totalRebounds = teamPlayers.reduce((sum, player) => sum + player.reb, 0);
        const totalAssists = teamPlayers.reduce((sum, player) => sum + player.ast, 0);
        const totalGames = teamPlayers.reduce((sum, player) => sum + player.gp, 0);
        
        stats[teamName] = {
          playerCount: teamPlayers.length,
          avgPoints: (totalPoints / teamPlayers.length).toFixed(1),
          avgRebounds: (totalRebounds / teamPlayers.length).toFixed(1),
          avgAssists: (totalAssists / teamPlayers.length).toFixed(1),
          totalGames: totalGames,
          teamColor: teams[teamName].color,
          logo: teams[teamName].logo
        };
      }
    });
    
    setTeamStats(stats);
  };

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedTeams = Object.keys(teamStats).sort((a, b) => {
    const aValue = parseFloat(teamStats[a][sortField]);
    const bValue = parseFloat(teamStats[b][sortField]);
    
    if (sortDirection === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  return (
    <Container fluid className="mt-4">
      {/* 统计概览 */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faBasketballBall} size="2x" className="mb-2" />
              <Card.Title>Total Teams</Card.Title>
              <Card.Text className="h3">{Object.keys(teamStats).length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-2" />
              <Card.Title>Total Players</Card.Title>
              <Card.Text className="h3">
                {Object.values(teamStats).reduce((sum, team) => sum + team.playerCount, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-warning text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-2" />
              <Card.Title>Avg Team Size</Card.Title>
              <Card.Text className="h3">
                {(Object.values(teamStats).reduce((sum, team) => sum + team.playerCount, 0) / Object.keys(teamStats).length).toFixed(1)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-2" />
              <Card.Title>Total Games</Card.Title>
              <Card.Text className="h3">
                {Object.values(teamStats).reduce((sum, team) => sum + team.totalGames, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 球队筛选 */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Team:</Form.Label>
            <Form.Select 
              value={selectedTeam} 
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="All Teams">All Teams</option>
              {Object.keys(teams).map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* 球队统计表格 */}
      <Card>
        <Card.Header>
          <h4>Team Statistics</h4>
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Team</th>
                <th>Players</th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('avgPoints')}
                >
                  Avg Points {sortField === 'avgPoints' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('avgRebounds')}
                >
                  Avg Rebounds {sortField === 'avgRebounds' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('avgAssists')}
                >
                  Avg Assists {sortField === 'avgAssists' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Total Games</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((teamName) => {
                const team = teamStats[teamName];
                return (
                  <tr key={teamName}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={team.logo} 
                          alt={teamName}
                          style={{ width: '30px', height: '30px', marginRight: '10px' }}
                        />
                        <span>{teamName}</span>
                      </div>
                    </td>
                    <td>{team.playerCount}</td>
                    <td>{team.avgPoints}</td>
                    <td>{team.avgRebounds}</td>
                    <td>{team.avgAssists}</td>
                    <td>{team.totalGames}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TeamStats;
```

---

## 🎨 样式文件

### App.css
```css
.App {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 加载动画 */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

/* 卡片悬停效果 */
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 统计卡片样式 */
.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 15px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}

/* 表格样式 */
.table th {
  border-top: none;
  font-weight: 600;
  color: #495057;
}

.table td {
  vertical-align: middle;
}

/* 按钮样式 */
.btn {
  border-radius: 6px;
  font-weight: 500;
}

.btn-primary {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border: none;
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  border: none;
}

/* 导航栏样式 */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 600;
}

/* 表单样式 */
.form-control {
  border-radius: 6px;
  border: 1px solid #ced4da;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* 下拉菜单样式 */
.dropdown-menu {
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}
```

### index.css
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* 全局样式重置 */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

/* 链接样式 */
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
}

/* 工具类 */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shadow-custom {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.border-radius-custom {
  border-radius: 10px;
}

/* 动画类 */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* 响应式工具类 */
@media (max-width: 576px) {
  .d-sm-none {
    display: none !important;
  }
}

@media (min-width: 576px) {
  .d-sm-block {
    display: block !important;
  }
}
```

---

## 📝 组件使用说明

### 组件导入
```jsx
// 在App.js中导入所有组件
import Header from './components/header';
import CardGroup from './components/card/CardGroup';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import Player from './components/player/Player';
import TeamStats from './components/team/TeamStats';
```

### 组件Props
每个组件都接受特定的props：

- **Header**: `onSearch`, `players`, `onTeamSelect`, `selectedTeam`, `searchTerm`, `teams`
- **CardGroup**: `players`, `teams`, `loading`
- **Dashboard**: `players`, `teams`, `stats`
- **Home**: `teams`, `stats`
- **Player**: 通过URL参数获取player ID
- **TeamStats**: `players`, `teams`

### 样式应用
确保在App.js中导入所有必要的样式文件：
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
```

---

*最后更新: 2025年8月1日*
*版本: 1.0.0* 