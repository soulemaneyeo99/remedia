import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Leaf, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  BarChart3,
  Moon,
  Sun,
  RefreshCw,
  Download,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';

// Composant pour simuler une carte Leaflet interactive
const InteractiveMap = ({ observations, selectedObservation, onObservationClick, filters, darkMode }) => {
  const mapRef = useRef(null);
  
  const getConditionColor = (condition) => {
    const colors = {
      'saine': '#10b981',
      'endommagee': '#f59e0b',
      'abondante': '#059669',
      'rare': '#dc2626',
      'menacee': '#b91c1c'
    };
    return colors[condition] || '#6b7280';
  };

  const filteredObs = observations.filter(obs => {
    if (filters.condition !== 'all' && obs.condition !== filters.condition) return false;
    if (filters.plant && !obs.plantName.toLowerCase().includes(filters.plant.toLowerCase())) return false;
    if (filters.habitat !== 'all' && obs.habitat !== filters.habitat) return false;
    if (filters.dateRange !== 'all') {
      const obsDate = new Date(obs.timestamp);
      const now = new Date();
      const daysAgo = (now - obsDate) / (1000 * 60 * 60 * 24);
      
      if (filters.dateRange === 'week' && daysAgo > 7) return false;
      if (filters.dateRange === 'month' && daysAgo > 30) return false;
      if (filters.dateRange === 'year' && daysAgo > 365) return false;
    }
    return true;
  });

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* En-tête de la carte */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <MapPin className="mr-2 text-green-500" size={20} />
            Carte Interactive - Afrique de l'Ouest
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredObs.length} observations
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Zone de la carte simulée avec interaction */}
      <div className="relative h-96 bg-gradient-to-br from-blue-100 via-green-50 to-emerald-100">
        {/* Fond de carte stylisé */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
          {/* Contours de l'Afrique de l'Ouest */}
          <defs>
            <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#f0fdf4"/>
              <circle cx="10" cy="10" r="1" fill="#dcfce7" opacity="0.5"/>
            </pattern>
          </defs>
          <path
            d="M40,140 Q90,90 140,110 L190,100 Q240,120 290,130 L310,170 Q270,210 190,200 L140,190 Q90,170 40,140"
            fill="url(#mapPattern)"
            stroke="#10b981"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          {/* Rivières et fleuves */}
          <path d="M60,160 Q120,140 180,150 Q220,160 280,140" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6"/>
          <path d="M100,180 Q150,170 200,180" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.4"/>
        </svg>

        {/* Marqueurs d'observations */}
        {filteredObs.map((obs, index) => {
          const baseX = 80 + (index * 45) % 200;
          const baseY = 80 + (index * 35) % 140;
          const isSelected = selectedObservation?.id === obs.id;
          
          return (
            <div
              key={obs.id}
              className={`absolute cursor-pointer transition-all duration-300 hover:scale-125 ${
                isSelected ? 'scale-150 z-20' : 'z-10'
              }`}
              style={{
                left: `${baseX + Math.sin(index) * 20}px`,
                top: `${baseY + Math.cos(index) * 15}px`
              }}
              onClick={() => onObservationClick(obs)}
            >
              <div
                className={`w-4 h-4 rounded-full shadow-lg border-2 border-white ${
                  isSelected ? 'ring-4 ring-blue-300' : ''
                }`}
                style={{ backgroundColor: getConditionColor(obs.condition) }}
              />
              
              {/* Tooltip au survol */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className={`px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                }`}>
                  <div className="font-medium">{obs.plantName}</div>
                  <div className="text-gray-500">{obs.location}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Légende de la carte */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
          <div className="text-xs font-medium text-gray-700 mb-2">Légende</div>
          <div className="space-y-1">
            {[
              { condition: 'saine', label: 'Saine', color: '#10b981' },
              { condition: 'abondante', label: 'Abondante', color: '#059669' },
              { condition: 'endommagee', label: 'Endommagée', color: '#f59e0b' },
              { condition: 'rare', label: 'Rare', color: '#dc2626' },
              { condition: 'menacee', label: 'Menacée', color: '#b91c1c' }
            ].map(item => (
              <div key={item.condition} className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contrôles de la carte */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50">
            <Plus size={16} />
          </button>
          <button className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50">
            <span className="text-lg font-bold">−</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant de filtrage avancé
const FilterSidebar = ({ filters, setFilters, observations, isOpen, onToggle, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const uniquePlants = [...new Set(observations.map(obs => obs.plantName))];
  const uniqueHabitats = [...new Set(observations.map(obs => obs.habitat))];
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      condition: 'all',
      plant: '',
      habitat: 'all',
      dateRange: 'all'
    });
    setSearchTerm('');
  };

  const getHabitatLabel = (habitat) => {
    const labels = {
      'foret': '🌳 Forêt',
      'jardin': '🏡 Jardin',
      'bord_champ': '🌾 Bord de champ',
      'bord_route': '🛣️ Bord de route',
      'savane': '🌾 Savane',
      'montagne': '⛰️ Montagne',
      'autre': '📍 Autre'
    };
    return labels[habitat] || habitat;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border transition-all duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-95'
    }`}>
      {/* En-tête du panneau */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <Filter className="mr-2 text-blue-500" size={20} />
            Filtres Avancés
          </h3>
          <button
            onClick={onToggle}
            className={`p-1 rounded hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Recherche rapide */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🔍 Recherche rapide
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Nom de plante ou localité..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange('plant', e.target.value);
                }}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>

          {/* Filtre par état */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🔴 État de santé
            </label>
            <select
              value={filters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="all">Toutes les conditions</option>
              <option value="saine">💚 Saine</option>
              <option value="abondante">🌿 Abondante</option>
              <option value="endommagee">⚠️ Endommagée</option>
              <option value="rare">🔴 Rare</option>
              <option value="menacee">💀 Menacée</option>
            </select>
          </div>

          {/* Filtre par habitat */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🏞️ Type d'habitat
            </label>
            <select
              value={filters.habitat}
              onChange={(e) => handleFilterChange('habitat', e.target.value)}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="all">Tous les habitats</option>
              {uniqueHabitats.map(habitat => (
                <option key={habitat} value={habitat}>
                  {getHabitatLabel(habitat)}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre par période */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              📅 Période d'observation
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="all">Toute période</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={resetFilters}
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <RefreshCw size={16} className="inline mr-2" />
              Réinitialiser
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              <Download size={16} className="inline mr-2" />
              Exporter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant principal
const ObservationsMap = () => {
  const [observations, setObservations] = useState([]);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [filters, setFilters] = useState({
    condition: 'all',
    plant: '',
    habitat: 'all',
    dateRange: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(true);

  // Fonction de navigation simulée
  const handleNavigation = (path) => {
    alert(`Navigation vers : ${path}`);
  };

  // Charger les observations
  useEffect(() => {
    const loadObservations = () => {
      const defaultObservations = [
        {
          id: "obs_001",
          plantId: "baobab",
          plantName: "Baobab",
          coordinates: { lat: 12.3456, lng: -1.5678 },
          location: "Ouagadougou, Burkina Faso",
          habitat: "bord_route",
          condition: "saine",
          comment: "Grand spécimen en bonne santé, fruits abondants cette saison",
          timestamp: "2025-07-28T14:30:00Z",
          contributor: "Dr. Amara Koné",
          images: ["baobab1.jpg"]
        },
        {
          id: "obs_002",
          plantId: "moringa",
          plantName: "Moringa",
          coordinates: { lat: 6.1234, lng: 1.2345 },
          location: "Lomé, Togo",
          habitat: "jardin",
          condition: "abondante",
          comment: "Plantation familiale très productive, utilisée quotidiennement",
          timestamp: "2025-07-27T09:15:00Z",
          contributor: "Marie Adjovi",
          images: ["moringa1.jpg", "moringa2.jpg"]
        },
        {
          id: "obs_003",
          plantId: "artemisia",
          plantName: "Artemisia",
          coordinates: { lat: 14.7890, lng: -17.4567 },
          location: "Dakar, Sénégal",
          habitat: "foret",
          condition: "rare",
          comment: "Espèce devenue très rare, nécessite protection urgente",
          timestamp: "2025-07-26T16:45:00Z",
          contributor: "Prof. Ibrahima Diallo",
          images: ["artemisia1.jpg"]
        },
        {
          id: "obs_004",
          plantId: "neem",
          plantName: "Margousier (Neem)",
          coordinates: { lat: 9.5678, lng: 2.1234 },
          location: "Kara, Togo",
          habitat: "savane",
          condition: "menacee",
          comment: "Population en déclin, déforestation intensive dans la région",
          timestamp: "2025-07-25T11:20:00Z",
          contributor: "Eco-Togo Association",
          images: ["neem1.jpg"]
        },
        {
          id: "obs_005",
          plantId: "hibiscus",
          plantName: "Hibiscus sabdariffa",
          coordinates: { lat: 11.2345, lng: -4.5678 },
          location: "Bobo-Dioulasso, Burkina Faso",
          habitat: "bord_champ",
          condition: "abondante",
          comment: "Culture traditionnelle bien préservée, qualité excellente",
          timestamp: "2025-07-24T08:45:00Z",
          contributor: "Coopérative Faso Bio",
          images: ["hibiscus1.jpg"]
        }
      ];

      const localObservations = JSON.parse(localStorage.getItem('observations') || '[]');
      const allObservations = [...defaultObservations, ...localObservations];
      
      setObservations(allObservations);
      setLoading(false);
    };

    setTimeout(loadObservations, 1000);
  }, []);

  // Filtrer les observations
  const filteredObservations = observations.filter(obs => {
    if (filters.condition !== 'all' && obs.condition !== filters.condition) return false;
    if (filters.plant && !obs.plantName.toLowerCase().includes(filters.plant.toLowerCase()) && 
        !obs.location.toLowerCase().includes(filters.plant.toLowerCase())) return false;
    if (filters.habitat !== 'all' && obs.habitat !== filters.habitat) return false;
    if (filters.dateRange !== 'all') {
      const obsDate = new Date(obs.timestamp);
      const now = new Date();
      const daysAgo = (now - obsDate) / (1000 * 60 * 60 * 24);
      
      if (filters.dateRange === 'week' && daysAgo > 7) return false;
      if (filters.dateRange === 'month' && daysAgo > 30) return false;
      if (filters.dateRange === 'year' && daysAgo > 365) return false;
    }
    return true;
  });

  // Calculer les statistiques
  const stats = {
    total: observations.length,
    filtered: filteredObservations.length,
    rare: observations.filter(obs => obs.condition === 'rare').length,
    menacee: observations.filter(obs => obs.condition === 'menacee').length,
    saine: observations.filter(obs => obs.condition === 'saine').length,
    abondante: observations.filter(obs => obs.condition === 'abondante').length,
    species: new Set(observations.map(obs => obs.plantName)).size,
    contributors: new Set(observations.map(obs => obs.contributor)).size
  };

  const getConditionLabel = (condition) => {
    const labels = {
      'saine': '💚 Saine',
      'endommagee': '⚠️ Endommagée',
      'abondante': '🌿 Abondante',
      'rare': '🔴 Rare',
      'menacee': '💀 Menacée'
    };
    return labels[condition] || condition;
  };

  const getHabitatLabel = (habitat) => {
    const labels = {
      'foret': '🌳 Forêt',
      'jardin': '🏡 Jardin',
      'bord_champ': '🌾 Bord de champ',
      'bord_route': '🛣️ Bord de route',
      'savane': '🌾 Savane',
      'montagne': '⛰️ Montagne',
      'autre': '📍 Autre'
    };
    return labels[habitat] || habitat;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-emerald-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-6"></div>
          <div className="space-y-2">
            <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Chargement de la carte collaborative...
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Synchronisation des données écologiques en cours
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-emerald-100'
    }`}>
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header principal */}
        <div className={`rounded-2xl p-6 shadow-lg transition-colors ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className={`text-3xl font-bold flex items-center ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <MapPin className="mr-3 text-green-600" size={32} />
                Carte Collaborative REMÉDIA
              </h1>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                🔴 Live
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setShowStats(!showStats)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {showStats ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              
              <button
                onClick={() => handleNavigation('/scan')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
              >
                <Plus className="mr-2" size={20} />
                Nouvelle Observation
              </button>
            </div>
          </div>
          
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            🌍 Plateforme participative de suivi de la biodiversité des plantes médicinales africaines
          </p>

          {/* Statistiques détaillées */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.filtered}</div>
                <div className="text-sm text-blue-800">Observations</div>
                <div className="text-xs text-blue-600 mt-1">
                  {stats.filtered !== stats.total && `sur ${stats.total}`}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.species}</div>
                <div className="text-sm text-emerald-800">Espèces</div>
                <div className="text-xs text-emerald-600 mt-1">répertoriées</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{stats.saine + stats.abondante}</div>
                <div className="text-sm text-green-800">En bonne santé</div>
                <div className="text-xs text-green-600 mt-1">saines + abondantes</div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{stats.rare + stats.menacee}</div>
                <div className="text-sm text-red-800">À risque</div>
                <div className="text-xs text-red-600 mt-1">rares + menacées</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.contributors}</div>
                <div className="text-sm text-purple-800">Contributeurs</div>
                <div className="text-xs text-purple-600 mt-1">actifs</div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {Math.round((stats.saine + stats.abondante) / stats.total * 100)}%
                </div>
                <div className="text-sm text-indigo-800">Santé globale</div>
                <div className="text-xs text-indigo-600 mt-1">écosystème</div>
              </div>
            </div>
          )}
        </div>

        {/* Layout principal : Filtres + Carte */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Panneau de filtrage */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              observations={observations}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              darkMode={darkMode}
            />
          </div>

          {/* Carte interactive */}
          <div className="lg:col-span-3">
            <InteractiveMap
              observations={filteredObservations}
              selectedObservation={selectedObservation}
              onObservationClick={setSelectedObservation}
              filters={filters}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Liste des observations + Détail */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Liste des observations */}
          <div className={`rounded-2xl shadow-lg transition-colors ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-bold text-xl flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <Leaf className="mr-3 text-green-500" size={24} />
                Observations Récentes
                <span className={`ml-3 text-sm font-normal px-3 py-1 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {filteredObservations.length} résultats
                </span>
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredObservations.length === 0 ? (
                  <div className="text-center py-8">
                    <div className={`text-6xl mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>🔍</div>
                    <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Aucune observation trouvée
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Essayez de modifier vos filtres ou ajoutez une nouvelle observation
                    </p>
                  </div>
                ) : (
                  filteredObservations.slice(0, 20).map((obs) => (
                    <div
                      key={obs.id}
                      className={`p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedObservation?.id === obs.id 
                          ? (darkMode ? 'bg-gray-700 ring-2 ring-blue-500' : 'bg-green-50 ring-2 ring-green-500')
                          : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100')
                      }`}
                      style={{ 
                        borderLeftColor: obs.condition === 'saine' ? '#10b981' : 
                                        obs.condition === 'abondante' ? '#059669' :
                                        obs.condition === 'endommagee' ? '#f59e0b' :
                                        obs.condition === 'rare' ? '#dc2626' :
                                        obs.condition === 'menacee' ? '#b91c1c' : '#6b7280'
                      }}
                      onClick={() => setSelectedObservation(obs)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {obs.plantName}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-500'
                        }`}>
                          {new Date(obs.timestamp).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {getConditionLabel(obs.condition)}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {getHabitatLabel(obs.habitat)} • {obs.location}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          👤 {obs.contributor}
                        </p>
                      </div>
                      
                      {obs.comment && (
                        <p className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                          "{obs.comment}"
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Détail de l'observation sélectionnée */}
          {selectedObservation ? (
            <div className={`rounded-2xl shadow-lg transition-colors ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    📊 Détail de l'Observation
                  </h3>
                  <button
                    onClick={() => setSelectedObservation(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Informations principales */}
                  <div>
                    <h4 className={`font-bold text-2xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {selectedObservation.plantName}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          État de santé
                        </div>
                        <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {getConditionLabel(selectedObservation.condition)}
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Habitat
                        </div>
                        <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {getHabitatLabel(selectedObservation.habitat)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Détails de localisation */}
                  <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-blue-50'}`}>
                    <h5 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <MapPin className="mr-2 text-blue-500" size={18} />
                      Localisation
                    </h5>
                    <div className="space-y-2">
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Lieu :</strong> {selectedObservation.location}
                      </p>
                      <p className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>Coordonnées :</strong> {selectedObservation.coordinates.lat.toFixed(4)}, {selectedObservation.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>

                  {/* Informations sur l'observateur */}
                  <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-green-50'}`}>
                    <h5 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Users className="mr-2 text-green-500" size={18} />
                      Contributeur
                    </h5>
                    <div className="space-y-2">
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Observateur :</strong> {selectedObservation.contributor}
                      </p>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Date :</strong> {new Date(selectedObservation.timestamp).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Commentaire */}
                  {selectedObservation.comment && (
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-yellow-50'}`}>
                      <h5 className={`font-semibold mb-3 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        💬 Observations détaillées
                      </h5>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedObservation.comment}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <Share2 className="mr-2" size={16} />
                      Partager
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                      <BarChart3 className="mr-2" size={16} />
                      Analyser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Placeholder quand aucune observation n'est sélectionnée
            <div className={`rounded-2xl shadow-lg flex items-center justify-center transition-colors ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="text-center p-8">
                <div className={`text-6xl mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>🔍</div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Sélectionnez une observation
                </h3>
                <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Cliquez sur une observation dans la liste ou sur la carte pour voir ses détails
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Alerte zones à risque */}
        {(stats.rare + stats.menacee) > 0 && (
          <div className={`rounded-2xl p-6 border-l-4 border-red-500 transition-colors ${
            darkMode ? 'bg-red-900/20 border-red-500' : 'bg-gradient-to-r from-red-50 to-orange-50'
          }`}>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={28} />
              <div className="flex-1">
                <h3 className={`font-bold text-xl mb-3 ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
                  ⚠️ Alerte Écologique - Zones d'Intervention Prioritaire
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  <strong>{stats.rare + stats.menacee} observation{(stats.rare + stats.menacee) > 1 ? 's' : ''}</strong> signale{(stats.rare + stats.menacee) > 1 ? 'nt' : ''} des espèces en situation critique dans leur habitat naturel.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-800/30' : 'bg-red-100'}`}>
                    <div className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                      🔴 Espèces rares : {stats.rare}
                    </div>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                      Populations en déclin significatif
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30' : 'bg-red-200'}`}>
                    <div className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-900'}`}>
                      💀 Espèces menacées : {stats.menacee}
                    </div>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
                      Risque d'extinction locale élevé
                    </p>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    🔬 <strong>Actions recommandées :</strong> Ces données critiques sont partagées avec les institutions de recherche, 
                    les ONG de conservation et les autorités locales pour initier des programmes de protection urgents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bannière Mission Racines */}
        <div className={`rounded-2xl p-6 text-center transition-colors ${
          darkMode ? 'bg-gradient-to-r from-green-800 to-emerald-800 text-white' : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold mb-3">Rejoignez Mission Racines !</h3>
            <p className="text-lg mb-6 opacity-95">
              Ensemble, cartographions et préservons le patrimoine végétal médicinal de l'Afrique. 
              Chaque observation contribue à la science participative et à la conservation de notre biodiversité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation('/scan')}
                className={`px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 ${
                  darkMode ? 'bg-white text-green-800 hover:bg-gray-100' : 'bg-white text-green-600 hover:bg-gray-100'
                }`}
              >
                📱 Scanner une Plante
              </button>
              
              <button
                onClick={() => handleNavigation('/mission-racines')}
                className={`px-8 py-4 rounded-lg font-semibold border-2 border-white transition-all hover:scale-105 ${
                  darkMode ? 'text-white hover:bg-white hover:text-green-800' : 'text-white hover:bg-white hover:text-green-600'
                }`}
              >
                🌱 En Savoir Plus
              </button>
              
              <button
                onClick={() => handleNavigation('/')}
                className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                  darkMode ? 'bg-green-900 text-white hover:bg-green-950' : 'bg-green-800 text-white hover:bg-green-900'
                }`}
              >
                🏠 Retour Accueil
              </button>
            </div>
            
            <div className="mt-6 text-sm opacity-80">
              💡 Astuce : Utilisez les filtres avancés pour découvrir les tendances écologiques par région
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationsMap;