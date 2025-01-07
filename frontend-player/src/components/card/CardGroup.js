
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { use, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Player from '../player/Player'
import { useNavigate } from 'react-router-dom';

const CardGroup = ({players}) => {
    const navigate = useNavigate();
    
    //This sends player data directly to the /player route without relying on useState.
    const handleUpdate =(player) =>{
        navigate('/player', {state: {player}})
       

    }
    

    

  return (
    <>
    <Row  xs={1} md={4} className="g-2">
        {players.map((player, idx)=>(
            <Col key={idx}>
                <Card>
                    <Card.Body>
                        <Card.Title>{player.name}</Card.Title>
                        <ListGroup variant='flush'>
                            <ListGroupItem>GP: {player.gp}</ListGroupItem>
                            <ListGroupItem>FG3P: {player.fg3p}</ListGroupItem>
                            <ListGroupItem>FGP: {player.fgp}</ListGroupItem>
                            <ListGroupItem>FTP: {player.ftp}</ListGroupItem>
                            <ListGroupItem>EFF: {player.eff}</ListGroupItem>
                            <ListGroupItem>REB: {player.reb}</ListGroupItem>
                            <ListGroupItem>AST: {player.ast}</ListGroupItem>
                            <ListGroupItem>STL: {player.stl}</ListGroupItem>
                            <ListGroupItem>BLK: {player.blk}</ListGroupItem>
                            <ListGroupItem>TOV: {player.tov}</ListGroupItem>
                            <ListGroupItem>PTS: {player.pts}</ListGroupItem>
                        </ListGroup>

                        <Button onClick={()=>handleUpdate(player)} >Update Player</Button>

                        

                    </Card.Body>
                </Card>

            </Col>

        ))}
        
    </Row>

    </>
  )
}

export default CardGroup