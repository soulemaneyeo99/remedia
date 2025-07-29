import React from 'react';
import { MapPin, Calendar, User, MessageCircle } from 'lucide-react';

const ObservationCard = ({ observation, onClick, isSelected = false }) => {
  const getConditionColor = (condition) => {
    const colors = {
      'saine': 'bg-green-100 text-green-800 border-green-200',
      'endommagee': 'bg-orange-100 text-orange-800 border-orange-200',
      'abondante': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'rare': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[condition] || 'bg-gray-100 text-gray-800 border-gray-200';
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays <= 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        isSelected ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-gray-200'
      }`}
    >
      {/* Header avec nom de la plante et statut */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{observation.plantName}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getConditionColor(observation.condition)}`}>
              {getConditionLabel(observation.condition)}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            {formatDate(observation.timestamp)}
          </div>
        </div>
      </div>

      {/* Informations principales */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin size={16} className="mr-2 text-gray-400" />
          <span>{getHabitatLabel(observation.habitat)} • {observation.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <User size={16} className="mr-2 text-gray-400" />
          <span>Par {observation.contributor}</span>
        </div>
      </div>

      {/* Commentaire si présent */}
      {observation.comment && (
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <div className="flex items-start">
            <MessageCircle size={16} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700 line-clamp-2">
              {observation.comment}
            </p>
          </div>
        </div>
      )}

      {/* Coordonnées */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500 font-mono">
          📍 {observation.coordinates.lat.toFixed(4)}, {observation.coordinates.lng.toFixed(4)}
        </div>
      </div>

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center text-green-600 text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Observation sélectionnée
          </div>
        </div>
      )}
    </div>
  );
};

export default ObservationCard;