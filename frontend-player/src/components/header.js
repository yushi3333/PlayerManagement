import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, Button, Dropdown, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBasketballBall, faChartBar, faUsers, faHome, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = ({ onSearch, players, onTeamSelect, selectedTeam, searchTerm, teams }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(searchTerm || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    if (location.pathname !== '/players') {
      navigate('/players');
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const getUniqueTeams = () => {
    const teamNames = [...new Set(players.map(player => player.team))];
    return teamNames.sort();
  };

  const getTeamLogo = (teamName) => {
    return teams[teamName]?.logo || null;
  };

  const getTeamColor = (teamName) => {
    return teams[teamName]?.color || '#6c757d';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
      <Container fluid>
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          className="brand-logo"
          style={{ cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faBasketballBall} className="me-2" />
          NBA Player Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              onClick={() => navigate('/')}
              className={location.pathname === '/' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/dashboard')}
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faChartBar} className="me-1" />
              Dashboard
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/players')}
              className={location.pathname === '/players' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faUsers} className="me-1" />
              Players
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/team-stats')}
              className={location.pathname === '/team-stats' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faChartBar} className="me-1" />
              Team Stats
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            {/* Team Filter */}
            <Dropdown>
              <Dropdown.Toggle 
                variant="outline-light" 
                id="dropdown-team"
                className="team-dropdown"
              >
                {selectedTeam === 'All Teams' ? (
                  <>
                    <FontAwesomeIcon icon={faBasketballBall} className="me-2" />
                    All Teams
                  </>
                ) : (
                  <>
                    <img 
                      src={getTeamLogo(selectedTeam)} 
                      alt={selectedTeam}
                      className="team-logo-small me-2"
                      style={{ width: '20px', height: '20px' }}
                    />
                    {selectedTeam}
                  </>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="team-dropdown-menu">
                <Dropdown.Item 
                  onClick={() => onTeamSelect('All Teams')}
                  className={selectedTeam === 'All Teams' ? 'active' : ''}
                >
                  <FontAwesomeIcon icon={faBasketballBall} className="me-2" />
                  All Teams
                </Dropdown.Item>
                <Dropdown.Divider />
                {getUniqueTeams().map((team) => (
                  <Dropdown.Item 
                    key={team}
                    onClick={() => onTeamSelect(team)}
                    className={selectedTeam === team ? 'active' : ''}
                  >
                    <div className="d-flex align-items-center">
                      <img 
                        src={getTeamLogo(team)} 
                        alt={team}
                        className="team-logo-small me-2"
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span>{team}</span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Search Form */}
            <Form onSubmit={handleSearchSubmit} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search players or teams..."
                className="me-2 search-input"
                value={searchValue}
                onChange={handleSearchChange}
                style={{ minWidth: '250px' }}
              />
              <Button 
                type="submit" 
                variant="outline-light"
                className="search-button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>

            {/* Player Count Badge */}
            <Badge bg="primary" className="player-count">
              {players.length} Players
            </Badge>

            {/* User Authentication */}
            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" id="dropdown-user">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {user.username}
                  <Badge bg={user.role === 'ADMIN' ? 'danger' : 'success'} className="ms-2">
                    {user.role}
                  </Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    <small>角色: {user.role}</small>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    退出登录
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  登录
                </Button>
                <Button 
                  variant="light" 
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  注册
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;