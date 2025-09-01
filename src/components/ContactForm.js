// Fichier : src/components/ContactForm.js

import React from 'react';
import './ContactForm.css'; // S'assurer que le fichier de style est lié

function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu pourrais simuler l'envoi d'un message
    // Pour l'instant, nous affichons juste une alerte simple.
    alert('Merci pour votre message ! Nous vous contacterons bientôt.');
    // Dans un vrai projet, tu enverrais les données à ton backend ici.
  };

  return (
    <div className="contact-form-container">
      <h2>Nous Contacter</h2>
      <p>Vous avez une question ou une suggestion ? Écrivez-nous !</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="submit-btn">Envoyer</button>
      </form>
    </div>
  );
}

export default ContactForm;