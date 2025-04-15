import React from 'react';
import './App.css';
import { TeamProvider } from './context/TeamContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider } from './context/FormContext';
import TeamForm from './components/TeamForm';

function App() {

  return (
    <>
      <FormProvider>
        <TeamProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
            <ToastContainer position='top-right' autoClose={3000} />
          </Router>
          <TeamForm />{/* El formulario estará disponible como modal */}
        </TeamProvider>
      </FormProvider>
    </>
  )
}

export default App
