import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBasketballBall, faChartLine, faStar, faUsers, faMedal, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import './TeamStats.css';

const TeamStats = ({ players, teams }) => {
  const [selectedMetric, setSelectedMetric] = useState('avgPoints');
  const [sortOrder, setSortOrder] = useState('desc');



  // Calculate team statistics
  const teamStats = useMemo(() => {
    if (!players.length) return [];

    const stats = {};
    
    // Initialize team stats
    Object.keys(teams).forEach(teamName => {
      stats[teamName] = {
        name: teamName,
        players: 0,
        totalPoints: 0,
        totalRebounds: 0,
        totalAssists: 0,
        totalSteals: 0,
        totalBlocks: 0,
        totalTurnovers: 0,
        totalEfficiency: 0,
        avgPoints: 0,
        avgRebounds: 0,
        avgAssists: 0,
        avgSteals: 0,
        avgBlocks: 0,
        avgTurnovers: 0,
        avgEfficiency: 0,
        bestPlayer: null,
        logo: teams[teamName]?.logo,
        color: teams[teamName]?.color
      };
    });

    // Calculate totals
    players.forEach(player => {
      const teamName = player.team;
      if (teamName && stats[teamName]) {
        stats[teamName].players++;
        stats[teamName].totalPoints += player.pts;
        stats[teamName].totalRebounds += player.reb;
        stats[teamName].totalAssists += player.ast;
        stats[teamName].totalSteals += player.stl;
        stats[teamName].totalBlocks += player.blk;
        stats[teamName].totalTurnovers += player.tov;
        stats[teamName].totalEfficiency += player.eff;

        // Track best player
        if (!stats[teamName].bestPlayer || player.pts > stats[teamName].bestPlayer.pts) {
          stats[teamName].bestPlayer = player;
        }
      }
    });

    // Calculate averages
    Object.values(stats).forEach(team => {
      if (team.players > 0) {
        team.avgPoints = (team.totalPoints / team.players).toFixed(1);
        team.avgRebounds = (team.totalRebounds / team.players).toFixed(1);
        team.avgAssists = (team.totalAssists / team.players).toFixed(1);
        team.avgSteals = (team.totalSteals / team.players).toFixed(1);
        team.avgBlocks = (team.totalBlocks / team.players).toFixed(1);
        team.avgTurnovers = (team.totalTurnovers / team.players).toFixed(1);
        team.avgEfficiency = (team.totalEfficiency / team.players).toFixed(1);
      }
    });

    return Object.values(stats).filter(team => team.players > 0);
  }, [players, teams]);

  // Sort teams by selected metric
  const sortedTeams = useMemo(() => {
    return [...teamStats].sort((a, b) => {
      const aValue = parseFloat(a[selectedMetric]);
      const bValue = parseFloat(b[selectedMetric]);
      
      if (sortOrder === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
  }, [teamStats, selectedMetric, sortOrder]);

  const getMetricLabel = (metric) => {
    const labels = {
      avgPoints: 'Average Points',
      avgRebounds: 'Average Rebounds',
      avgAssists: 'Average Assists',
      avgSteals: 'Average Steals',
      avgBlocks: 'Average Blocks',
      avgTurnovers: 'Average Turnovers',
      avgEfficiency: 'Average Efficiency',
      players: 'Player Count'
    };
    return labels[metric] || metric;
  };

  const getMetricIcon = (metric) => {
    const icons = {
      avgPoints: faChartLine,
      avgRebounds: faBasketballBall,
      avgAssists: faStar,
      avgSteals: faMedal,
      avgBlocks: faTrophy,
      avgTurnovers: faUsers,
      avgEfficiency: faTrophy,
      players: faUsers
    };
    return icons[metric] || faChartLine;
  };

  const getPerformanceColor = (value, maxValue) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    if (percentage >= 40) return '#fd7e14';
    return '#dc3545';
  };

  const TeamCard = ({ team, rank }) => {
    const metricValue = parseFloat(team[selectedMetric]);
    const maxValue = Math.max(...sortedTeams.map(t => parseFloat(t[selectedMetric])));
    const performanceColor = getPerformanceColor(metricValue, maxValue);

    return (
      <Col lg={6} xl={4} className="mb-4">
        <Card className="team-stat-card h-100">
          <div 
            className="card-header-team"
            style={{ background: `linear-gradient(135deg, ${team.color}20 0%, ${team.color}40 100%)` }}
          >
            <div className="team-header-info">
              <div className="rank-badge">
                <Badge 
                  bg={rank <= 3 ? 'warning' : 'secondary'}
                  className="rank-number"
                >
                  #{rank}
                </Badge>
              </div>
              <img 
                src={team.logo} 
                alt={team.name}
                className="team-logo-large"
              />
              <div className="team-info">
                <h5 className="team-name">{team.name}</h5>
                <Badge 
                  bg="secondary"
                  className="player-count-badge"
                  style={{ backgroundColor: team.color }}
                >
                  {team.players} Players
                </Badge>
              </div>
            </div>
          </div>

          <Card.Body className="team-card-body">
            <div className="metric-display">
              <div className="metric-header">
                <FontAwesomeIcon 
                  icon={getMetricIcon(selectedMetric)} 
                  className="metric-icon"
                  style={{ color: performanceColor }}
                />
                <span className="metric-label">{getMetricLabel(selectedMetric)}</span>
              </div>
              <div 
                className="metric-value"
                style={{ color: performanceColor }}
              >
                {team[selectedMetric]}
              </div>
            </div>

            <ProgressBar 
              now={(metricValue / maxValue) * 100} 
              className="team-progress"
              style={{ backgroundColor: team.color + '20' }}
            >
              <ProgressBar 
                variant="custom" 
                now={(metricValue / maxValue) * 100}
                style={{ backgroundColor: team.color }}
              />
            </ProgressBar>

            {team.bestPlayer && (
              <div className="best-player">
                <div className="best-player-label">Top Performer:</div>
                <div className="best-player-name">{team.bestPlayer.name}</div>
                <div className="best-player-stats">
                  {team.bestPlayer.pts} PTS • {team.bestPlayer.reb} REB • {team.bestPlayer.ast} AST
                </div>
              </div>
            )}

            <div className="team-stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total PTS</span>
                <span className="stat-value">{team.totalPoints}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total REB</span>
                <span className="stat-value">{team.totalRebounds}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total AST</span>
                <span className="stat-value">{team.totalAssists}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total STL</span>
                <span className="stat-value">{team.totalSteals}</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };



  if (!players || players.length === 0) {
    return (
      <Alert variant="info" className="no-data-alert">
        <Alert.Heading>No Data Available</Alert.Heading>
        <p>No player data is available to display team statistics.</p>
      </Alert>
    );
  }

  if (!teams || Object.keys(teams).length === 0) {
    return (
      <Alert variant="warning" className="no-data-alert">
        <Alert.Heading>No Team Data</Alert.Heading>
        <p>Team configuration data is missing.</p>
      </Alert>
    );
  }

  if (teamStats.length === 0) {
    return (
      <Alert variant="warning" className="no-data-alert">
        <Alert.Heading>No Team Statistics</Alert.Heading>
        <p>Unable to calculate team statistics. Please check the data.</p>
        <hr />
        <p><strong>Debug Info:</strong></p>
        <p>Players: {players.length}</p>
        <p>Teams: {Object.keys(teams).length}</p>
        <p>Sample player teams: {players.slice(0, 5).map(p => p.team).join(', ')}</p>
      </Alert>
    );
  }

  return (
    <div className="team-stats-container">
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h1 className="page-title">
                <FontAwesomeIcon icon={faTrophy} className="me-3" />
                Team Statistics
              </h1>
              <p className="page-subtitle">
                Comprehensive team performance analysis and rankings
              </p>
            </div>
          </Col>
        </Row>

        {/* Controls */}
        <Row className="mb-4">
          <Col>
            <Card className="controls-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="metric-selector">
                    <span className="selector-label me-3">Sort by:</span>
                    <Button
                      variant={selectedMetric === 'avgPoints' ? 'primary' : 'outline-primary'}
                      size="sm"
                      className="me-2 mb-2"
                      onClick={() => setSelectedMetric('avgPoints')}
                    >
                      <FontAwesomeIcon icon={faChartLine} className="me-1" />
                      Points
                    </Button>
                    <Button
                      variant={selectedMetric === 'avgRebounds' ? 'primary' : 'outline-primary'}
                      size="sm"
                      className="me-2 mb-2"
                      onClick={() => setSelectedMetric('avgRebounds')}
                    >
                      <FontAwesomeIcon icon={faBasketballBall} className="me-1" />
                      Rebounds
                    </Button>
                    <Button
                      variant={selectedMetric === 'avgAssists' ? 'primary' : 'outline-primary'}
                      size="sm"
                      className="me-2 mb-2"
                      onClick={() => setSelectedMetric('avgAssists')}
                    >
                      <FontAwesomeIcon icon={faStar} className="me-1" />
                      Assists
                    </Button>
                    <Button
                      variant={selectedMetric === 'avgEfficiency' ? 'primary' : 'outline-primary'}
                      size="sm"
                      className="me-2 mb-2"
                      onClick={() => setSelectedMetric('avgEfficiency')}
                    >
                      <FontAwesomeIcon icon={faTrophy} className="me-1" />
                      Efficiency
                    </Button>
                    <Button
                      variant={selectedMetric === 'players' ? 'primary' : 'outline-primary'}
                      size="sm"
                      className="mb-2"
                      onClick={() => setSelectedMetric('players')}
                    >
                      <FontAwesomeIcon icon={faUsers} className="me-1" />
                      Players
                    </Button>
                  </div>
                  <div className="sort-controls">
                    <Button
                      variant={sortOrder === 'desc' ? 'success' : 'outline-success'}
                      size="sm"
                      onClick={() => setSortOrder('desc')}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faSortDown} className="me-1" />
                      Desc
                    </Button>
                    <Button
                      variant={sortOrder === 'asc' ? 'success' : 'outline-success'}
                      size="sm"
                      onClick={() => setSortOrder('asc')}
                    >
                      <FontAwesomeIcon icon={faSortUp} className="me-1" />
                      Asc
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Cards */}
        <Row>
          {sortedTeams.map((team, index) => (
            <TeamCard key={team.name} team={team} rank={index + 1} />
          ))}
        </Row>

        {/* Summary Table */}
        <Row className="mt-5">
          <Col>
            <Card className="summary-table-card">
              <Card.Header>
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Team Performance Summary
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table className="summary-table mb-0">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Team</th>
                      <th>Players</th>
                      <th>Avg Points</th>
                      <th>Avg Rebounds</th>
                      <th>Avg Assists</th>
                      <th>Avg Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTeams.map((team, index) => (
                      <tr key={team.name}>
                        <td>
                          <Badge bg={index < 3 ? 'warning' : 'secondary'}>
                            #{index + 1}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={team.logo} 
                              alt={team.name}
                              className="team-logo-small me-2"
                            />
                            {team.name}
                          </div>
                        </td>
                        <td>{team.players}</td>
                        <td>{team.avgPoints}</td>
                        <td>{team.avgRebounds}</td>
                        <td>{team.avgAssists}</td>
                        <td>{team.avgEfficiency}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeamStats; 