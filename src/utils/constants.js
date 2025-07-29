// ─────────────────────────────────────────────
// REMÉDIA – Configuration centralisée
// Inclut : Feature Flags, Configuration UI, Statuts Plantes
// ─────────────────────────────────────────────

/**
 * Feature Flags — Activer/Désactiver dynamiquement des modules
 */
export const FEATURE_FLAGS = {
  ECOMMERCE_ENABLED: true,         // Activer le module e-commerce
  CHATBOT_ENABLED: true,           // Activer le chatbot IA
  GEOLOCATION_ENABLED: true,       // Afficher la géolocalisation des plantes
  MAP_ENABLED: true,               // Activer la carte interactive
  DEV_MODE: false,                 // Mode debug : infos console et helpers
  PLANT_SCAN_ENABLED: true,        // Activer la simulation de scan
  NOTIFICATIONS_ENABLED: true,     // Notifications push simulées
  OFFLINE_MODE: false              // Activer mode hors-ligne
};

/**
 * Vérifie si une fonctionnalité est activée.
 * @param {string} flagName - Nom exact du flag
 * @returns {boolean}
 */
export const isFeatureEnabled = (flagName) => {
  return Boolean(FEATURE_FLAGS[flagName]);
};

/**
 * Configuration générale de l'application
 */
export const APP_CONFIG = {
  // Délais simulés pour l’UX
  TYPING_DELAY: 1500,
  SCAN_DELAY: 2000,
  API_DELAY: 800,

  // UI & UX
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,

  // Limites & Sécurité
  MAX_CHAT_MESSAGES: 50,
  MAX_SCAN_RESULTS: 5,

  // Endpoints (à adapter selon l’environnement)
  API_BASE_URL: 'https://api.remedia.com',
  CDN_URL: 'https://cdn.remedia.com'
};

/**
 * Statuts de conservation des plantes — Données IUCN simulées
 */
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
