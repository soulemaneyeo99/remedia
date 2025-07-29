import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Leaf, Beaker, MapPin, Heart, Shield } from 'lucide-react';

// Simuler l'import des données - tu peux remplacer par ton import réel
const plantesData = [
  {
    id: 1,
    nom: "Aloe Vera",
    nomScientifique: "Aloe barbadensis miller",
    famille: "Asphodelaceae",
    origine: "Afrique du Nord, Madagascar",
    image: "/api/placeholder/400/300",
    description: "Plante succulente aux propriétés cicatrisantes exceptionnelles, utilisée depuis l'Antiquité.",
    vertus: ["Cicatrisant", "Anti-inflammatoire", "Hydratant", "Digestif"],
    composantsChimiques: ["Aloïne", "Acemannane", "Vitamines A, C, E", "Acides aminés"],
    utilisationTraditionnelle: "Appliqué directement sur les brûlures et coupures, ou consommé en gel pour les troubles digestifs.",
    precautions: ["Éviter l'ingestion chez la femme enceinte", "Peut causer des allergies cutanées chez certaines personnes"],
    statutConservation: "non-menacee",
    coordonnees: { lat: -18.8792, lng: 47.5079 }, // Madagascar
    difficultesCulture: "Facile",
    conseillsCulture: "Plante résistante nécessitant peu d'eau. Exposition lumineuse sans soleil direct."
  },
  {
    id: 2,
    nom: "Moringa",
    nomScientifique: "Moringa oleifera",
    famille: "Moringaceae",
    origine: "Inde du Nord, cultivé en Afrique",
    image: "/api/placeholder/400/300",
    description: "Arbre aux multiples vertus nutritionnelles, surnommé 'arbre de vie'.",
    vertus: ["Nutritif", "Antioxydant", "Anti-inflammatoire", "Énergisant"],
    composantsChimiques: ["Vitamines A, C, K", "Calcium", "Fer", "Protéines complètes"],
    utilisationTraditionnelle: "Feuilles consommées fraîches ou séchées, graines utilisées pour purifier l'eau.",
    precautions: ["Éviter en cas de traitement anticoagulant", "Dosage modéré recommandé"],
    statutConservation: "cultivable",
    coordonnees: { lat: 11.5564, lng: 43.1456 }, // Afrique de l'Est
    difficultesCulture: "Moyenne",
    conseillsCulture: "Arbre tropical nécessitant chaleur et humidité. Croissance rapide."
  }
];

const PlantDetail = ({ plantId = 1, onBack, onNavigateToChat }) => {
  const [plante, setPlante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simuler un appel API avec ton hook useSimulatedAPI
    setTimeout(() => {
      const foundPlant = plantesData.find(p => p.id === parseInt(plantId));
      setPlante(foundPlant);
      setLoading(false);
    }, 800);
  }, [plantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!plante) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Plante non trouvée</h2>
          <button 
            onClick={onBack}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retour au scan
          </button>
        </div>
      </div>
    );
  }

  const getConservationBadge = (statut) => {
    const badges = {
      'menacee': { color: 'bg-red-100 text-red-800', icon: AlertTriangle, text: 'Espèce menacée' },
      'cultivable': { color: 'bg-green-100 text-green-800', icon: Leaf, text: 'Cultivable' },
      'non-menacee': { color: 'bg-blue-100 text-blue-800', icon: Shield, text: 'Non menacée' }
    };
    const badge = badges[statut] || badges['non-menacee'];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {badge.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
              <span className="text-sm text-gray-600">Ajouter aux favoris</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={plante.image} 
                alt={plante.nom}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{plante.nom}</h1>
                <p className="text-lg text-gray-600 italic mb-4">{plante.nomScientifique}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {getConservationBadge(plante.statutConservation)}
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    {plante.famille}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{plante.description}</p>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{plante.origine}</span>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <div className="flex items-center mb-2">
                  <Leaf className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Culture: {plante.difficultesCulture}</span>
                </div>
                <p className="text-green-700 text-sm">{plante.conseillsCulture}</p>
              </div>
            </div>
          </div>
        </div>


    // Ajout à intégrer dans ton PlantDetail.jsx existant
// Place ce code dans la section des informations principales

{/* Indicateur écologique - À ajouter dans tes infos plante */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
    Statut écologique
  </h3>
  <div className="flex items-center space-x-2">
    {plante.ecologie === "menacée" ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Plante menacée
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Non menacée
      </span>
    )}
  </div>
  
  {/* Message contextuel si plante menacée */}
  {plante.ecologie === "menacée" && (
    <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
      <div className="flex items-start">
        <svg className="w-5 h-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-sm text-amber-700">
          <span className="font-medium">Conservation nécessaire :</span> Cette plante nécessite une attention particulière pour sa préservation. Privilégiez une cueillette responsable.
        </p>
      </div>
    </div>
  )}
</div>
        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Leaf },
                { id: 'chemistry', label: 'Composition', icon: Beaker },
                { id: 'precautions', label: 'Précautions', icon: AlertTriangle }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-all ${
                      activeTab === tab.id 
                        ? 'border-green-500 text-green-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Vertus thérapeutiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {plante.vertus.map((vertu, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center hover:bg-green-100 transition-colors">
                        <span className="text-green-800 font-medium text-sm">{vertu}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage traditionnel</h3>
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                    <p className="text-amber-800 leading-relaxed">{plante.utilisationTraditionnelle}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chemistry' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Composants chimiques principaux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plante.composantsChimiques.map((composant, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                      <div className="flex items-center">
                        <Beaker className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-blue-800 font-medium">{composant}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Note scientifique:</strong> Cette composition est basée sur les analyses phytochimiques 
                    traditionnelles. Consultez un professionnel de santé avant utilisation thérapeutique.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'precautions' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Précautions d'usage</h3>
                <div className="space-y-4">
                  {plante.precautions.map((precaution, index) => (
                    <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800">{precaution}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Avertissement important</h4>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    Les informations présentées sont à des fins éducatives uniquement. 
                    Consultez toujours un professionnel de santé qualifié avant d'utiliser 
                    des plantes à des fins thérapeutiques. REMÈDIA encourage la culture 
                    responsable plutôt que la cueillette sauvage.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            🌱 Guides de culture
          </button>
          <button 
            onClick={onNavigateToChat}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            💬 Poser une question
          </button>
          <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            🗺️ Localiser l'origine
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;