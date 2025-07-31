import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faUsers, faChartLine, faTrophy, faStar, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ players, teams, stats }) => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState('pts');

  // Calculate analytics
  const analytics = useMemo(() => {
    if (!players.length) return {};

    const topScorers = [...players].sort((a, b) => b.pts - a.pts).slice(0, 5);
    const topRebounders = [...players].sort((a, b) => b.reb - a.reb).slice(0, 5);
    const topAssisters = [...players].sort((a, b) => b.ast - a.ast).slice(0, 5);
    const topEfficiency = [...players].sort((a, b) => b.eff - a.eff).slice(0, 5);

    // Team statistics
    const teamStats = {};
    players.forEach(player => {
      if (!teamStats[player.team]) {
        teamStats[player.team] = {
          players: 0,
          totalPoints: 0,
          totalRebounds: 0,
          totalAssists: 0,
          avgPoints: 0,
          avgRebounds: 0,
          avgAssists: 0
        };
      }
      teamStats[player.team].players++;
      teamStats[player.team].totalPoints += player.pts;
      teamStats[player.team].totalRebounds += player.reb;
      teamStats[player.team].totalAssists += player.ast;
    });

    // Calculate averages
    Object.keys(teamStats).forEach(team => {
      const teamData = teamStats[team];
      teamData.avgPoints = (teamData.totalPoints / teamData.players).toFixed(1);
      teamData.avgRebounds = (teamData.totalRebounds / teamData.players).toFixed(1);
      teamData.avgAssists = (teamData.totalAssists / teamData.players).toFixed(1);
    });

    return {
      topScorers,
      topRebounders,
      topAssisters,
      topEfficiency,
      teamStats
    };
  }, [players]);

  const getTeamLogo = (teamName) => {
    return teams[teamName]?.logo || null;
  };

  const getTeamColor = (teamName) => {
    return teams[teamName]?.color || '#6c757d';
  };

  const StatCard = ({ icon, title, value, subtitle, trend, color }) => (
    <Card className="dashboard-stat-card h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="stat-icon" style={{ color }}>
              <FontAwesomeIcon icon={icon} size="2x" />
            </div>
            <h3 className="stat-value">{value}</h3>
            <h6 className="stat-title">{title}</h6>
            <p className="stat-subtitle">{subtitle}</p>
          </div>
          {trend && (
            <div className={`trend-indicator ${trend > 0 ? 'positive' : 'negative'}`}>
              <FontAwesomeIcon icon={trend > 0 ? faArrowUp : faArrowDown} />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  const LeaderboardCard = ({ title, data, metric, icon, color }) => (
    <Card className="leaderboard-card h-100">
      <Card.Header className="leaderboard-header">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={icon} className="me-2" style={{ color }} />
          <h5 className="mb-0">{title}</h5>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <Table className="leaderboard-table mb-0">
          <tbody>
            {data.map((player, index) => (
              <tr key={player.id} className="leaderboard-row">
                <td className="rank-cell">
                  <Badge bg={index < 3 ? 'warning' : 'secondary'} className="rank-badge">
                    {index + 1}
                  </Badge>
                </td>
                <td className="player-cell">
                  <div className="d-flex align-items-center">
                    <img 
                      src={getTeamLogo(player.team)} 
                      alt={player.team}
                      className="team-logo-tiny me-2"
                    />
                    <div>
                      <div className="player-name">{player.name}</div>
                      <div className="player-team">{player.team}</div>
                    </div>
                  </div>
                </td>
                <td className="value-cell">
                  <span className="metric-value">{player[metric]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const TeamStatsCard = () => (
    <Card className="team-stats-card">
      <Card.Header>
        <h5 className="mb-0">
          <FontAwesomeIcon icon={faTrophy} className="me-2" />
          Team Performance Overview
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="metric-selector mb-3">
          <Button 
            variant={selectedMetric === 'pts' ? 'primary' : 'outline-primary'}
            size="sm"
            className="me-2"
            onClick={() => setSelectedMetric('pts')}
          >
            Points
          </Button>
          <Button 
            variant={selectedMetric === 'reb' ? 'primary' : 'outline-primary'}
            size="sm"
            className="me-2"
            onClick={() => setSelectedMetric('reb')}
          >
            Rebounds
          </Button>
          <Button 
            variant={selectedMetric === 'ast' ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setSelectedMetric('ast')}
          >
            Assists
          </Button>
        </div>
        <div className="team-stats-list">
          {Object.entries(analytics.teamStats || {})
            .sort(([,a], [,b]) => b[`avg${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`] - a[`avg${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`])
            .slice(0, 10)
            .map(([teamName, teamData]) => (
              <div key={teamName} className="team-stat-item">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img 
                      src={getTeamLogo(teamName)} 
                      alt={teamName}
                      className="team-logo-small me-3"
                    />
                    <div>
                      <div className="team-name">{teamName}</div>
                      <div className="team-players">{teamData.players} players</div>
                    </div>
                  </div>
                  <div className="team-metric">
                    <div className="metric-value">{teamData[`avg${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`]}</div>
                    <div className="metric-label">avg {selectedMetric}</div>
                  </div>
                </div>
                <ProgressBar 
                  now={(teamData[`avg${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`] / 30) * 100} 
                  className="team-progress"
                  style={{ backgroundColor: getTeamColor(teamName) + '20' }}
                >
                  <ProgressBar 
                    variant="custom" 
                    now={(teamData[`avg${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`] / 30) * 100}
                    style={{ backgroundColor: getTeamColor(teamName) }}
                  />
                </ProgressBar>
              </div>
            ))}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="dashboard-container">
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="dashboard-header">
              <h1 className="dashboard-title">Analytics Dashboard</h1>
              <p className="dashboard-subtitle">
                Comprehensive insights into NBA player and team performance
              </p>
            </div>
          </Col>
        </Row>

        {/* Key Metrics */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <StatCard
              icon={faUsers}
              title="Total Players"
              value={stats.totalPlayers}
              subtitle="Active roster"
              color="#007bff"
            />
          </Col>
          <Col md={3} className="mb-3">
            <StatCard
              icon={faChartLine}
              title="Avg Points"
              value={stats.avgPoints}
              subtitle="Per game"
              color="#28a745"
              trend={5.2}
            />
          </Col>
          <Col md={3} className="mb-3">
            <StatCard
              icon={faBasketballBall}
              title="Avg Rebounds"
              value={stats.avgRebounds}
              subtitle="Per game"
              color="#ffc107"
              trend={-2.1}
            />
          </Col>
          <Col md={3} className="mb-3">
            <StatCard
              icon={faStar}
              title="Avg Assists"
              value={stats.avgAssists}
              subtitle="Per game"
              color="#dc3545"
              trend={3.8}
            />
          </Col>
        </Row>

        {/* Leaderboards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <LeaderboardCard
              title="Top Scorers"
              data={analytics.topScorers || []}
              metric="pts"
              icon={faChartLine}
              color="#dc3545"
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <LeaderboardCard
              title="Top Rebounders"
              data={analytics.topRebounders || []}
              metric="reb"
              icon={faBasketballBall}
              color="#ffc107"
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <LeaderboardCard
              title="Top Assisters"
              data={analytics.topAssisters || []}
              metric="ast"
              icon={faStar}
              color="#28a745"
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <LeaderboardCard
              title="Most Efficient"
              data={analytics.topEfficiency || []}
              metric="eff"
              icon={faTrophy}
              color="#007bff"
            />
          </Col>
        </Row>

        {/* Team Performance */}
        <Row>
          <Col>
            <TeamStatsCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard; 