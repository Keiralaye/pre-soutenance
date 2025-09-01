import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Ferme le menu mobile quand on clique sur un lien
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        <img src="/hajj-gui-logo.png" alt="HAJJ-GUI Logo" className="logo-img" />
      </Link>
      <div className={`nav-links ${isOpen ? 'active' : ''}`} role="menu">
        <Link to="/" className="navbar-link" onClick={handleLinkClick}>ACCUEIL</Link>
        <Link to="/checklist" className="navbar-link" onClick={handleLinkClick}>CHECKLIST</Link>
        <Link to="/ressources" className="navbar-link" onClick={handleLinkClick}>RESSOURCES</Link>
        <Link to="/agences" className="navbar-link" onClick={handleLinkClick}>AGENCES</Link>
        <Link to="/forum" className="navbar-link" onClick={handleLinkClick}>FORUM</Link>
      </div>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Menu"
        type="button"
      >
        ☰
      </button>
    </nav>
  );
}

export default Navbar;