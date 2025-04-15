import React from 'react';
import fondo from '../assets/la-bombonera-boca.jpg'
import TeamsCards from './TeamsCards';
import UseForm from '../hooks/UseForm';

const Main = () => {

    const {openForm} = UseForm();

    return (
        <main className='relative w-full min-h-screen'>
            
            <div 
            className='absolute inset-0 bg-cover bg-center'
            style={{backgroundImage: `url(${fondo})`}}>
                {/* Main con imágen de fondo */}
            </div>
            
            <div className='absolute inset-0 bg-black/90'>{/* Div con filtro de degradado */}</div>

            <TeamsCards />
            
            <button 
                onClick={() => openForm('create')}
                className='absolute z-50 w-14 h-14 cursor-pointer bg-gray-800 shadow-sm shadow-gray-900 hover:bg-gray-900/80 transition ease-in-out text-white bottom-6 right-6 rounded-full'>+</button>
        </main>
    )
}

export default Main