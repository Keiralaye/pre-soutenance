// Fichier : src/components/AgencesMap.js
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Star, Clock, CheckCircle } from 'lucide-react';
import './AgencesMap.css';

// Données des agences avec leurs informations complètes
const agences = [
  { 
    id: 1, 
    name: 'Agence Al-Baraka Travel', 
    address: 'Quartier Almamya, Conakry',
    phone: '+224 664 123 456',
    email: 'contact@albaraka-travel.gn',
    rating: 4.5,
    certifiee: true,
    services: ['Visa', 'Transport', 'Hébergement', 'Guide spirituel'],
    description: 'Spécialisée dans l\'organisation de pèlerinages depuis 15 ans.'
  },
  { 
    id: 2, 
    name: 'Hajj Services Guinée', 
    address: 'Matam Centre, Conakry',
    phone: '+224 655 789 012',
    email: 'info@hajj-services.gn',
    rating: 4.2,
    certifiee: true,
    services: ['Visa', 'Transport', 'Hébergement', 'Assurance'],
    description: 'Agence certifiée offrant des services complets pour le Hajj et la Omra.'
  },
  { 
    id: 3, 
    name: 'Makkah Express', 
    address: 'Kaloum, Conakry',
    phone: '+224 622 345 678',
    email: 'contact@makkah-express.gn',
    rating: 4.7,
    certifiee: true,
    services: ['Visa', 'Transport', 'Hébergement', 'Guide spirituel', 'Formation'],
    description: 'Excellence et professionnalisme pour votre voyage spirituel.'
  },
  { 
    id: 4, 
    name: 'Omra & Hajj Conakry', 
    address: 'Dixinn, Conakry',
    phone: '+224 666 901 234',
    email: 'info@omrahajj-conakry.gn',
    rating: 4.0,
    certifiee: true,
    services: ['Visa', 'Transport', 'Hébergement'],
    description: 'Votre partenaire de confiance pour un pèlerinage mémorable.'
  },
];

function AgencesMap() {
  const [selectedAgence, setSelectedAgence] = useState(null);
  const [filterCertifiee, setFilterCertifiee] = useState(false);

  const filteredAgences = filterCertifiee 
    ? agences.filter(agence => agence.certifiee) 
    : agences;

  const handleAgenceClick = (agence) => {
    setSelectedAgence(agence);
  };

  const closeModal = () => {
    setSelectedAgence(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#DAAC60" color="#DAAC60" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="#DAAC60" color="#DAAC60" style={{opacity: 0.5}} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#ddd" />);
    }

    return stars;
  };

  return (
    <div className="agences-container">
      
      {/* En-tête */}
      <div className="agences-header">
        <h1>Cartographie des Agences Agréées</h1>
        <p className="agences-subtitle">
          Découvrez les agences de voyage certifiées par le SGAR pour votre pèlerinage.
        </p>
      </div>

      {/* Filtres */}
      <div className="agences-filters">
        <button 
          className={`filter-btn ${!filterCertifiee ? 'active' : ''}`}
          onClick={() => setFilterCertifiee(false)}
        >
          Toutes les agences
        </button>
        <button 
          className={`filter-btn ${filterCertifiee ? 'active' : ''}`}
          onClick={() => setFilterCertifiee(true)}
        >
          <CheckCircle size={18} />
          Certifiées seulement
        </button>
      </div>

      {/* Carte temporaire (en attendant Google Maps) */}
      <div className="map-placeholder">
        <div className="map-notice">
          <MapPin size={48} color="#DAAC60" />
          <h3>Carte Interactive (À venir)</h3>
          <p>
            La carte interactive avec Google Maps sera intégrée prochainement. 
            En attendant, consultez la liste détaillée des agences ci-dessous.
          </p>
        </div>
      </div>

      {/* Liste des agences */}
      <div className="agences-grid">
        {filteredAgences.map((agence) => (
          <div 
            key={agence.id} 
            className="agence-card"
            onClick={() => handleAgenceClick(agence)}
          >
            <div className="agence-header">
              <h3 className="agence-name">{agence.name}</h3>
              {agence.certifiee && (
                <span className="certification-badge">
                  <CheckCircle size={16} />
                  Certifiée SGAR
                </span>
              )}
            </div>
            
            <div className="agence-rating">
              {renderStars(agence.rating)}
              <span className="rating-value">({agence.rating})</span>
            </div>

            <div className="agence-info">
              <p className="agence-address">
                <MapPin size={16} />
                {agence.address}
              </p>
              <p className="agence-description">
                {agence.description}
              </p>
            </div>

            <div className="agence-services">
              {agence.services.slice(0, 3).map((service, index) => (
                <span key={index} className="service-tag">{service}</span>
              ))}
              {agence.services.length > 3 && (
                <span className="service-more">+{agence.services.length - 3}</span>
              )}
            </div>

            <button className="contact-btn">
              Voir les détails
            </button>
          </div>
        ))}
      </div>

      {/* Modal de détails */}
      {selectedAgence && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedAgence.name}</h2>
              {selectedAgence.certifiee && (
                <span className="certification-badge">
                  <CheckCircle size={16} />
                  Certifiée SGAR
                </span>
              )}
            </div>

            <div className="modal-rating">
              {renderStars(selectedAgence.rating)}
              <span className="rating-value">({selectedAgence.rating}/5)</span>
            </div>

            <div className="modal-info">
              <div className="info-item">
                <MapPin size={18} color="#DAAC60" />
                <span>{selectedAgence.address}</span>
              </div>
              <div className="info-item">
                <Phone size={18} color="#DAAC60" />
                <span>{selectedAgence.phone}</span>
              </div>
              <div className="info-item">
                <Mail size={18} color="#DAAC60" />
                <span>{selectedAgence.email}</span>
              </div>
            </div>

            <div className="modal-description">
              <h4>À propos</h4>
              <p>{selectedAgence.description}</p>
            </div>

            <div className="modal-services">
              <h4>Services proposés</h4>
              <div className="services-list">
                {selectedAgence.services.map((service, index) => (
                  <span key={index} className="service-tag">{service}</span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <a href={`tel:${selectedAgence.phone}`} className="action-btn call-btn">
                <Phone size={18} />
                Appeler
              </a>
              <a href={`mailto:${selectedAgence.email}`} className="action-btn email-btn">
                <Mail size={18} />
                Email
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AgencesMap;