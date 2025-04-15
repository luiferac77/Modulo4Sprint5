import React, { createContext, useContext, useState } from 'react'

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
}

export const FormProvider = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [teamToUpdate, setTeamToUpdate] = useState(null);

    const openForm = (mode = 'create', team = null) => {
        
        setMode(mode);
        setTeamToUpdate(team);
        setIsOpen(true);

    }

    const closeForm = () => {
        setIsOpen(false);
        setTeamToUpdate(null);
    }

    return(
        <FormContext.Provider value={{isOpen, mode, openForm, closeForm, teamToUpdate}}>
            {children}
        </FormContext.Provider>
    );
}