import React from 'react';
import ContactForm from './ContactForm';
import './Home.css';
import { ClipboardList, Book, MapPin, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="top-section">
        <div className="alerts-section">
          <p className="alert-text">
            <span role="img" aria-label="Info">
              &#x1F6A8;
            </span>{" "}
            Info : Annonce Officielle du SGAR - Dates Clés du Hajj 2025
          </p>
        </div>
        <div className="search-bar-home">
          <Search className="search-icon-home" />
          <input
            type="text"
            className="search-input-home"
            placeholder="Rechercher un document, une agence, une info..."
          />
        </div>
      </div>

      <div className="hero-section">
        <h1 className="hero-title">Votre Pèlerinage Sécurisé et Transparent</h1>
        <p className="hero-subtitle">HAJJ-GUI centralise les informations officielles</p>
      </div>

      <div className="cards-section">
        <div className="card">
          <div className="card-title">
            <ClipboardList size={32} className="card-icon" />
            <h3>Liste de Documents à Fournir</h3>
          </div>
          <p className="card-description">Simplifiez vos démarches administratives.</p>
          <Link to="/checklist" className="card-link">
            En savoir plus
          </Link>
        </div>
        <div className="card">
          <div className="card-title">
            <Book size={32} className="card-icon" />
            <h3>Les Ressources</h3>
          </div>
          <p className="card-description">
            Consultez les guides, règlements et formulaires.
          </p>
          <Link to="/ressources" className="card-link">
            En savoir plus
          </Link>
        </div>
        <div className="card full-width">
          <div className="card-title">
            <MapPin size={32} className="card-icon" />
            <h3>Cartographie des Agences</h3>
          </div>
          <p className="card-description">
            Trouvez et Localisez les agences de voyage agréées près de chez vous.
          </p>
          <Link to="/agences" className="card-link">
            En savoir plus
          </Link>
        </div>
        <div className="card full-width">
          <div className="card-title">
            <MessageSquare size={32} className="card-icon" />
            <h3>Forum</h3>
          </div>
          <p className="card-description">
            Échangez avec la communauté et partagez vos expériences.
          </p>
          <Link to="/forum" className="card-link">
            En savoir plus
          </Link>
        </div>
      </div>

      <div className="contact-form-container">
        <ContactForm />
      </div>
    </div>
  );
}

export default Home;