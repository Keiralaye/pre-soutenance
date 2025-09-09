import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Checklist from './components/Checklist';
import Ressources from './components/Ressources';
import Forum from './components/Forum';
import Footer from './components/Footer';
import AgencesMap from './components/AgencesMap';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/agences" element={<AgencesMap />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;