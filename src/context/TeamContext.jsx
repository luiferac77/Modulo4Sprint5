import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TeamContext = createContext();

export const useTeamContext = () => {
    return useContext(TeamContext);
}

export const TeamProvider = ({children}) => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const apiUrl = `https://67f58f21913986b16fa4fd4b.mockapi.io/api/v1/club`;
    
    const fetchAllTeams = async () => {

        try {
            const response = await axios.get(apiUrl);
            setTeams(response.data);
        } catch (error) {
            setError('error al recuperar los equipos');
        } finally{
            setLoading(false);
        }

    }

    const createTeam = async(team) => {

        setLoading(true);
        try {
            const response = await axios.post(apiUrl, team);
            setTeams(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            setError('Error al crear el registro');
        } finally {
            setLoading(false);
        }

    }

    const updateTeam = async (id, teamData) => {
        setLoading(true);
        try {
            const response = await axios.put(`${apiUrl}/${id}`, teamData);
            setTeams(teams.map(team => (team.id === id ? response.data : team))); //se actualiza el estado con los datos modificados
        } catch (error) {
            setError('error al actualizar el equipo');
        } finally {
            setLoading(false);
        }
    }

    const deleteTeam = async(id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${apiUrl}/${id}`);
            setTeams(teams => teams.filter(team => team.id !== id));
        } catch (error) {
            setError('Error al eliminar el equipo');
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllTeams();
    }, []);
    
    return(
        <TeamContext.Provider value={{teams, loading, error, fetchAllTeams, createTeam, updateTeam, deleteTeam}}>
            {children}
        </TeamContext.Provider>
    );


}