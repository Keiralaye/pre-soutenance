// Fichier : src/components/Checklist.js

import React, { useState } from 'react';
import './Checklist.css';

function Checklist() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Passeport valide (minimum 6 mois)', isCompleted: false },
    { id: 2, name: 'Carte d\'Identité Nationale', isCompleted: false },
    { id: 3, name: 'Acte de Naissance', isCompleted: false },
    { id: 4, name: '4 photos d\'identité récentes', isCompleted: false },
    { id: 5, name: 'Certificat de vaccination (fièvre jaune, méningite)', isCompleted: false },
    { id: 6, name: 'Attestation de résidence', isCompleted: false },
    { id: 7, name: 'Certificat médical', isCompleted: false },
    { id: 8, name: 'Copie du livret de famille (pour les femmes accompagnées)', isCompleted: false },
    { id: 9, name: 'Autorisation de sortie du territoire (pour mineurs)', isCompleted: false },
    { id: 10, name: 'Preuve de paiement des frais du Hajj', isCompleted: false },
  ]);

  // ... (le reste du code reste inchangé) ...

  const handleCheckboxChange = (id) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === id ? { ...doc, isCompleted: !doc.isCompleted } : doc
    );
    setDocuments(updatedDocuments);
  };

  const completedCount = documents.filter((doc) => doc.isCompleted).length;
  const totalCount = documents.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="checklist-container">
      <h1>Votre Checklist de Documents</h1>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <p className="progress-text">{completedCount}/{totalCount} Documents Complétés</p>
      
      <ul className="document-list">
        {documents.map((document) => (
          <li key={document.id}>
            <input
              type="checkbox"
              id={`document-${document.id}`}
              checked={document.isCompleted}
              onChange={() => handleCheckboxChange(document.id)}
            />
            <label htmlFor={`document-${document.id}`}>{document.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;