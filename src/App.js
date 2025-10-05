// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MapView from './MapView';
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </div>
  );
}

export default App;