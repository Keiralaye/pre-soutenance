import React, { useState, useEffect } from 'react';
import './Checklist.css';
import { CheckCircle } from 'lucide-react';

function Checklist() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Passeport valide (minimum 6 mois)', isCompleted: false },
    { id: 2, name: 'Carte d\'Identite Nationale', isCompleted: false },
    { id: 3, name: 'Acte de Naissance', isCompleted: false },
    { id: 4, name: '4 photos d\'identite recentes', isCompleted: false },
    { id: 5, name: 'Certificat de vaccination (fievre jaune, meningite)', isCompleted: false },
    { id: 6, name: 'Attestation de residence', isCompleted: false },
    { id: 7, name: 'Certificat medical', isCompleted: false },
    { id: 8, name: 'Copie du livret de famille (pour les femmes accompagnees)', isCompleted: false },
    { id: 9, name: 'Autorisation de sortie du territoire (pour mineurs)', isCompleted: false },
    { id: 10, name: 'Preuve de paiement des frais du Hajj', isCompleted: false },
  ]);

  const [progressStats, setProgressStats] = useState({
    completedCount: 0,
    totalCount: 10,
    progressPercentage: 0
  });

  // Effet pour recalculer les statistiques quand les documents changent
  useEffect(() => {
    const completedCount = documents.filter(doc => doc.isCompleted === true).length;
    const totalCount = documents.length;
    const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    setProgressStats({
      completedCount,
      totalCount,
      progressPercentage
    });
  }, [documents]);

  const handleCheckboxChange = (id) => {
    setDocuments(prevDocuments => 
      prevDocuments.map(doc => 
        doc.id === id ? { ...doc, isCompleted: !doc.isCompleted } : doc
      )
    );
  };

  return (
    <div className="checklist-container">
      <h1>Votre Checklist de Documents</h1>
      <p className="checklist-subtitle">
        Suivez votre progression et assurez-vous d'avoir tous les documents necessaires 
        pour votre pelerinage en toute serenite.
      </p>

      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressStats.progressPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {progressStats.completedCount}/{progressStats.totalCount} Documents Completes
        </p>
        <p className="progress-percentage">
          {progressStats.progressPercentage}% termine
        </p>
      </div>
      
      <ul className="document-list">
        {documents.map((document) => (
          <li key={document.id} className={document.isCompleted ? 'completed' : ''}>
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

      <div className="tips-section">
        <h3>
          <CheckCircle size={24} color="#DAAC60" />
          Conseils Pratiques
        </h3>
        <ul>
          <li>Verifiez la validite de votre passeport (minimum 6 mois apres la date de retour)</li>
          <li>Les photos d'identite doivent etre recentes (moins de 6 mois) et conformes aux normes</li>
          <li>Conservez des copies de tous vos documents importants</li>
          <li>Contactez votre medecin pour les vaccinations obligatoires au moins 2 mois avant le depart</li>
          <li>Gardez les originaux et preparez des copies certifiees conformes</li>
        </ul>
      </div>
    </div>
  );
}

export default Checklist;