// Fichier : src/components/ContactForm.js

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({});

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    if (formData.telephone && !/^(\+224|224)?[0-9\s\-]{8,}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format de téléphone invalide';
    }

    return newErrors;
  };

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur si l'utilisateur corrige le champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Simulation d'envoi (remplacer par votre API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Succès
      setSubmitStatus('success');
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      });
      
      // Cacher le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>
        <Mail className="contact-icon" size={28} />
        Nous Contacter
      </h2>
      <p>
        Vous avez une question sur le pèlerinage ou une suggestion pour améliorer HAJJ-GUI ? 
        Nous sommes là pour vous accompagner.
      </p>

      {/* Messages de statut */}
      {submitStatus === 'success' && (
        <div className="success-message message-fade-in">
          <CheckCircle size={20} />
          Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message message-fade-in">
          <AlertCircle size={20} />
          Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nom">
              Nom complet <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom et prénom"
              className={errors.nom ? 'error' : ''}
            />
            {errors.nom && <span className="error-text">{errors.nom}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telephone">
              Téléphone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+224 XXX XX XX XX"
              className={errors.telephone ? 'error' : ''}
            />
            {errors.telephone && <span className="error-text">{errors.telephone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre.email@exemple.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="sujet">
              Sujet <span className="required">*</span>
            </label>
            <input
              type="text"
              id="sujet"
              name="sujet"
              value={formData.sujet}
              onChange={handleChange}
              placeholder="Objet de votre message"
              className={errors.sujet ? 'error' : ''}
            />
            {errors.sujet && <span className="error-text">{errors.sujet}</span>}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre question, suggestion ou préoccupation..."
            rows="6"
            className={errors.message ? 'error' : ''}
          ></textarea>
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Envoi en cours...'
          ) : (
            <>
              <Send size={18} />
              Envoyer le message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;