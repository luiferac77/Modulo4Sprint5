import React from 'react';
import { useFormContext } from '../context/FormContext';

const UseForm = () => {
    
    const contextForm = useFormContext();

    if(!contextForm){
        throw new Error('UseForm debe usarse dentro de un contexto');
    } 

    return contextForm;

}

export default UseForm