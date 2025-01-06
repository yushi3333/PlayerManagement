
import './App.css';

import {useState, useEffect} from 'react' 
import {getPlayers} from './components/api'
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const API_URL = "http://localhost:8080/api/players";
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const handleSearch = (searchTerm)=>{
    const filtered= players.filter((player)=> 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPlayers(filtered)

  }

  useEffect(()=>{
    getPlayers().then((data)=>setPlayers(data));
  },[])
  return (
    <div className="App">
      <Header onSearch={handleSearch}  />


      <h2>Players List</h2>
      <ul>
          {players.map((player) => (
              <li key={player.id}>{player.name}</li>
          ))}
      </ul>
      
    </div>
  );
}

export default App;
