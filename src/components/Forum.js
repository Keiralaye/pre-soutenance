// Fichier : src/components/Forum.js

import React, { useState } from 'react';
import './Forum.css';
import { MessageSquare, Send, Shield, User, ThumbsUp, ThumbsDown } from 'lucide-react';

function Forum() {
  // DONNÉES INITIALES - Messages avec informations étendues pour l'administration
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      author: 'Admin SGAR', 
      text: 'Bienvenue sur le forum officiel HAJJ-GUI ! Nous sommes là pour répondre à toutes vos questions concernant le pèlerinage. N\'hésitez pas à nous solliciter.', 
      timestamp: new Date(Date.now() - 3600000),
      likes: 8,
      dislikes: 0,
      isAdmin: true, // MARQUEUR ADMIN - Identifie les messages administratifs
      userLiked: false, // État du like de l'utilisateur actuel
      userDisliked: false // État du dislike de l'utilisateur actuel
    },
    { 
      id: 2, 
      author: 'Aminata D.', 
      text: 'Bonjour ! J\'ai une question concernant les documents à fournir. Est-ce que quelqu\'un pourrait me dire si le certificat médical doit être récent ?', 
      timestamp: new Date(Date.now() - 7200000),
      likes: 3,
      dislikes: 0,
      isAdmin: false,
      userLiked: false,
      userDisliked: false,
      // RÉPONSE ADMIN - Champ pour stocker la réponse administrative
      adminResponse: {
        id: 3,
        text: 'Bonjour Aminata, le certificat médical doit dater de moins de 3 mois avant la date de dépôt de votre dossier. Vous pouvez consulter la liste complète des documents requis dans notre section Ressources.',
        timestamp: new Date(Date.now() - 6900000),
        author: 'Admin SGAR'
      }
    },
    { 
      id: 4, 
      author: 'Ibrahim K.', 
      text: 'Ma famille et moi préparons notre pèlerinage pour 2025. Quelles sont les dates limites d\'inscription auprès des agences agréées ?', 
      timestamp: new Date(Date.now() - 10800000),
      likes: 2,
      dislikes: 0,
      isAdmin: false,
      userLiked: false,
      userDisliked: false
    },
  ]);

  // ÉTATS DU COMPOSANT
  const [newMessage, setNewMessage] = useState(''); // Nouveau message utilisateur
  const [author, setAuthor] = useState(''); // Nom de l'auteur
  const [error, setError] = useState(''); // Messages d'erreur
  const [isSubmitting, setIsSubmitting] = useState(false); // État de soumission
  const [isAdminMode, setIsAdminMode] = useState(false); // MODE ADMIN - Active/désactive le mode administrateur
  const [adminPassword, setAdminPassword] = useState(''); // Mot de passe admin
  const [adminResponse, setAdminResponse] = useState(''); // Réponse administrative
  const [respondingTo, setRespondingTo] = useState(null); // ID du message auquel l'admin répond

  // CONFIGURATION ADMIN - Mot de passe simple (à sécuriser en production)
  const ADMIN_PASSWORD = 'admin2024'; // À remplacer par un système d'authentification sécurisé

  // FONCTION D'AUTHENTIFICATION ADMIN
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setAdminPassword('');
      setError('');
    } else {
      setError('Mot de passe administrateur incorrect.');
    }
  };

  // FONCTION DE DÉCONNEXION ADMIN
  const handleAdminLogout = () => {
    setIsAdminMode(false);
    setRespondingTo(null);
    setAdminResponse('');
  };

  // GESTION DES LIKES - Permet aux utilisateurs de liker un message
  const handleLike = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          // Si déjà liké, on retire le like
          if (msg.userLiked) {
            return { 
              ...msg, 
              likes: msg.likes - 1, 
              userLiked: false 
            };
          } else {
            // Si on avait disliké, on retire le dislike et on ajoute le like
            const newLikes = msg.likes + 1;
            const newDislikes = msg.userDisliked ? msg.dislikes - 1 : msg.dislikes;
            return { 
              ...msg, 
              likes: newLikes,
              dislikes: newDislikes,
              userLiked: true,
              userDisliked: false 
            };
          }
        }
        return msg;
      })
    );
  };

  // GESTION DES DISLIKES - Permet aux utilisateurs de disliker un message
  const handleDislike = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          // Si déjà disliké, on retire le dislike
          if (msg.userDisliked) {
            return { 
              ...msg, 
              dislikes: msg.dislikes - 1, 
              userDisliked: false 
            };
          } else {
            // Si on avait liké, on retire le like et on ajoute le dislike
            const newDislikes = msg.dislikes + 1;
            const newLikes = msg.userLiked ? msg.likes - 1 : msg.likes;
            return { 
              ...msg, 
              likes: newLikes,
              dislikes: newDislikes,
              userLiked: false,
              userDisliked: true 
            };
          }
        }
        return msg;
      })
    );
  };

  // SOUMISSION D'UN MESSAGE UTILISATEUR
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDATION DU FORMULAIRE
    if (newMessage.trim().length < 10) {
      setError('Votre message doit contenir au moins 10 caractères.');
      return;
    }

    if (author.trim() === '') {
      setError('Veuillez indiquer votre nom.');
      return;
    }

    setIsSubmitting(true);

    // SIMULATION D'ENVOI - Délai artificiel pour l'expérience utilisateur
    setTimeout(() => {
      const messageObject = {
        id: Date.now(),
        author: author.trim(),
        text: newMessage.trim(),
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
        isAdmin: false,
        userLiked: false,
        userDisliked: false
      };

      setMessages(prevMessages => [messageObject, ...prevMessages]);
      
      // RÉINITIALISATION DU FORMULAIRE
      setNewMessage('');
      setAuthor('');
      setError('');
      setIsSubmitting(false);
    }, 1000);
  };

  // SOUMISSION D'UNE RÉPONSE ADMIN
  const handleAdminResponseSubmit = (messageId) => {
    if (adminResponse.trim().length < 5) {
      setError('La réponse doit contenir au moins 5 caractères.');
      return;
    }

    // AJOUT DE LA RÉPONSE AU MESSAGE
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            adminResponse: {
              id: Date.now(),
              text: adminResponse.trim(),
              timestamp: new Date(),
              author: 'Admin SGAR'
            }
          };
        }
        return msg;
      })
    );

    // RÉINITIALISATION
    setAdminResponse('');
    setRespondingTo(null);
    setError('');
  };

  // FONCTION DE FORMATAGE DES TIMESTAMPS
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    return timestamp.toLocaleDateString('fr-FR');
  };

  return (
    <div className="forum-container">
      {/* EN-TÊTE DU FORUM */}
      <div className="forum-header">
        <h2>
          <MessageSquare size={32} style={{display: 'inline', marginRight: '10px', color: '#DAAC60'}} />
          Forum des Pèlerins
        </h2>
        <p className="forum-subtitle">
          Échangez avec la communauté, partagez vos expériences et trouvez des réponses à vos questions sur le Hajj.
        </p>
      </div>

      {/* SECTION ADMIN - Connexion et gestion */}
      <div className="admin-section" style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '30px',
        border: '2px solid #e0e0e0'
      }}>
        {!isAdminMode ? (
          /* FORMULAIRE DE CONNEXION ADMIN */
          <div>
            <h3 style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#333'}}>
              <Shield size={20} color="#DAAC60" />
              Espace Administrateur
            </h3>
            <form onSubmit={handleAdminLogin} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <input
                type="password"
                placeholder="Mot de passe admin"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
              <button 
                type="submit"
                style={{
                  backgroundColor: '#DAAC60',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Se connecter
              </button>
            </form>
          </div>
        ) : (
          /* INTERFACE ADMIN CONNECTÉ */
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#333', margin: 0}}>
                <Shield size={20} color="#28a745" />
                Connecté en tant qu'Admin SGAR
              </h3>
              <button 
                onClick={handleAdminLogout}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Se déconnecter
              </button>
            </div>
            <p style={{margin: '10px 0 0 0', color: '#666', fontSize: '14px'}}>
              Vous pouvez maintenant répondre aux messages des utilisateurs.
            </p>
          </div>
        )}
      </div>
      
      {/* AFFICHAGE DES ERREURS */}
      {error && <div className="error-message">{error}</div>}

      {/* FORMULAIRE DE NOUVEAU MESSAGE */}
      <div className="message-form-section">
        <h3 className="form-title">Partager votre message</h3>
        <form onSubmit={handleMessageSubmit} className="message-form">
          <input
            type="text"
            className="author-input"
            placeholder="Votre nom *"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isSubmitting}
            maxLength={50}
          />
          <textarea
            className="message-input"
            rows="5"
            placeholder="Écrivez votre message, question ou conseil... (minimum 10 caractères)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSubmitting}
            maxLength={500}
          />
          <button 
            type="submit" 
            className="post-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Publication...'
            ) : (
              <>
                <Send size={18} style={{marginRight: '8px'}} />
                Publier
              </>
            )}
          </button>
        </form>
      </div>

      {/* LISTE DES MESSAGES */}
      <div className="messages-section">
        {messages.length === 0 ? (
          <div className="empty-forum">
            <h3>Aucun message pour le moment</h3>
            <p>Soyez le premier à partager votre expérience !</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message-card ${msg.isAdmin ? 'admin-message' : ''}`}>
              {/* EN-TÊTE DU MESSAGE */}
              <div className="message-header">
                <span className={`message-author ${msg.isAdmin ? 'admin-author' : ''}`}>
                  {msg.isAdmin ? <Shield size={16} style={{marginRight: '5px'}} /> : <User size={16} style={{marginRight: '5px'}} />}
                  {msg.author}
                  {msg.isAdmin && <span style={{marginLeft: '8px', fontSize: '12px', backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '10px'}}>OFFICIEL</span>}
                </span>
                <span className="message-timestamp">
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>

              {/* CONTENU DU MESSAGE */}
              <p className="message-text">{msg.text}</p>

              {/* ACTIONS SUR LE MESSAGE - Likes/Dislikes */}
              <div className="message-actions">
                <button 
                  onClick={() => handleLike(msg.id)} 
                  className={`like-btn ${msg.userLiked ? 'liked' : ''}`}
                  style={{
                    backgroundColor: msg.userLiked ? '#e8f5e9' : '#f8f9fa',
                    borderColor: msg.userLiked ? '#4caf50' : '#e0e0e0',
                    color: msg.userLiked ? '#2e7d32' : '#666'
                  }}
                >
                  <ThumbsUp size={16} />
                  {msg.likes > 0 && ` ${msg.likes}`}
                </button>
                <button 
                  onClick={() => handleDislike(msg.id)} 
                  className={`dislike-btn ${msg.userDisliked ? 'disliked' : ''}`}
                  style={{
                    backgroundColor: msg.userDisliked ? '#ffebee' : '#f8f9fa',
                    borderColor: msg.userDisliked ? '#f44336' : '#e0e0e0',
                    color: msg.userDisliked ? '#c62828' : '#666'
                  }}
                >
                  <ThumbsDown size={16} />
                  {msg.dislikes > 0 && ` ${msg.dislikes}`}
                </button>

                {/* BOUTON RÉPONDRE ADMIN */}
                {isAdminMode && !msg.isAdmin && !msg.adminResponse && (
                  <button 
                    onClick={() => setRespondingTo(msg.id)}
                    style={{
                      backgroundColor: '#DAAC60',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Shield size={14} />
                    Répondre
                  </button>
                )}
              </div>

              {/* FORMULAIRE DE RÉPONSE ADMIN */}
              {isAdminMode && respondingTo === msg.id && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#f0f8ff',
                  borderRadius: '10px',
                  border: '2px solid #DAAC60'
                }}>
                  <h4 style={{margin: '0 0 10px 0', color: '#DAAC60'}}>Réponse officielle SGAR :</h4>
                  <textarea
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    placeholder="Votre réponse officielle..."
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      marginBottom: '10px',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button
                      onClick={() => handleAdminResponseSubmit(msg.id)}
                      style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Publier la réponse
                    </button>
                    <button
                      onClick={() => {setRespondingTo(null); setAdminResponse('');}}
                      style={{
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              {/* AFFICHAGE DE LA RÉPONSE ADMIN */}
              {msg.adminResponse && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '10px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <span style={{
                      fontWeight: '600',
                      color: '#28a745',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Shield size={16} />
                      {msg.adminResponse.author}
                      <span style={{fontSize: '12px', backgroundColor: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '10px'}}>OFFICIEL</span>
                    </span>
                    <span style={{fontSize: '12px', color: '#666'}}>
                      {formatTimestamp(msg.adminResponse.timestamp)}
                    </span>
                  </div>
                  <p style={{margin: 0, color: '#333', lineHeight: '1.5'}}>
                    {msg.adminResponse.text}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;