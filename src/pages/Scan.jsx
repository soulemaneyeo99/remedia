import { useState, useRef } from 'react';
import { Camera, Upload, X, Zap, AlertCircle, Leaf, MapPin, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Page Scan - Scanner de plantes avec IA simulée + Observation écologique
 * 
 * Features :
 * - Prise de photo via caméra
 * - Upload d'image depuis galerie
 * - Simulation de reconnaissance IA
 * - Résultats avec suggestions de plantes
 * - Preview de l'image scannée
 * - NOUVEAU : Option d'observation écologique post-identification
 */
function Scan() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showObservationOption, setShowObservationOption] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const fileInputRef = useRef(null);

  // Résultats simulés de reconnaissance (format adapté pour ObservationForm)
  const mockResults = [
    {
      id: "moringa",
      nom: "Moringa",
      nom_scientifique: "Moringa oleifera",
      confidence: 94,
      image: "https://images.unsplash.com/photo-1609501676725-7186f734457d?w=200&h=200&fit=crop",
      description: "Arbre aux multiples vertus nutritionnelles",
      usages: ["Nutrition", "Purification de l'eau", "Anti-inflammatoire"],
      region: "Sahel, Afrique de l'Ouest"
    },
    {
      id: "kinkeliba",
      nom: "Kinkeliba",
      nom_scientifique: "Combretum micranthum",
      confidence: 78,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
      description: "Plante détoxifiante du Sahel",
      usages: ["Détoxification", "Digestion", "Fièvre"],
      region: "Sahel"
    },
    {
      id: "bissap",
      nom: "Bissap",
      nom_scientifique: "Hibiscus sabdariffa",
      confidence: 65,
      image: "https://images.unsplash.com/photo-1563789031959-4c02c4441797?w=200&h=200&fit=crop",
      description: "Fleur aux propriétés antioxydantes",
      usages: ["Antioxydant", "Hypertension", "Rafraîchissant"],
      region: "Afrique tropicale"
    }
  ];

  const handleImageCapture = () => {
    // Simulation de prise de photo
    setIsScanning(true);
    
    // Image de démonstration
    const demoImage = "https://images.unsplash.com/photo-1609501676725-7186f734457d?w=400&h=400&fit=crop";
    setSelectedImage(demoImage);

    // Délai de simulation
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockResults);
      // Proposer automatiquement l'observation pour le résultat le plus confiant
      setTimeout(() => {
        setSelectedPlant(mockResults[0]);
        setShowObservationOption(true);
      }, 1500);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        
        // Lancer la simulation de scan
        setIsScanning(true);
        setTimeout(() => {
          setIsScanning(false);
          setScanResult(mockResults);
          // Proposer l'observation après identification
          setTimeout(() => {
            setSelectedPlant(mockResults[0]);
            setShowObservationOption(true);
          }, 1000);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    setShowObservationOption(true);
  };

  const goToObservation = () => {
    navigate('/observation-form', {
      state: { plant: selectedPlant }
    });
  };

  const resetScan = () => {
    setSelectedImage(null);
    setScanResult(null);
    setIsScanning(false);
    setShowObservationOption(false);
    setSelectedPlant(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Scanner une plante
          </h1>
          <p className="text-xl text-gray-600">
            Utilisez l'IA pour identifier instantanément les plantes médicinales
          </p>
        </div>

        {!selectedImage ? (
          /* Interface de scan initiale */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="border-4 border-dashed border-gray-300 rounded-lg p-12 mb-6">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-6">
                  Prenez une photo ou importez une image
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleImageCapture}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Prendre une photo
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-base font-medium rounded-md text-green-600 hover:bg-green-50 transition-colors"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Importer une image
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Conseils */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Conseils pour un meilleur scan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                  <div>• Éclairage naturel optimal</div>
                  <div>• Feuilles et fleurs visibles</div>
                  <div>• Distance de 20-30 cm</div>
                </div>
              </div>

              {/* Nouveau : CTA pour la carte collaborative */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Nouveau !</span>
                </div>
                <p className="text-sm text-emerald-700 mb-3">
                  Après identification, contribuez à la préservation en partageant votre observation !
                </p>
                <button
                  onClick={() => navigate('/observations-map')}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  🗺️ Voir la carte collaborative →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Interface avec image sélectionnée */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isScanning ? 'Analyse en cours...' : 'Résultats du scan'}
                </h2>
                <button
                  onClick={resetScan}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image scannée */}
                <div>
                  <img
                    src={selectedImage}
                    alt="Plante scannée"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Résultats */}
                <div>
                  {isScanning ? (
                    <div className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
                        <div className="flex items-center text-green-600">
                          <Zap className="h-5 w-5 mr-2" />
                          <span className="font-medium">IA en action...</span>
                        </div>
                        <p className="text-gray-600 mt-2">
                          Analyse des caractéristiques botaniques
                        </p>
                      </div>
                    </div>
                  ) : scanResult ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Correspondances trouvées :
                      </h3>
                      
                      {scanResult.map((result) => (
                        <div
                          key={result.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={result.image}
                              alt={result.nom}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">
                                  {result.nom}
                                </h4>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  result.confidence >= 90 
                                    ? 'bg-green-100 text-green-800'
                                    : result.confidence >= 70 
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {result.confidence}%
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 italic mb-1">
                                {result.nom_scientifique}
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                {result.description}
                              </p>
                              
                              {/* Actions */}
                              <div className="flex space-x-2">
                                <Link
                                  to={`/plant/${result.id}`}
                                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-colors"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Détails
                                </Link>
                                <button
                                  onClick={() => handlePlantSelect(result)}
                                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors"
                                >
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Observer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Avertissement */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-amber-800 font-medium mb-1">
                              Attention
                            </p>
                            <p className="text-amber-700">
                              Ces résultats sont à titre informatif uniquement. 
                              Consultez un professionnel de santé avant tout usage médicinal.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal d'observation écologique */}
      {showObservationOption && selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Plante identifiée ! 🌿
              </h3>
              
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg mb-4">
                <img 
                  src={selectedPlant.image} 
                  alt={selectedPlant.nom}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{selectedPlant.nom}</p>
                  <p className="text-sm text-gray-600">{selectedPlant.nom_scientifique}</p>
                  <div className="flex items-center mt-1">
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      selectedPlant.confidence >= 90 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedPlant.confidence}% sûr
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-lg mb-6">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-emerald-800 font-medium mb-1">
                    Contribuez à la science participative !
                  </p>
                  <p className="text-xs text-emerald-700">
                    Votre observation aide à cartographier et préserver les plantes médicinales africaines.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={goToObservation}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
              >
                <MapPin className="mr-2" size={20} />
                🌍 Partager mon observation
              </button>
              
              <Link
                to={`/plant/${selectedPlant.id}`}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors block text-center font-medium"
              >
                📖 Voir les détails complets
              </Link>
              
              <button
                onClick={() => setShowObservationOption(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Plus tard
              </button>
            </div>

            {/* Info supplémentaire */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                💡 Votre observation restera anonyme et contribuera à la recherche écologique
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scan;