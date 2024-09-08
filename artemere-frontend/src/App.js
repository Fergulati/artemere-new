import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArtistDashboard from './pages/ArtistDashboard.js';
import BreederDashboard from './pages/BreederDashboard';
import ArtDetail from './pages/ArtDetail';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<ArtistDashboard />} />
          <Route path="/breeder" element={<BreederDashboard />} />
          <Route path="/art/:id" element={<ArtDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
