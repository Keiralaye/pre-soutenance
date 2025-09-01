// Fichier : src/components/Footer.js

import React from 'react';
import './Footer.css'; // Nous allons créer ce fichier après

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} HAJJ-GUI. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="/mentions-legales">Mentions Légales</a>
          <a href="/confidentialite">Politique de Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;