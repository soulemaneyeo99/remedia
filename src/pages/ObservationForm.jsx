import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Leaf, MessageCircle, CheckCircle, Loader, Camera, AlertTriangle } from 'lucide-react';

const ObservationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plant } = location.state || {};

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [formData, setFormData] = useState({
    habitat: '',
    condition: '',
    comment: ''
  });

  // Simulation de la géolocalisation
  const simulateGeolocation = () => {
    setLoading(true);
    setTimeout(() => {
      // Coordonnées simulées pour l'Afrique de l'Ouest
      const mockCoords = {
        lat: 12.3456 + (Math.random() - 0.5) * 10,
        lng: -1.5678 + (Math.random() - 0.5) * 10
      };
      setCoordinates(mockCoords);
      setLocationName(`${mockCoords.lat.toFixed(4)}, ${mockCoords.lng.toFixed(4)}`);
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  // Vraie géolocalisation (fallback)
  const getRealGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationName(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          setLoading(false);
          setStep(2);
        },
        () => {
          // Si erreur, utiliser la simulation
          simulateGeolocation();
        }
      );
    } else {
      simulateGeolocation();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulation de l'ajout à la base de données
    setTimeout(() => {
      const newObservation = {
        id: `obs_${Date.now()}`,
        plantId: plant?.id || 'unknown',
        plantName: plant?.nom || 'Plante inconnue',
        coordinates,
        location: locationName,
        habitat: formData.habitat,
        condition: formData.condition,
        comment: formData.comment,
        timestamp: new Date().toISOString(),
        contributor: `User_${Math.floor(Math.random() * 1000)}`
      };

      // Simuler l'ajout local (localStorage pour le demo)
      const existingObservations = JSON.parse(localStorage.getItem('observations') || '[]');
      existingObservations.push(newObservation);
      localStorage.setItem('observations', JSON.stringify(existingObservations));

      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const habitatOptions = [
    { value: 'foret', label: '🌳 Forêt', icon: '🌳' },
    { value: 'jardin', label: '🏡 Jardin/Cour', icon: '🏡' },
    { value: 'bord_champ', label: '🌾 Bord de champ', icon: '🌾' },
    { value: 'bord_route', label: '🛣️ Bord de route', icon: '🛣️' },
    { value: 'autre', label: '📍 Autre lieu', icon: '📍' }
  ];

  const conditionOptions = [
    { value: 'saine', label: '💚 Plante saine', color: 'text-green-600', bg: 'bg-green-50' },
    { value: 'endommagee', label: '⚠️ Endommagée', color: 'text-orange-600', bg: 'bg-orange-50' },
    { value: 'abondante', label: '🌿 Très abondante', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { value: 'rare', label: '🔴 Devenue rare', color: 'text-red-600', bg: 'bg-red-50' }
  ];

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 text-orange-500" size={48} />
          <p className="text-gray-600 mb-4">Aucune plante sélectionnée pour l'observation</p>
          <button 
            onClick={() => navigate('/scan')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retour au scan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">Observation Écologique</h1>
            <div className="flex space-x-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full ${
                    s <= step ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
            <img 
              src={plant.image} 
              alt={plant.nom}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{plant.nom}</h3>
              <p className="text-sm text-gray-600">{plant.nom_scientifique}</p>
            </div>
          </div>
        </div>

        {/* Contenu selon l'étape */}
        <div className="bg-white rounded-b-2xl p-6 shadow-lg">
          {step === 1 && (
            <div className="text-center">
              <MapPin className="mx-auto mb-4 text-green-600" size={48} />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Localisation de l'observation
              </h2>
              <p className="text-gray-600 mb-6">
                Nous avons besoin de votre position pour cartographier cette espèce et aider à sa préservation.
              </p>
              
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="animate-spin text-green-600" size={20} />
                  <span className="text-gray-600">Localisation en cours...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={getRealGeolocation}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📍 Utiliser ma position GPS
                  </button>
                  
                  <button
                    onClick={simulateGeolocation}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    🎯 Utiliser position simulée
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="mx-auto mb-2 text-green-600" size={32} />
                <p className="text-sm text-gray-600">Position : {locationName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Leaf className="inline mr-2" size={16} />
                  Lieu de pousse *
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {habitatOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, habitat: option.value })}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        formData.habitat === option.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  État de la plante *
                </label>
                <div className="space-y-2">
                  {conditionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, condition: option.value })}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        formData.condition === option.value
                          ? `border-green-500 ${option.bg} ${option.color}`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <MessageCircle className="inline mr-2" size={16} />
                  Commentaire (facultatif)
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Observations particulières, contexte, menaces observées..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  rows="3"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.habitat || !formData.condition || loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  !formData.habitat || !formData.condition || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader className="animate-spin" size={20} />
                    <span>Enregistrement...</span>
                  </div>
                ) : (
                  '✅ Contribuer à la préservation'
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto text-green-600" size={64} />
              <h2 className="text-lg font-bold text-gray-800">
                Merci pour votre contribution ! 🌿
              </h2>
              <p className="text-gray-600">
                Votre observation aide à préserver <strong>{plant.nom}</strong> et la biodiversité africaine.
              </p>
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-800">
                  📊 Votre donnée rejoint notre base collaborative pour le suivi écologique des espèces médicinales.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/observations-map')}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  🗺️ Voir la carte
                </button>
                <button
                  onClick={() => navigate('/scan')}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  📱 Nouveau scan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObservationForm;