import './App.css'
import React from 'react'
import { useState } from 'react';
import Form from './Form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';


function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='*' element={""} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
