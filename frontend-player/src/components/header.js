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

const Header = ({onSearch})=> {
    // const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch= (e)=>{
        if (e.key === "Enter"){
            if (searchTerm.trim()){
            onSearch(searchTerm);
            // navigate("/Search")

            }
        }
    
    }

    return (
        <Navbar bg='dark' variant='dark' expand="lg" >
          <Container fluid>
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <input
                type="text"
                placeholder="Search by player name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                style={{ padding: '10px',  width: '300px', marginRight:'5%', marginBottom:'0.5%' }}
             />


            </Navbar.Collapse>
          </Container>
        </Navbar>
      );


}

export default Header;