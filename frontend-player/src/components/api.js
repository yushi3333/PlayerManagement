import axios from 'axios'
const API_URL = 'http://localhost:8080/api/players';

export const getPlayers = async () =>{
    const response = await axios.get(API_URL);
    return response.data;

}

export const updatePlayers = async (id, player)=>{

    try {
        const response = await axios.put(`http://localhost:8080/api/players/${id}`, player);
        return response.data; // Return the updated player data
    } catch (error) {
        throw error;
    }
}

export const getPlayer = async (id)=>{
    try{
        const response = await axios.get(`http://localhost:8080/api/players/${id}`);
        return response.data;

    }catch(err){
        throw err;
    }


}

