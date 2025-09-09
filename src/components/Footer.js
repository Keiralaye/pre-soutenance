import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, Heart } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-brand">
          <div className="footer-logo">HAJJ-GUI</div>
          <p className="footer-tagline">
            Votre guide numerique pour un pelerinage serein et securise
          </p>
        </div>

        <div className="footer-main">
          
          <div className="footer-section">
            <h3>
              <Heart size={20} />
              A Propos
            </h3>
            <p>
              HAJJ-GUI est une plateforme numerique dediee a accompagner les pelerins guineens 
              dans leur parcours vers La Mecque, en centralisant les informations officielles 
              et en offrant des outils pratiques.
            </p>
          </div>

          <div className="footer-section">
            <h3>
              <ExternalLink size={20} />
              Liens Utiles
            </h3>
            <ul className="footer-links">
              <li><a href="/checklist">Checklist Documents</a></li>
              <li><a href="/ressources">Ressources PDF</a></li>
              <li><a href="/agences">Agences Agreees</a></li>
              <li><a href="/forum">Forum Communaute</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>
              <Phone size={20} />
              Contact
            </h3>
            <ul>
              <li>
                <MapPin size={16} style={{display: 'inline', marginRight: '8px'}} />
                Conakry, Republique de Guinee
              </li>
              <li>
                <Mail size={16} style={{display: 'inline', marginRight: '8px'}} />
                layegn24@gmail.com
              </li>
              <li>
                <Phone size={16} style={{display: 'inline', marginRight: '8px'}} />
                +224 - 612 - 58 - 92 - 69
              </li>
            </ul>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" 
                  alt="Facebook" 
                  className="social-icon"
                />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" 
                  alt="Twitter" 
                  className="social-icon"
                />
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg" 
                  alt="WhatsApp" 
                  className="social-icon"
                />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gmail.svg" 
                  alt="Email" 
                  className="social-icon"
                />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>
              <MapPin size={20} />
              Partenaires
            </h3>
            <ul>
              <li>Secretariat General des Affaires Religieuses (SGAR)</li>
              <li>Ministere de l'Administration du Territoire</li>
              <li>Agences de voyage agreees</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} HAJJ-GUI. Tous droits reserves.
          </div>
          <div className="footer-legal">
            <a href="/mentions-legales">Mentions Legales</a>
            <a href="/confidentialite">Confidentialite</a>
            <a href="/conditions">Conditions d'utilisation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;