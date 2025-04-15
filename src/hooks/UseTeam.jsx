import React from 'react';
import { useTeamContext } from '../context/TeamContext';


const UseTeam = () => {

    const contextTeam = useTeamContext();
    
    if(!contextTeam){
      throw new Error('UseTeam debe usarse dentro de un TeamProvider');
    }

    return contextTeam;
  
}

export default UseTeam;