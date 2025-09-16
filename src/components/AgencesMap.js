// Fichier : src/components/AgencesMap.js
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Star, CheckCircle } from 'lucide-react';
import './AgencesMap.css';

// DONNÉES DES AGENCES - Toutes sont maintenant agréées par le SGAR
const agences = [
  { 
    id: 1, 
    name: 'Agence Al-Baraka Travel', 
    address: 'Quartier Almamya, Conakry',
    phone: '+224 664 123 456',
    email: 'contact@albaraka-travel.gn',
    rating: 4.5,
    certifiee: true, // Toutes les agences sont certifiées
    services: ['Visa', 'Transport', 'Hébergement', 'Guide spirituel'],
    description: 'Spécialisée dans l\'organisation de pèlerinages depuis 15 ans avec certification SGAR.'
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
    description: 'Agence agréée SGAR offrant des services complets pour le Hajj et la Omra.'
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
    description: 'Excellence et professionnalisme pour votre voyage spirituel. Agréée SGAR.'
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
    description: 'Votre partenaire de confiance pour un pèlerinage mémorable. Certification SGAR.'
  },
  { 
    id: 5, 
    name: 'Barakallah Travel', 
    address: 'Ratoma, Conakry',
    phone: '+224 677 456 789',
    email: 'contact@barakallah-travel.gn',
    rating: 4.3,
    certifiee: true,
    services: ['Visa', 'Transport', 'Hébergement', 'Assurance', 'Guide spirituel'],
    description: 'Nouvelle agence agréée SGAR, spécialisée dans l\'accompagnement personnalisé.'
  },
  { 
    id: 6, 
    name: 'Nour Al-Islam Voyage', 
    address: 'Kipé, Conakry',
    phone: '+224 688 234 567',
    email: 'info@nouralislam.gn',
    rating: 4.4,
    certifiee: true,
    services: ['Visa', 'Transport', 'Hébergement', 'Formation', 'Guide spirituel'],
    description: 'Agence certifiée SGAR avec plus de 20 ans d\'expérience dans l\'organisation du Hajj.'
  },
];

