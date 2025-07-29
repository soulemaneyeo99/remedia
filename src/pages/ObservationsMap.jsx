import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Leaf, TrendingUp, AlertTriangle, Users, Calendar, Filter } from 'lucide-react';

const ObservationsMap = () => {
  const navigate = useNavigate();
  const [observations, setObservations] = useState([]);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Charger les observations (simulé + localStorage)
  useEffect(() => {
    const loadObservations = () => {
      // Données simulées par défaut
      const defaultObservations = [
        {
          id: "obs_001",
          plantId: "baobab",
          plantName: "Baobab",
          coordinates: { lat: 12.3456, lng: -1.5678 },
          location: "Ouagadougou, Burkina Faso",
          habitat: "bord_route",
          condition: "saine",
          comment: "Grand spécimen en bonne santé, beaucoup de fruits",
          timestamp: "2025-07-28T14:30:00Z",
          contributor: "Observateur123"
        },
        {
          id: "obs_002",
          plantId: "moringa",
          plantName: "Moringa",
          coordinates: { lat: 6.1234, lng: 1.2345 },
          location: "Lomé, Togo",
          habitat: "jardin",
          condition: "abondante",
          comment: "Plantation familiale bien entretenue",
          timestamp: "2025-07-27T09:15:00Z",
          contributor: "Botaniste456"
        },
        {
          id: "obs_003",
          plantId: "artemisia",
          plantName: "Artemisia",
          coordinates: { lat: 14.7890, lng: -17.4567 },
          location: "Dakar, Sénégal",
          habitat: "foret",
          condition: "rare",
          comment: "Espèce devenue rare dans cette région",
          timestamp: "2025-07-26T16:45:00Z",
          contributor: "EcoGuardien789"
        }
      ];

      // Ajouter les observations du localStorage
      const localObservations = JSON.parse(localStorage.getItem('observations') || '[]');
      const allObservations = [...defaultObservations, ...localObservations];
      
      setObservations(allObservations);
      setLoading(false);
    };

    setTimeout(loadObservations, 800); // Simulation du chargement
  }, []);

  const getConditionColor = (condition) => {
    const colors = {
      'saine': 'bg-green-500',
      'endommagee': 'bg-orange-500',
      'abondante': 'bg-emerald-500',
      'rare': 'bg-red-500'
    };
    return colors[condition] || 'bg-gray-500';
  };

  const getConditionLabel = (condition) => {
    const labels = {
      'saine': '💚 Saine',
      'endommagee': '⚠️ Endommagée',
      'abondante': '🌿 Abondante',
      'rare': '🔴 Rare'
    };
    return labels[condition] || condition;
  };

  const getHabitatLabel = (habitat) => {
    const labels = {
      'foret': '🌳 Forêt',
      'jardin': '🏡 Jardin',
      'bord_champ': '🌾 Bord de champ',
      'bord_route': '🛣️ Bord de route',
      'autre': '📍 Autre'
    };
    return labels[habitat] || habitat;
  };

  const filteredObservations = observations.filter(obs => {
    if (filter === 'all') return true;
    return obs.condition === filter;
  });

  const stats = {
    total: observations.length,
    rare: observations.filter(obs => obs.condition === 'rare').length,
    saine: observations.filter(obs => obs.condition === 'saine').length,
    species: new Set(observations.map(obs => obs.plantName)).size
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte collaborative...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="mr-3 text-green-600" size={28} />
              Carte Collaborative
            </h1>
            <button
              onClick={() => navigate('/scan')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Ajouter observation
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            🌍 Suivi participatif de la biodiversité des plantes médicinales africaines
          </p>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-800">Observations</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.species}</div>
              <div className="text-sm text-emerald-800">Espèces</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.saine}</div>
              <div className="text-sm text-green-800">Saines</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rare}</div>
              <div className="text-sm text-red-800">À risque</div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium text-gray-700">Filtrer par état :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Toutes', color: 'bg-gray-100' },
              { value: 'saine', label: '💚 Saines', color: 'bg-green-100' },
              { value: 'abondante', label: '🌿 Abondantes', color: 'bg-emerald-100' },
              { value: 'endommagee', label: '⚠️ Endommagées', color: 'bg-orange-100' },
              { value: 'rare', label: '🔴 Rares', color: 'bg-red-100' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.value
                    ? `${filterOption.color} ring-2 ring-green-500`
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carte simulée + Liste des observations */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Carte simulée */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Vue cartographique
            </h3>
            
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 overflow-hidden">
              {/* Simulation d'une carte avec points */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Contours simplifiés de l'Afrique de l'Ouest */}
                  <path
                    d="M50,150 Q100,100 150,120 L200,110 Q250,130 300,140 L320,180 Q280,220 200,210 L150,200 Q100,180 50,150"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* Points d'observation */}
              {filteredObservations.map((obs, index) => (
                <div
                  key={obs.id}
                  className={`absolute w-4 h-4 rounded-full ${getConditionColor(obs.condition)} 
                             cursor-pointer hover:scale-125 transition-transform shadow-lg`}
                  style={{
                    left: `${20 + (index * 60) % 250}px`,
                    top: `${50 + (index * 40) % 150}px`
                  }}
                  onClick={() => setSelectedObservation(obs)}
                  title={`${obs.plantName} - ${getConditionLabel(obs.condition)}`}
                />
              ))}
              
              <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded p-2 text-xs">
                📍 {filteredObservations.length} observations
              </div>
            </div>
          </div>

          {/* Liste des observations */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Leaf className="mr-2" size={20} />
              Observations récentes
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredObservations.slice(0, 10).map((obs) => (
                <div
                  key={obs.id}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedObservation?.id === obs.id ? 'bg-green-50' : ''
                  }`}
                  style={{ borderLeftColor: getConditionColor(obs.condition).replace('bg-', '#') }}
                  onClick={() => setSelectedObservation(obs)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800">{obs.plantName}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(obs.timestamp).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{getConditionLabel(obs.condition)}</p>
                  <p className="text-xs text-gray-500">{getHabitatLabel(obs.habitat)} • {obs.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détail de l'observation sélectionnée */}
        {selectedObservation && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4">
              📊 Détail de l'observation
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">{selectedObservation.plantName}</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>État :</strong> {getConditionLabel(selectedObservation.condition)}</p>
                  <p><strong>Habitat :</strong> {getHabitatLabel(selectedObservation.habitat)}</p>
                  <p><strong>Lieu :</strong> {selectedObservation.location}</p>
                  <p><strong>Observateur :</strong> {selectedObservation.contributor}</p>
                  <p><strong>Date :</strong> {new Date(selectedObservation.timestamp).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              
              <div>
                {selectedObservation.comment && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">💬 Commentaire :</h5>
                    <p className="text-sm text-gray-700">{selectedObservation.comment}</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <h5 className="font-medium mb-2">📍 Coordonnées :</h5>
                  <p className="text-sm text-gray-600 font-mono">
                    {selectedObservation.coordinates.lat.toFixed(4)}, {selectedObservation.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerte zones à risque */}
        {stats.rare > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-red-800 mb-2">
                  ⚠️ Zones d'alerte écologique
                </h3>
                <p className="text-red-700 mb-3">
                  {stats.rare} observation{stats.rare > 1 ? 's' : ''} signale{stats.rare > 1 ? 'nt' : ''} des espèces devenues rares dans leur habitat naturel.
                </p>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="text-sm text-red-800">
                    🔬 <strong>Action recommandée :</strong> Ces données aident les chercheurs et ONG à identifier les espèces prioritaires pour la conservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white text-center">
          <Users className="mx-auto mb-3" size={48} />
          <h3 className="text-xl font-bold mb-2">Rejoignez le mouvement ! 🌿</h3>
          <p className="mb-4 opacity-90">
            Chaque observation compte pour préserver la biodiversité des plantes médicinales africaines.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/scan')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              📱 Scanner une plante
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-green-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-900 transition-colors"
            >
              🏠 Retour accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationsMap;