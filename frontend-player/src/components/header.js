// import { useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from "react-bootstrap/Button";
// import {NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, {useState}from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBasketball} from "@fortawesome/free-solid-svg-icons" ;
const Header = ({onSearch, players, onTeamSelect})=> {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch= (e)=>{
        if (e.key === "Enter"){
            if (searchTerm.trim()){
            onSearch(searchTerm);
            navigate("/players")

            }
        }
    
    }
    const uniqueTeams = [...new Set(players.map(player=>player.team))];

    return (
        <Navbar bg='dark' variant='dark' expand="lg" >
          <Container fluid>
            <Navbar.Brand href="/" >
            <FontAwesomeIcon icon={faBasketball} style={{"color": 'gold'}} />
              Player Management
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">               
                <Dropdown data-bs-theme="dark" >
                  <Dropdown.Toggle variant="secondary">
                    Select Teams

                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>onTeamSelect("All Teams")}>
                      All Teams
                    </Dropdown.Item>
                    {uniqueTeams.map((team, index)=>(
                      <Dropdown.Item key={index} onClick={()=>onTeamSelect(team)}>
                        {team}

                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>

                </Dropdown>
              </Nav>
              <input
                type="text"
                placeholder="Search by player name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                style={{ padding: '10px',  width: '300px', marginRight:'5%', marginBottom:'0.25%' }}
             />



            </Navbar.Collapse>
          </Container>
        </Navbar>
      );


}

export default Header;