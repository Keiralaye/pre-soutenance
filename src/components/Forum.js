// Fichier : src/components/Forum.js

import React, { useState } from 'react';
import './Forum.css'; // S'assurer que le fichier de style est lié

function Forum() {
  // Les messages sont stockés dans le "state"
  // On ajoute un champ 'likes' à chaque message
  const [messages, setMessages] = useState([
    { id: 1, author: 'Visiteur', text: 'Bienvenue sur le forum ! Partagez vos questions et vos expériences ici.', timestamp: new Date(), likes: 0 },
  ]);

  // Le nouveau message à poster et le nom de l'auteur
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');
  
  // L'état pour gérer le message d'erreur
  const [error, setError] = useState('');

  // Gère l'envoi du message
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      setError('Veuillez écrire un message avant de publier.');
      return; // Empêche l'envoi si le message est vide
    }

    // Créer un nouvel objet message
    const messageObject = {
      id: messages.length + 1,
      author: author || 'Visiteur Anonyme',
      text: newMessage,
      timestamp: new Date(),
      likes: 0 // Initialise les likes à 0
    };

    // Ajouter le nouveau message à la liste existante
    setMessages([...messages, messageObject]);
    
    // Réinitialiser le formulaire et le message d'erreur
    setNewMessage('');
    setAuthor('');
    setError('');
  };

  // Gère l'ajout d'un like
  const handleLike = (messageId) => {
    // On utilise la fonction de mise à jour de l'état (prevMessages)
    // pour s'assurer de travailler sur la dernière version du tableau.
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

  return (
    <div className="forum-container">
      <h2>Forum des Communautés</h2>
      
      {/* Affichage du message d'erreur s'il existe */}
      {error && <div className="error-message">{error}</div>}

      <div className="messages-section">
        {messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <div className="message-header">
              <span className="message-author">{msg.author}</span>
              <span className="message-timestamp">{msg.timestamp.toLocaleString()}</span>
            </div>
            <p className="message-text">{msg.text}</p>
            <div className="message-actions">
              <button onClick={() => handleLike(msg.id)} className="like-btn">
                👍 ({msg.likes})
              </button>
              <button onClick={() => handleDislike(msg.id)} className="dislike-btn">
                👎
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleMessageSubmit} className="message-form">
        <input
          type="text"
          className="author-input"
          placeholder="Votre nom (facultatif)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          className="message-input"
          rows="4"
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="post-btn">Publier</button>
      </form>
    </div>
  );
}

export default Forum;