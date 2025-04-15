import React from 'react';
import UseTeam from '../hooks/UseTeam';
import UseForm from '../hooks/UseForm';
import { Info, NotePencil, Trash } from "@phosphor-icons/react";
import Swal from 'sweetalert2';

const TeamsCards = () => {

    const {teams, loading, error, deleteTeam} = UseTeam();
    const {openForm} = UseForm();

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Eliminar equipo', 
            text: '¿Está seguro que desea eliminar el equipo de forma permanente?', 
            icon: 'warning', 
            showCancelButton: true, 
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#3085d6', 
            confirmButtonText: 'Eliminar', 
            cancelButtonText: 'Cancelar'
        });

        if(result.isConfirmed){
            try {
                await deleteTeam(id);
                Swal.fire('Eliminado', 'El equipo se ha eliminado.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al eliminar el equipo', 'error');
            }
        }
    }

    //const {teams, loading, error} = useTeamContext();

    if (loading) return <div>Cargando...</div>
    if(error) return <div>{error}</div>
    if(!teams || teams.length === 0) return <div>No se enoconttraron equipos</div>

    return (
        <>
        <div className='relative z-10 container p-4 mx-auto text-white'>
            <h2 className='border-l-4 border-green-900 px-2 py-4 mt-4 font-semibold text-md bg-gray-900'>Clubes de fútbol</h2>
        </div>
        {/* Acá van los cards */}
        <div 
            className='relative z-10 min-h-full overflow-y-auto px-4 py-8 container mx-auto'>
            <div 
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pb-12'>
                
                { teams.map((team) => (

                    <div 
                        key={team.id}
                        className='bg-gray-800/70 border border-gray-700 text-gray-300 backdrop-blur-md rounded-2xl shadow shadow-gray-800 p-6 transition hover:scale-105 hover:bg-gray-800/20 hover:border-y-gray-700/60 cursor-pointer'
                    >
                        <img 
                            src={team.escudo}
                            className='w-48 h-48 object-contain mx-auto rounded-2xl mb-4'
                            alt={`escudo de ${team.nombre}`}
                        ></img>
                        <h3>{team.nombre}</h3>
                        <p>{team.apodo}</p>
                        <p>{team.estadio}</p>
                        <div className='flex justify-center space-x-4 mt-4 pt-2 border-t'>
                            <button
                                id='moreInfo'
                                className='flex justify-center items-center'
                                aria-label="Más info"
                            >
                                <Info size={32} weight='fill' className='hover:fill-blue-500 cursor-pointer'/>
                            </button>
                            <button
                                id='edit'
                                onClick={() => openForm('edit', team)}
                                className='flex justify-center items-center'
                                aria-label='Editar'
                            >
                                <NotePencil size={32} weight='fill' className='hover:fill-green-500 cursor-pointer' />
                            </button>
                            <button
                                id='delete'
                                onClick={() => handleDelete(team.id)}
                                className='flex justify-center items-center'
                                aria-label='Eliminar'
                            >
                                <Trash size={32} weight='fill' className='hover:fill-red-400 cursor-pointer' />
                            </button>
                        </div>

                    </div>

                ))}

            </div>
        </div>
        {/* Fin de los cards */}
        </>
    )
}

export default TeamsCards