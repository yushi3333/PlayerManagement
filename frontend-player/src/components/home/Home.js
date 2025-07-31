import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faUsers, faChartLine, faTrophy, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ teams, stats }) => {
  const navigate = useNavigate();

  // Get top teams by player count
  const getTopTeams = () => {
    const teamCounts = {};
    Object.keys(teams).forEach(teamName => {
      teamCounts[teamName] = 0;
    });
    
    // This would be populated with actual player data
    // For now, we'll show all teams
    return Object.keys(teams).slice(0, 6);
  };

  const topTeams = getTopTeams();

  const StatCard = ({ icon, title, value, subtitle, color }) => (
    <Card className="stat-card h-100">
      <Card.Body className="text-center">
        <div className="stat-icon" style={{ color }}>
          <FontAwesomeIcon icon={icon} size="2x" />
        </div>
        <h3 className="stat-value">{value}</h3>
        <h6 className="stat-title">{title}</h6>
        <p className="stat-subtitle">{subtitle}</p>
      </Card.Body>
    </Card>
  );

  const TeamCard = ({ teamName, teamData }) => (
    <Card 
      className="team-card h-100" 
      onClick={() => navigate('/players')}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body className="text-center">
        <div className="team-logo-container">
          <img 
            src={teamData.logo} 
            alt={teamName}
            className="team-logo"
          />
        </div>
        <Card.Title className="team-name">{teamName}</Card.Title>
        <Card.Text className="team-city">{teamData.city}</Card.Text>
        <div 
          className="team-color-bar"
          style={{ backgroundColor: teamData.color }}
        ></div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6}>
              <h1 className="hero-title">
                NBA Player Management System
              </h1>
              <p className="hero-subtitle">
                Comprehensive analytics and management platform for NBA players, teams, and statistics.
                Track performance, analyze trends, and manage your basketball data with precision.
              </p>
              <div className="hero-buttons">
                <button 
                  className="btn btn-primary btn-lg me-3"
                  onClick={() => navigate('/players')}
                >
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  View Players
                </button>
                <button 
                  className="btn btn-outline-light btn-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Dashboard
                </button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image">
                <FontAwesomeIcon icon={faBasketballBall} size="8x" className="basketball-icon" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center">League Overview</h2>
              <p className="section-subtitle text-center">
                Key statistics and insights from across the NBA
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <StatCard
                icon={faUsers}
                title="Total Players"
                value={stats.totalPlayers}
                subtitle="Active roster"
                color="#007bff"
              />
            </Col>
            <Col md={3} className="mb-4">
              <StatCard
                icon={faChartLine}
                title="Avg Points"
                value={stats.avgPoints}
                subtitle="Per game"
                color="#28a745"
              />
            </Col>
            <Col md={3} className="mb-4">
              <StatCard
                icon={faBasketballBall}
                title="Avg Rebounds"
                value={stats.avgRebounds}
                subtitle="Per game"
                color="#ffc107"
              />
            </Col>
            <Col md={3} className="mb-4">
              <StatCard
                icon={faStar}
                title="Avg Assists"
                value={stats.avgAssists}
                subtitle="Per game"
                color="#dc3545"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Teams Section */}
      <section className="teams-section py-5 bg-light">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center">Featured Teams</h2>
              <p className="section-subtitle text-center">
                Explore teams and their players
              </p>
            </Col>
          </Row>
          <Row>
            {topTeams.map((teamName) => (
              <Col lg={4} md={6} className="mb-4" key={teamName}>
                <TeamCard teamName={teamName} teamData={teams[teamName]} />
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <button 
                className="btn btn-outline-primary btn-lg"
                onClick={() => navigate('/team-stats')}
              >
                <FontAwesomeIcon icon={faTrophy} className="me-2" />
                View All Teams
              </button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center">System Features</h2>
              <p className="section-subtitle text-center">
                Powerful tools for basketball analytics
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faUsers} size="3x" />
                </div>
                <h4>Player Management</h4>
                <p>Comprehensive player profiles with detailed statistics and performance metrics.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faChartLine} size="3x" />
                </div>
                <h4>Advanced Analytics</h4>
                <p>Deep insights into player performance, team statistics, and league trends.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faTrophy} size="3x" />
                </div>
                <h4>Team Insights</h4>
                <p>Team-based analytics and comparisons to help understand roster performance.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;