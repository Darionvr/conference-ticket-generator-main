import React, { useState } from 'react'
import Form from './components/Form'
import './App.css'
import DragAndDrop from './components/DragAndDrop'
import { Route, Routes } from 'react-router'
import Ticket from './components/Ticket'




const App = () => {


  return (
    <>


      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>

    </>

  )
}

const Main = () => (
  <>

    <header>
      <object className='logo-full' data="/images/logo-full.svg" type="image/svg+xml"></object>
      <h1>Your Journey to Coding Conf <br />2025 Starts Here!</h1>
      <p> Secure your spot at next year's biggest coding conference.</p>

    </header>

    <main>
      <DragAndDrop />
      <Form />
    </main>
  </>
);

export default App