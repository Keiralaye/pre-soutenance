// Fichier : src/components/Ressources.js

import React, { useState } from 'react';
import './Ressources.css';
import { Search, Download, FileText, File, BookOpen, Heart, Info, HelpCircle } from 'lucide-react';

function Ressources() {
  // Données enrichies pour les ressources avec descriptions
  const ressourcesList = [
    { 
      id: 1, 
      name: 'Guide Complet du Pèlerin 2025', 
      type: 'PDF', 
      category: 'Guides',
      description: 'Guide détaillé avec toutes les étapes du pèlerinage, les rituels et les conseils pratiques.',
      url: '#',
      icon: 'book'
    },
    // { 
    //   id: 2, 
    //   name: 'Formulaire d\'Inscription Officiel', 
    //   type: 'DOC', 
    //   category: 'Formulaires',
    //   description: 'Formulaire officiel du SGAR pour l\'inscription au pèlerinage du Hajj.',
    //   url: '#',
    //   icon: 'file'
    // },
    // { 
    //   id: 3, 
    //   name: 'Règlement Intérieur du Hajj', 
    //   type: 'PDF', 
    //   category: 'Règlements',
    //   description: 'Règlement officiel et conditions d\'organisation du pèlerinage en Guinée.',
    //   url: '#',
    //   icon: 'text'
    // },
    { 
      id: 4, 
      name: 'Liste des Vaccinations Obligatoires', 
      type: 'PDF', 
      category: 'Santé',
      description: 'Informations sur les vaccinations requises et centres de vaccination agréés.',
      url: '#',
      icon: 'health'
    },
    { 
      id: 5, 
      name: 'Préparation Spirituelle du Pèlerin', 
      type: 'DOC', 
      category: 'Guides',
      description: 'Conseils pour se préparer spirituellement et mentalement au pèlerinage.',
      url: '#',
      icon: 'book'
    },
    { 
      id: 6, 
      name: 'Informations Visas et Délais', 
      type: 'PDF', 
      category: 'Informations Pratiques',
      description: 'Procédures de demande de visa, délais et documents requis.',
      url: '#',
      icon: 'info'
    },
    { 
      id: 7, 
      name: 'Itinéraire Recommandé à La Mecque', 
      type: 'PDF', 
      category: 'Guides',
      description: 'Plans détaillés des lieux saints et itinéraires recommandés.',
      url: '#',
      icon: 'book'
    },
    { 
      id: 8, 
      name: 'Questions Fréquemment Posées', 
      type: 'DOC', 
      category: 'Informations Pratiques',
      description: 'Réponses aux questions les plus courantes des futurs pèlerins.',
      url: '#',
      icon: 'help'
    },
  ];

  // État pour le filtre de catégorie sélectionné
  const [filterCategory, setFilterCategory] = useState('Tout');
  // État pour le terme de recherche dans la barre
  const [searchTerm, setSearchTerm] = useState('');

  // Génère la liste des catégories uniques à partir des ressources
  const categories = ['Tout', ...new Set(ressourcesList.map(res => res.category))];

  // Filtre les ressources en fonction de la catégorie ET du terme de recherche
  const filteredRessources = ressourcesList.filter(res => {
    const matchesCategory = filterCategory === 'Tout' || res.category === filterCategory;
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fonction pour obtenir l'icône appropriée
  const getIcon = (iconType) => {
    switch(iconType) {
      case 'book': return <BookOpen size={24} />;
      case 'file': return <File size={24} />;
      case 'text': return <FileText size={24} />;
      case 'health': return <Heart size={24} />;
      case 'info': return <Info size={24} />;
      case 'help': return <HelpCircle size={24} />;
      default: return <FileText size={24} />;
    }
  };

  return (
    <div className="ressources-container">
      <div className="ressources-header">
        <h1>Ressources Indispensables</h1>
        <p className="ressources-intro">
          Retrouvez ici tous les documents officiels, guides pratiques et informations utiles 
          pour un pèlerinage réussi et serein. Tous les documents sont fournis par le SGAR.
        </p>

        {/* SECTION DES FILTRES */}
        <div className="ressource-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* SECTION DE LA BARRE DE RECHERCHE */}
        <div className="search-bar-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher des documents..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* GRILLE DES RESSOURCES */}
      {filteredRessources.length > 0 ? (
        <div className="ressources-grid">
          {filteredRessources.map((ressource) => (
            <div key={ressource.id} className="ressource-card">
              <div className="ressource-header-card">
                <div className="ressource-icon">
                  {getIcon(ressource.icon)}
                </div>
                <div className="ressource-type-badge">
                  {ressource.type}
                </div>
              </div>
              
              <h3 className="ressource-name">{ressource.name}</h3>
              <p className="ressource-category">{ressource.category}</p>
              <p className="ressource-description">{ressource.description}</p>
              
              <a 
                href={ressource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="download-link"
              >
                <Download size={16} className="download-icon" />
                Télécharger
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-resources">
          <div className="no-resources-icon">📄</div>
          <p>Aucune ressource trouvée pour votre recherche.</p>
          <p>Essayez de modifier vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
}

export default Ressources;