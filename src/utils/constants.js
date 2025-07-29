// utils/constants.js
// Système de Feature Flags pour REMÈDIA
// Permet d'activer/désactiver certaines fonctionnalités facilement

export const FEATURE_FLAGS = {
  // Commerce électronique
  ECOMMERCE_ENABLED: true,
  
  // Chatbot IA simulé
  CHATBOT_ENABLED: true,
  
  // Géolocalisation des plantes
  GEOLOCATION_ENABLED: true,
  
  // Carte interactive
  MAP_ENABLED: true,
  
  // Mode développement (affiche des infos debug)
  DEV_MODE: false,
  
  // Simulation de scan de plantes
  PLANT_SCAN_ENABLED: true,
  
  // Notifications push simulées
  NOTIFICATIONS_ENABLED: true,
  
  // Mode hors ligne
  OFFLINE_MODE: false
};

// Fonction utilitaire pour vérifier un feature flag
export const isFeatureEnabled = (featureName) => {
  return FEATURE_FLAGS[featureName] || false;
};

// Constantes pour l'application
export const APP_CONFIG = {
  // Délais de simulation
  TYPING_DELAY: 1500,
  SCAN_DELAY: 2000,
  API_DELAY: 800,
  
  // Configuration UI
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  
  // Limites
  MAX_CHAT_MESSAGES: 50,
  MAX_SCAN_RESULTS: 5,
  
  // URLs de base (pour le futur)
  API_BASE_URL: 'https://api.remedia.com',
  CDN_URL: 'https://cdn.remedia.com'
};

// Statuts de conservation des plantes
export const CONSERVATION_STATUS = {
  SAFE: {
    label: 'Cultivable durablement',
    color: 'bg-green-100 text-green-800',
    icon: '🌱'
  },
  THREATENED: {
    label: 'Plante menacée',
    color: 'bg-orange-100 text-orange-800',
    icon: '⚠️'
  },
  ENDANGERED: {
    label: 'En danger critique',
    color: 'bg-red-100 text-red-800',
    icon: '🚨'
  },
  UNKNOWN: {
    label: 'Statut inconnu',
    color: 'bg-gray-100 text-gray-800',
    icon: '❓'
  }
};