function AgencesMap() {
  // STATE POUR LA SÉLECTION D'AGENCE - Gère l'affichage de la modal
  const [selectedAgence, setSelectedAgence] = useState(null);
  
  // STATE POUR LE FILTRE DE RECHERCHE - Permet de filtrer par nom ou services
  const [searchTerm, setSearchTerm] = useState('');

  // FONCTION DE FILTRAGE - Filtre les agences selon le terme de recherche
  const filteredAgences = agences.filter(agence => {
    const searchLower = searchTerm.toLowerCase();
    return (
      agence.name.toLowerCase().includes(searchLower) ||
      agence.address.toLowerCase().includes(searchLower) ||
      agence.services.some(service => service.toLowerCase().includes(searchLower)) ||
      agence.description.toLowerCase().includes(searchLower)
    );
  });

  // GESTION DU CLIC SUR UNE AGENCE - Ouvre la modal avec les détails
  const handleAgenceClick = (agence) => {
    setSelectedAgence(agence);
  };

  // FERMETURE DE LA MODAL - Remet selectedAgence à null
  const closeModal = () => {
    setSelectedAgence(null);
  };

  // FONCTION D'AFFICHAGE DES ÉTOILES - Génère les étoiles de notation
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Nombre d'étoiles pleines
    const hasHalfStar = rating % 1 !== 0; // Vérifie s'il y a une demi-étoile

    // ÉTOILES PLEINES - Ajoute les étoiles pleines colorées
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#DAAC60" color="#DAAC60" />);
    }
    
    // DEMI-ÉTOILE - Ajoute une étoile à moitié remplie si nécessaire
    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="#DAAC60" color="#DAAC60" style={{opacity: 0.5}} />);
    }

    // ÉTOILES VIDES - Complète avec des étoiles vides jusqu'à 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#ddd" />);
    }

    return stars;
  };

  return (
    <div className="agences-container">
      
      {/* EN-TÊTE - Titre et description de la section */}
      <div className="agences-header">
        <h1>Agences Agréées par le SGAR</h1>
        <p className="agences-subtitle">
          Découvrez toutes les agences de voyage officiellement certifiées par le 
          Secrétariat Général des Affaires Religieuses pour votre pèlerinage en toute sécurité.
        </p>
        
        {/* BARRE DE RECHERCHE - Permet de filtrer les agences */}
        <div className="search-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '600px',
          margin: '25px auto 0 auto',
          border: '2px solid #DAAC60',
          borderRadius: '30px',
          padding: '12px 20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(218, 172, 96, 0.1)'
        }}>
          <MapPin size={20} style={{color: '#DAAC60', marginRight: '15px'}} />
          <input
            type="text"
            placeholder="Rechercher une agence, un service, un quartier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flexGrow: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              padding: '8px 0',
              color: '#333'
            }}
          />
        </div>
      </div>

      {/* CARTE TEMPORAIRE - Placeholder pour la future intégration Google Maps */}
      <div className="map-placeholder">
        <div className="map-notice">
          <MapPin size={48} color="#DAAC60" />
          <h3>Carte Interactive (À venir)</h3>
          <p>
            La carte interactive avec leaflet Maps sera intégrée prochainement. 
            En attendant, consultez la liste détaillée des agences agréées ci-dessous.
          </p>
        </div>
      </div>

      {/* STATISTIQUES - Affiche le nombre d'agences trouvées */}
      <div style={{
        textAlign: 'center',
        margin: '20px 0',
        padding: '15px',
        backgroundColor: '#fff3e0',
        borderRadius: '10px',
        border: '1px solid #DAAC60'
      }}>
        <p style={{margin: 0, color: '#DAAC60', fontWeight: 600}}>
          {filteredAgences.length} agence{filteredAgences.length > 1 ? 's' : ''} agréée{filteredAgences.length > 1 ? 's' : ''} trouvée{filteredAgences.length > 1 ? 's' : ''}
          {searchTerm && ` pour "${searchTerm}"`}
        </p>
      </div>

      {/* GRILLE DES AGENCES - Affiche toutes les agences filtrées */}
      <div className="agences-grid">
        {filteredAgences.length > 0 ? (
          filteredAgences.map((agence) => (
            <div 
              key={agence.id} 
              className="agence-card"
              onClick={() => handleAgenceClick(agence)}
            >
              <div className="agence-header">
                <h3 className="agence-name">{agence.name}</h3>
                {/* BADGE CERTIFICATION - Toujours affiché car toutes sont certifiées */}
                <span className="certification-badge">
                  <CheckCircle size={16} />
                  Agréée SGAR
                </span>
              </div>
              
              {/* NOTATION - Affiche les étoiles de notation */}
              <div className="agence-rating">
                {renderStars(agence.rating)}
                <span className="rating-value">({agence.rating})</span>
              </div>

              {/* INFORMATIONS DE BASE */}
              <div className="agence-info">
                <p className="agence-address">
                  <MapPin size={16} />
                  {agence.address}
                </p>
                <p className="agence-description">
                  {agence.description}
                </p>
              </div>

              {/* SERVICES - Affiche les 3 premiers services + indicateur s'il y en a plus */}
              <div className="agence-services">
                {agence.services.slice(0, 3).map((service, index) => (
                  <span key={index} className="service-tag">{service}</span>
                ))}
                {agence.services.length > 3 && (
                  <span className="service-more">+{agence.services.length - 3}</span>
                )}
              </div>

              {/* BOUTON D'ACTION */}
              <button className="contact-btn">
                Voir les détails
              </button>
            </div>
          ))
        ) : (
          /* MESSAGE SI AUCUNE AGENCE TROUVÉE */
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <MapPin size={48} color="#ddd" style={{marginBottom: '20px'}} />
            <h3>Aucune agence trouvée</h3>
            <p>
              Essayez de modifier votre recherche ou parcourez toutes nos agences agréées.
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              style={{
                background: '#DAAC60',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Voir toutes les agences
            </button>
          </div>
        )}
      </div>

      {/* MODAL DE DÉTAILS - S'affiche quand une agence est sélectionnée */}
      {selectedAgence && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* BOUTON DE FERMETURE */}
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {/* EN-TÊTE DE LA MODAL */}
            <div className="modal-header">
              <h2>{selectedAgence.name}</h2>
              <span className="certification-badge">
                <CheckCircle size={16} />
                Agréée SGAR
              </span>
            </div>

            {/* NOTATION DÉTAILLÉE */}
            <div className="modal-rating">
              {renderStars(selectedAgence.rating)}
              <span className="rating-value">({selectedAgence.rating}/5)</span>
            </div>

            {/* INFORMATIONS DE CONTACT */}
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

            {/* DESCRIPTION COMPLÈTE */}
            <div className="modal-description">
              <h4>À propos</h4>
              <p>{selectedAgence.description}</p>
            </div>

            {/* LISTE COMPLÈTE DES SERVICES */}
            <div className="modal-services">
              <h4>Services proposés</h4>
              <div className="services-list">
                {selectedAgence.services.map((service, index) => (
                  <span key={index} className="service-tag">{service}</span>
                ))}
              </div>
            </div>

            {/* BOUTONS D'ACTION - Contact direct */}
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