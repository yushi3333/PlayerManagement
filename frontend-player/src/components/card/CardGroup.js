
import React, { useState } from 'react';
import { Card, Col, Row, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faBasketballBall, faChartLine, faStar, faTrophy, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CardGroup.css';

const CardGroup = ({ players, teams, loading }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleUpdate = (player) => {
    navigate('/player', { state: { player } });
  };

  const getTeamLogo = (teamName) => {
    return teams[teamName]?.logo || null;
  };

  const getTeamColor = (teamName) => {
    return teams[teamName]?.color || '#6c757d';
  };

  const sortPlayers = (playersList) => {
    return [...playersList].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortButton = ({ field, label, icon }) => (
    <Button
      variant={sortBy === field ? 'primary' : 'outline-secondary'}
      size="sm"
      className="me-2 mb-2"
      onClick={() => handleSort(field)}
    >
      <FontAwesomeIcon icon={icon} className="me-1" />
      {label}
      {sortBy === field && (
        <FontAwesomeIcon 
          icon={sortOrder === 'asc' ? faSortUp : faSortDown} 
          className="ms-1" 
        />
      )}
    </Button>
  );

  const PlayerCard = ({ player }) => {
    const teamColor = getTeamColor(player.team);
    const teamLogo = getTeamLogo(player.team);

    const getPerformanceColor = (value, maxValue = 30) => {
      const percentage = (value / maxValue) * 100;
      if (percentage >= 80) return '#28a745';
      if (percentage >= 60) return '#ffc107';
      if (percentage >= 40) return '#fd7e14';
      return '#dc3545';
    };

    const StatBadge = ({ label, value, maxValue = 30, icon }) => (
      <div className="stat-badge">
        <FontAwesomeIcon icon={icon} className="stat-icon" />
        <div className="stat-content">
          <div className="stat-label">{label}</div>
          <div 
            className="stat-value"
            style={{ color: getPerformanceColor(value, maxValue) }}
          >
            {value}
          </div>
        </div>
      </div>
    );

    return (
      <Col lg={4} md={6} className="mb-4">
        <Card className="player-card h-100">
          <div 
            className="card-header-gradient"
            style={{ background: `linear-gradient(135deg, ${teamColor}20 0%, ${teamColor}40 100%)` }}
          >
            <div className="team-info">
              <img 
                src={teamLogo} 
                alt={player.team}
                className="team-logo"
              />
              <div className="team-details">
                <h6 className="team-name">{player.team}</h6>
                <Badge 
                  bg="secondary" 
                  className="position-badge"
                  style={{ backgroundColor: teamColor }}
                >
                  {player.gp} GP
                </Badge>
              </div>
            </div>
          </div>

          <Card.Body className="player-body">
            <div className="player-header">
              <h5 className="player-name">{player.name}</h5>
              <div className="player-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleUpdate(player)}
                  className="action-btn"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => handleUpdate(player)}
                  className="action-btn"
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </div>
            </div>

            <div className="player-stats">
              <Row>
                <Col xs={6} className="mb-3">
                  <StatBadge 
                    label="Points" 
                    value={player.pts} 
                    maxValue={30}
                    icon={faChartLine}
                  />
                </Col>
                <Col xs={6} className="mb-3">
                  <StatBadge 
                    label="Rebounds" 
                    value={player.reb} 
                    maxValue={15}
                    icon={faBasketballBall}
                  />
                </Col>
                <Col xs={6} className="mb-3">
                  <StatBadge 
                    label="Assists" 
                    value={player.ast} 
                    maxValue={12}
                    icon={faStar}
                  />
                </Col>
                <Col xs={6} className="mb-3">
                  <StatBadge 
                    label="Efficiency" 
                    value={player.eff} 
                    maxValue={25}
                    icon={faTrophy}
                  />
                </Col>
              </Row>
            </div>

            <div className="additional-stats">
              <div className="stat-row">
                <span className="stat-label">FG%:</span>
                <span className="stat-value">{(player.fgp * 100).toFixed(1)}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">3P%:</span>
                <span className="stat-value">{(player.fg3p * 100).toFixed(1)}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">FT%:</span>
                <span className="stat-value">{(player.ftp * 100).toFixed(1)}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Minutes:</span>
                <span className="stat-value">{player.minutes.toFixed(1)}</span>
              </div>
            </div>
          </Card.Body>

          <Card.Footer className="player-footer">
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="footer-label">STL</span>
                <span className="footer-value">{player.stl}</span>
              </div>
              <div className="footer-stat">
                <span className="footer-label">BLK</span>
                <span className="footer-value">{player.blk}</span>
              </div>
              <div className="footer-stat">
                <span className="footer-label">TOV</span>
                <span className="footer-value">{player.tov}</span>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="loading-text">Loading players...</p>
      </div>
    );
  }

  if (!players || players.length === 0) {
    return (
      <Alert variant="info" className="no-players-alert">
        <Alert.Heading>No Players Found</Alert.Heading>
        <p>
          No players match your current search criteria. Try adjusting your search terms or team filter.
        </p>
      </Alert>
    );
  }

  const sortedPlayers = sortPlayers(players);

  return (
    <div className="card-group-container">
      <div className="controls-section mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="sort-controls">
            <span className="sort-label me-2">Sort by:</span>
            <SortButton field="name" label="Name" icon="user" />
            <SortButton field="pts" label="Points" icon={faChartLine} />
            <SortButton field="reb" label="Rebounds" icon={faBasketballBall} />
            <SortButton field="ast" label="Assists" icon={faStar} />
            <SortButton field="eff" label="Efficiency" icon={faTrophy} />
          </div>
          <div className="results-count">
            <Badge bg="primary" className="count-badge">
              {players.length} {players.length === 1 ? 'Player' : 'Players'}
            </Badge>
          </div>
        </div>
      </div>

      <Row>
        {sortedPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </Row>
    </div>
  );
};

export default CardGroup;