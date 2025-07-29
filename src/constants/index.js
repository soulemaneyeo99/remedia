// src/constants/index.js
// 🚀 REMÈDIA - Configuration globale et Feature Flags
// Hackathon 24h - Architecture modulaire pour évolutivité

export const FEATURE_FLAGS = {
  // E-commerce simulation (pas encore implémenté)
  SHOP_ENABLED: false,
  
  // Géolocalisation des plantes (en cours)
  PLANT_GEOLOCATION: true,
  
  // Mode démo pour le hackathon
  DEMO_MODE: true,
  
  // Fonctionnalités futures
  USER_AUTHENTICATION: false,
  PLANT_IDENTIFICATION_AI: false,
  OFFLINE_MODE: false,
  
  // Fonctionnalités éducatives
  CONSERVATION_ALERTS: true,
  CHEMICAL_COMPOUNDS_DISPLAY: true,
};

export const APP_CONFIG = {
  // Timing pour les simulations
  SCAN_SIMULATION_DELAY: 2000, // 2s pour simuler le scan
  CHATBOT_TYPING_DELAY: 1500,  // 1.5s pour simuler la réflexion
  TYPING_SPEED: 50,            // ms par caractère
  
  // Paramètres UX
  MAX_RECENT_SCANS: 5,
  DEFAULT_PLANT_IMAGE: '/images/placeholder-plant.jpg',
  
  // Messages système
  CONSERVATION_MESSAGE: {
    MENACEE: "⚠️ Espèce menacée - Privilégier la culture",
    COMMUNE: "🌱 Espèce commune - Cueillette raisonnée possible",
    CULTIVER: "🏡 À cultiver de préférence"
  }
};

export const CHEMICAL_COMPOUNDS_COLORS = {
  'Alcaloïdes': 'bg-purple-100 text-purple-800',
  'Flavonoïdes': 'bg-blue-100 text-blue-800',
  'Saponines': 'bg-green-100 text-green-800',
  'Tanins': 'bg-amber-100 text-amber-800',
  'Huiles essentielles': 'bg-rose-100 text-rose-800',
  'Composés phénoliques': 'bg-indigo-100 text-indigo-800',
  'Polysaccharides': 'bg-teal-100 text-teal-800',
  'Glycosides': 'bg-orange-100 text-orange-800'
};

export const PLANT_ORIGINS = {
  // Coordonnées approximatives pour la mini-carte
  'Sénégal': { lat: 14.6928, lng: -17.4467, country: '🇸🇳' },
  'Mali': { lat: 17.5707, lng: -3.9962, country: '🇲🇱' },
  'Burkina Faso': { lat: 12.2383, lng: -1.5616, country: '🇧🇫' },
  'Ghana': { lat: 7.9465, lng: -1.0232, country: '🇬🇭' },
  'Cameroun': { lat: 7.3697, lng: 12.3547, country: '🇨🇲' },
  'Madagascar': { lat: -18.8792, lng: 47.5079, country: '🇲🇬' },
  'Afrique du Sud': { lat: -30.5595, lng: 22.9375, country: '🇿🇦' },
  'Kenya': { lat: -0.0236, lng: 37.9062, country: '🇰🇪' },
}