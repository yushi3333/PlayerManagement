import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getPlayer, updatePlayers } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';


const Player = () => {
    const location = useLocation();
    const player = location.state?.player; // Get player from navigate()
    const previousPage = location.state?.from || '/';
    const navigate = useNavigate();
    

    // Initialize formData state with proper empty values for all fields
    const [formData, setFormData] = useState({
        name: '',
        gp: '',
        fg3p: '',
        fgp: '',
        ftp: '',
        eff: '',
        reb: '',
        ast: '',
        stl: '',
        blk: '',
        tov: '',
        pts: '',
        minutes: '',
        team:''
    });

    useEffect(() => {
        if (player) {
            console.log(player.id)
            // Ensure formData is updated correctly when player data is loaded
            setFormData({
                name: player.name || '',
                gp: player.gp || '',
                fg3p: player.fg3p || '',
                fgp: player.fgp || '',
                ftp: player.ftp || '',
                eff: player.eff || '',
                reb: player.reb || '',
                ast: player.ast || '',
                stl: player.stl || '',
                blk: player.blk || '',
                tov: player.tov || '',
                pts: player.pts || '',
                minutes: player.minutes || '',
                team:player.team || ''
            });
        }
    }, [player]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Update other form fields
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the updated formData, not the original player
        updatePlayers(player.id, formData)
            .then((updatedPlayer) => {
                console.log('Player data updated successfully', updatedPlayer);
                getPlayer(player.id)
                .then((playerData)=>{
                    setFormData(playerData)
                    console.log('Refetched player data:', playerData);
                })
                .catch((err)=>{
                    console.log('refetch err')
                })
                // Optionally update UI or navigate to another page
            })
            .catch((err) => {
                console.log('Error updating player data:', err);
            });
        
        navigate(previousPage);
        window.location.reload();
        
        
    };

    return (
        <div>
            {!player ? (
                <div>No player data available.</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Player Name</InputGroup.Text>
                        <Form.Control
                            name="name"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="string"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Player Name"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Game Played</InputGroup.Text>
                        <Form.Control
                            name="gp"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={formData.gp}
                            onChange={handleChange}
                            placeholder="Games Played"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">FG3P</InputGroup.Text>
                        <Form.Control
                            name="fg3p"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={formData.fg3p}
                            onChange={handleChange}
                            placeholder="3 points field goal percentage"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">FGP</InputGroup.Text>
                        <Form.Control
                            name="fgp"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={formData.fgp}
                            onChange={handleChange}
                            placeholder="Field Goal Percentage"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">FTP</InputGroup.Text>
                        <Form.Control
                            name="ftp"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={formData.ftp}
                            onChange={handleChange}
                            placeholder="Free throw percentage"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Eff</InputGroup.Text>
                        <Form.Control
                            name="eff"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={formData.eff}
                            onChange={handleChange}
                            placeholder="Efficiency"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Minutes</InputGroup.Text>
                        <Form.Control
                            name="minutes"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={formData.minutes}
                            onChange={handleChange}
                            placeholder="minutes"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Team</InputGroup.Text>
                        <Form.Control
                            name="team"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="string"
                            value={formData.team}
                            onChange={handleChange}
                            placeholder="Team Name"
                            required
                        />
                    </InputGroup>


                    <Button type="submit" variant="dark">Submit</Button>
                </form>
            )}
        </div>
    );
};

export default Player;
