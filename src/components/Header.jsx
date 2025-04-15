import React from 'react'

const Header = () => {
    return (
        <header className='bg-green-900 text-white shadow-md shadow-gray-400'>
            <nav className='container mx-auto p-4 flex justify-between items-center'>
                <div className=''>
                    <h1 className='text-2xl font-bold'>
                        <span>Fútbol</span><span className='text-gray-400'>.com</span>
                    </h1>
                </div>
            </nav>
        </header>
    )
}

export default Header