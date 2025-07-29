// components/PlantCard.jsx - Version améliorée
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, TestTube, Heart } from 'lucide-react';
import { CONSERVATION_STATUS } from '../utils/constants';

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();

  // Navigation vers la fiche détaillée
  const handleLearnMore = (e) => {
    e.preventDefault();
    navigate(`/plant/${plant.id}`);
  };

  // Obtenir le statut de conservation
  const getConservationStatus = (status) => {
    return CONSERVATION_STATUS[status] || CONSERVATION_STATUS.UNKNOWN;
  };

  // Limiter le nombre de composés affichés
  const displayedCompounds = plant.compounds?.slice(0, 3) || [];
  const remainingCount = (plant.compounds?.length || 0) - 3;

  // Limiter le nombre de vertus affichées
  const displayedBenefits = plant.benefits?.slice(0, 2) || [];
  const remainingBenefitsCount = (plant.benefits?.length || 0) - 2;

  const conservationStatus = getConservationStatus(plant.conservationStatus);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image avec badge de conservation */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge de statut de conservation */}
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${conservationStatus.color}`}>
            <span className="mr-1">{conservationStatus.icon}</span>
            {conservationStatus.label}
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Nom et nom scientifique */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {plant.name}
          </h3>
          <p className="text-sm text-gray-600 italic">
            {plant.scientificName}
          </p>
        </div>

        {/* Description courte */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {plant.description}
        </p>

        {/* Composés chimiques */}
        {displayedCompounds.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <TestTube  className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">
                Composés actifs
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {displayedCompounds.map((compound, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {compound}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-50 text-gray-600 border border-gray-100">
                  +{remainingCount}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Vertus principales */}
        {displayedBenefits.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <Heart className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-gray-700">
                Vertus thérapeutiques
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {displayedBenefits.map((benefit, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 border border-green-100"
                >
                  {benefit}
                </span>
              ))}
              {remainingBenefitsCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-50 text-gray-600 border border-gray-100">
                  +{remainingBenefitsCount}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Origine géographique */}
        {plant.origin && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-1">
              <Leaf className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium text-gray-700">Origine</span>
            </div>
            <span className="text-sm text-gray-600">{plant.origin}</span>
          </div>
        )}

        {/* Bouton "En savoir plus" */}
        <button
          onClick={handleLearnMore}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <span>En savoir plus</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PlantCard;