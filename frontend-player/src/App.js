
import './App.css';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react' 
import {getPlayers} from './components/api'
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGroup from './components/card/CardGroup'
import {Routes, Route, RouterProviderProps} from 'react-router-dom';
import Layout from './components/home/Layout';
import Home from './components/home/Home'
import Player from './components/player/Player';
//images
import KobePoster from "./components/images/kobePoster.jpg";
import CurryPoster from "./components/images/curryPoster.jpg";
import JordanPoster from "./components/images/jordanPoster.jpeg";

function App() {
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080/api/players";
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [selectTeams, setSelectTeams] = useState([])
  const [images, setImages] = useState([
    {id:1,  src:KobePoster , alt:'kobe'},
    {id:2,  src:CurryPoster , alt:'curry'},
    {id:3,  src:JordanPoster , alt:'jordan'}
  ])
  const handleSearch = (searchTerm)=>{
    const filtered= players.filter((player)=> 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPlayers(filtered)

  }
  const handleTeamSelect = (team) =>{
    setSelectTeams(team);
    if (team === 'All Teams'){
      setFilteredPlayers(players);
      navigate('/players');
    }else{
      const filtered  = players.filter((player) => player.team === team);
      setFilteredPlayers(filtered);
      navigate('/players');
    }
    
  }
  

  useEffect(()=>{
    getPlayers().then((data)=>setPlayers(data));
  },[])
  return (

    <div className="App">
      <Header onSearch={handleSearch} players={players} onTeamSelect={handleTeamSelect}  />

      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home images={images} />}></Route>
        </Route>
        <Route path='/players' element={<CardGroup players={filteredPlayers}/>}></Route>
        <Route path='/player' element={<Player />}></Route>

      </Routes>


      
      
 
    </div>
  );
}

export default App;
