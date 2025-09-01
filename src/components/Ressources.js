// Fichier : src/components/Ressources.js

import React, { useState } from 'react';
import './Ressources.css';
import { Search } from 'lucide-react'; // Importe l'icône de recherche

function Ressources() {
  // Données factices complètes pour les ressources
  const ressourcesList = [
    { id: 1, name: 'Guide Complet du Pèlerin 2025', type: 'PDF', category: 'Guides', url: '#' },
    { id: 2, name: 'Formulaire d\'Inscription Officiel Hajj', type: 'DOC', category: 'Formulaires', url: '#' },
    { id: 3, name: 'Règlement Intérieur du Hajj en Guinée', type: 'PDF', category: 'Règlements', url: '#' },
    { id: 4, name: 'Liste des Vaccinations Obligatoires', type: 'PDF', category: 'Santé', url: '#' },
    { id: 5, name: 'Conseils pour la Préparation Spirituelle', type: 'DOC', category: 'Guides', url: '#' },
    { id: 6, name: 'Infos sur les Visas et Délais', type: 'PDF', category: 'Informations Pratiques', url: '#' },
    { id: 7, name: 'Itinéraire Recommandé à La Mecque', type: 'PDF', category: 'Guides', url: '#' },
    { id: 8, name: 'Questions Fréquemment Posées (FAQ)', type: 'DOC', category: 'Informations Pratiques', url: '#' },
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
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ressources-container">
      <h1>Ressources Indispensables</h1>
      <p className="ressources-intro">
        Retrouvez ici tous les documents officiels, guides pratiques et informations utiles pour un pèlerinage réussi et serein.
      </p>

      {/* SECTION DES FILTRES - Assurez-vous que ce bloc est bien présent */}
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

      {/* SECTION DE LA BARRE DE RECHERCHE - Assurez-vous que ce bloc est bien présent */}
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

      <ul className="ressources-list">
        {filteredRessources.map((ressource) => (
          <li key={ressource.id} className="ressource-item">
            <div>
              <span className="ressource-name">{ressource.name}</span>
              <span className="ressource-category"> ({ressource.category})</span>
            </div>
            <a href={ressource.url} target="_blank" rel="noopener noreferrer" className="download-link">
              Télécharger <span className="ressource-type">({ressource.type})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ressources;