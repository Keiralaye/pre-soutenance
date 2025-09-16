// Fichier : src/components/Footer.js

import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, Heart, Facebook, Twitter, MessageCircle, AtSign } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
       
        <div className="footer-brand">
          <div className="footer-logo">HAJJ-GUI</div>
          <p className="footer-tagline">
            Votre guide numerique pour un pelerinage serein et sécurise
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
              <li><a href="/agences">Agences Agréees</a></li>
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
                Conakry, République de Guinee
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
              <a href="https://www.facebook.com/votrepage" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} className="social-icon" />
              </a>
              <a href="https://twitter.com/votresite" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} className="social-icon" />
              </a>
              <a href="https://wa.me/224612589269" className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} className="social-icon" />
              </a>
              <a href="mailto:layegn24@gmail.com" className="social-link" aria-label="Email" target="_blank" rel="noopener noreferrer">
                <AtSign size={20} className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>
              <MapPin size={20} />
              Partenaires
            </h3>
            <ul>
              <li>Secrétariat Général des Affaires Religieuses (SGAR)</li>
              <li>Ministere de l'Administration du Territoire</li>
              <li>Agences de voyage agréees</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} HAJJ-GUI. Tous droits réservés.
          </div>
          <div className="footer-legal">
            <a href="/mentions-legales">Mentions Légales</a>
            <a href="/confidentialite">Confidentialite</a>
            <a href="/conditions">Conditions d'utilisation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;