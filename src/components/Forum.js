// Fichier : src/components/Forum.js

import React, { useState } from 'react';
import './Forum.css';
import { MessageSquare, Send } from 'lucide-react';

function Forum() {
  // Messages avec plus de données
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      author: 'Visiteur', 
      text: 'Bienvenue sur le forum HAJJ-GUI ! Partagez vos questions, expériences et conseils pour un pèlerinage serein et organisé.', 
      timestamp: new Date(Date.now() - 3600000), // 1 heure avant
      likes: 3 
    },
    { 
      id: 2, 
      author: 'Aminata D.', 
      text: 'Bonjour à tous ! J\'ai une question concernant les documents à fournir. Est-ce que quelqu\'un pourrait me dire si le certificat médical doit être récent ?', 
      timestamp: new Date(Date.now() - 7200000), // 2 heures avant
      likes: 1 
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gère l'envoi du message
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (newMessage.trim().length < 10) {
      setError('Votre message doit contenir au moins 10 caractères.');
      return;
    }

    if (author.trim() === '') {
      setError('Veuillez indiquer votre nom.');
      return;
    }

    setIsSubmitting(true);

    // Simulation d'un délai d'envoi
    setTimeout(() => {
      const messageObject = {
        id: Date.now(), // Utilise timestamp comme ID unique
        author: author.trim(),
        text: newMessage.trim(),
        timestamp: new Date(),
        likes: 0
      };

      setMessages(prevMessages => [messageObject, ...prevMessages]);
      
      // Réinitialiser le formulaire
      setNewMessage('');
      setAuthor('');
      setError('');
      setIsSubmitting(false);
    }, 1000);
  };

  // Gère l'ajout d'un like
  const handleLike = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };
  
  // Gère le retrait d'un like
  const handleDislike = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, likes: Math.max(0, msg.likes - 1) } : msg
      )
    );
  };

  // Fonction pour formater la date
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
      <div className="forum-header">
        <h2>
          <MessageSquare size={32} style={{display: 'inline', marginRight: '10px', color: '#DAAC60'}} />
          Forum des Pèlerins
        </h2>
        <p className="forum-subtitle">
          Échangez avec la communauté, partagez vos expériences et trouvez des réponses à vos questions sur le Hajj.
        </p>
      </div>
      
      {/* Affichage du message d'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Formulaire pour poster un nouveau message */}
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

      {/* Liste des messages */}
      <div className="messages-section">
        {messages.length === 0 ? (
          <div className="empty-forum">
            <h3>Aucun message pour le moment</h3>
            <p>Soyez le premier à partager votre expérience !</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <div className="message-header">
                <span className="message-author">{msg.author}</span>
                <span className="message-timestamp">
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
              <p className="message-text">{msg.text}</p>
              <div className="message-actions">
                <button 
                  onClick={() => handleLike(msg.id)} 
                  className={`like-btn ${msg.likes > 0 ? 'liked' : ''}`}
                >
                  👍 {msg.likes > 0 && `(${msg.likes})`}
                </button>
                <button 
                  onClick={() => handleDislike(msg.id)} 
                  className="dislike-btn"
                >
                  👎
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;