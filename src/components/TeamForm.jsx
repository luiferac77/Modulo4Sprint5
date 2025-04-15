import React, { useState, useEffect } from 'react';
import { XCircle } from '@phosphor-icons/react';
import UseForm from '../hooks/UseForm';
import UseTeam from '../hooks/UseTeam';
import { toast } from 'react-toastify';

const TeamForm = () => {

    const {isOpen, mode, closeForm, teamToUpdate} = UseForm();
    const {createTeam, updateTeam} = UseTeam();

    const [formData, setFormData] = useState(
        {
            nombre: '', 
            apodo: '', 
            estadio: '', 
            escudo: ''  
        }
    );

    useEffect(() => {
    
        if(mode === 'edit' && teamToUpdate){
            setFormData({
                nombre: teamToUpdate.nombre || '', 
                apodo: teamToUpdate.apodo || '', 
                estadio: teamToUpdate.estadio || '', 
                escudo: teamToUpdate.escudo || '',
            });
        } else {
            setFormData({
                nombre: '', 
                apodo: '', 
                estadio: '', 
                escudo: '',
            });
        }


    }, [mode, teamToUpdate]);
    


    if(!isOpen) return null;

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        //alert('handleSubmit');
        e.preventDefault();

        try {
            if(mode === 'create'){
                await createTeam(formData);
                toast.success('Equipo creado con éxito');
            } else {
                await updateTeam(teamToUpdate.id, formData);
                toast.success('El equipo se ha editado con éxito')
            }
        } catch (error) {
            toast.error('Ocurrió un error al guardar un equipo');
        }
        closeForm();
    }
    
    return (
        //formulario modal
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
            {/*formulario*/}
            <form 
                onSubmit={handleSubmit}
                className='relative bg-white p-6 rounded-xl w-full max-w-md space-y-6'
            >
                
                <h2 className='mt-2 border-b p-2'>{mode == 'create' ? 'Nuevo equipo' : 'Editar equipo'}</h2>

                <label htmlFor='nombre' className='block'>Nombre
                    <input 
                        value={formData.nombre}
                        onChange={handleChange}
                        className='w-full border border-gray-500 px-4 py-2 rounded-md'
                        type='text' placeholder='nombre del equipo' name='nombre' id='nombre'></input>
                </label>
                
                <label htmlFor='apodo' className='block'>Apodo
                    <input 
                        value={formData.apodo}
                        onChange={handleChange}
                        className='w-full border border-gray-500 px-4 py-2 rounded-md'
                        type='text' placeholder='apodo del equipo' name='apodo' id='apodo'></input>
                </label>

                <label htmlFor='estadio' className='block'>Estadio
                    <input 
                        value={formData.estadio}
                        onChange={handleChange}
                        className='w-full border border-gray-500 px-4 py-2 rounded-md'
                        type='text' placeholder='nombre del estadio' name='estadio' id='estadio'></input>
                </label>

                <label htmlFor='escudo' className='block'>Escudo
                    <input 
                        value={formData.escudo}
                        onChange={handleChange}
                        className='w-full border border-gray-500 px-4 py-2 rounded-md'
                        type='text' placeholder='imagen del escudo' name='escudo' id='escudo'></input>
                </label>
                <button 
                    type='submit'
                    className= {`flex w-full ${mode === 'create' ? 'bg-blue-600' : 'bg-green-600'} text-white p-2 rounded-md justify-center cursor-pointer ${mode === 'create' ? 'hover:bg-blue-500' : 'hover:bg-green-500'} font-semibold`}
                >
                    {mode === 'create' ? 'Crear' : 'Editar'}
                </button>
                <button
                    onClick={() => closeForm()}
                    className='absolute top-2 right-2 cursor-pointer'
                >
                    <XCircle size={32} />
                </button>
            </form>
            {/*fin de formulario*/}
        </div>
    )
}

export default TeamForm