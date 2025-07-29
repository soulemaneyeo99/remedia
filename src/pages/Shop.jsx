import { useState } from 'react';
import { 
  ShoppingCart, 
  Star, 
  Plus, 
  MapPin, 
  Users, 
  Leaf, 
  Heart, 
  Info, 
  Phone, 
  Mail, 
  MessageCircle, 
  Shield, 
  Award, 
  Truck, 
  AlertTriangle, 
  TreePine, 
  Droplets, 
  Clock, 
  RefreshCw 
} from 'lucide-react';

/**
 * Page Shop - Boutique éducative et écoresponsable REMÈDIA
 * Intègre sensibilisation écologique, protection biodiversité et commerce éthique
 */
function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  // Données enrichies avec dimension écoresponsable
  const products = [
    {
      id: 1,
      name: "Tisane Moringa Bio",
      price: "15.99",
      priceLocal: "10,500 FCFA", 
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Tisanes",
      origin: "Korhogo, Côte d'Ivoire",
      producer: "Coopérative des Femmes de Korhogo",
      benefits: ["Riche en vitamines A, C et fer", "Renforce le système immunitaire", "Combat la fatigue"],
      usage: "1 cuillère à café dans une tasse d'eau chaude, 2 fois par jour",
      precautions: "Déconseillé aux femmes enceintes. Modérez votre consommation pour préserver les ressources.",
      certified: true,
      stock: "En stock",
      conservationStatus: "non-menacee",
      harvestType: "cultive",
      ecoImpact: 8.5,
      sustainableBadge: "Récolte responsable",
      harvestSeason: "Saison sèche (Nov-Fév)",
      reforestationContrib: true,
      localCommunity: "85 femmes bénéficiaires",
      biodiversityNote: "Culture qui favorise la régénération des sols",
      warning: "L'usage de cette plante doit être modéré pour préserver sa reproduction naturelle.",
      coordinates: { lat: 9.4588, lng: -5.6275 }
    },
    {
      id: 2,
      name: "Huile d'Argan Pure",
      price: "24.99",
      priceLocal: "16,500 FCFA",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Huiles",
      origin: "Boundiali, Côte d'Ivoire",
      producer: "Association des Femmes Artisanes",
      benefits: ["Hydrate et nourrit la peau", "Anti-âge naturel", "Fortifie les cheveux"],
      usage: "Appliquer quelques gouttes sur peau ou cheveux, matin et soir",
      precautions: "Test d'allergie recommandé. Prélevez avec parcimonie.",
      certified: true,
      stock: "Stock limité",
      conservationStatus: "surveillance",
      harvestType: "collecte-controlee",
      ecoImpact: 7.2,
      sustainableBadge: "Commerce équitable",
      harvestSeason: "Récolte manuelle (Juin-Août)",
      reforestationContrib: true,
      localCommunity: "42 femmes transformatrices",
      biodiversityNote: "Arbre protégé, récolte des fruits tombés uniquement",
      warning: "Ressource précieuse - achetez en conscience, la nature se partage mais ne s'épuise pas.",
      coordinates: { lat: 9.2833, lng: -6.2667 }
    },
    {
      id: 3,
      name: "Baume au Karité",
      price: "12.50",
      priceLocal: "8,250 FCFA",
      image: "https://images.unsplash.com/photo-1556228578-dd6e4ced7fa9?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "Soins",
      origin: "Séguéla, Côte d'Ivoire",
      producer: "Coopérative Karité d'Or",
      benefits: ["Protège contre les agressions", "Cicatrisant naturel", "Nourrissant intense"],
      usage: "Appliquer sur peau sèche ou irritée, plusieurs fois par jour",
      precautions: "Convient à tous types de peau",
      certified: true,
      stock: "En stock",
      conservationStatus: "protegee", 
      harvestType: "traditionnel",
      ecoImpact: 9.1,
      sustainableBadge: "Forêt protégée",
      harvestSeason: "Récolte à maturité (Mai-Juillet)",
      reforestationContrib: true,
      localCommunity: "120 femmes dans 8 villages",
      biodiversityNote: "Arbre sacré, récolte selon les traditions ancestrales",
      warning: "Espèce protégée - notre partenariat soutient la plantation de 500 karités par an.",
      coordinates: { lat: 7.9667, lng: -6.6667 }
    },
    {
      id: 4,
      name: "Poudre de Baobab",
      price: "18.90",
      priceLocal: "12,500 FCFA",
      image: "https://images.unsplash.com/photo-1594736797933-d0bd15ba7427?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 73,
      category: "Compléments",
      origin: "Man, Côte d'Ivoire",
      producer: "Groupement des Collecteurs de Man",
      benefits: ["6x plus de vitamine C que l'orange", "Source de fibres et antioxydants", "Boost d'énergie naturel"],
      usage: "1 cuillère à café dans du yaourt, jus ou smoothie",
      precautions: "Commencer par de petites quantités",
      certified: true,
      stock: "En stock",
      conservationStatus: "vulnerable",
      harvestType: "collecte-raisonnee",
      ecoImpact: 6.8,
      sustainableBadge: "Arbre millénaire",
      harvestSeason: "Fruits mûrs naturellement (Mars-Mai)",
      reforestationContrib: true,
      localCommunity: "30 collecteurs formés",
      biodiversityNote: "Collecte des fruits tombés pour préserver l'arbre centenaire",
      warning: "Baobab vulnérable aux changements climatiques - votre achat aide à leur protection.",
      coordinates: { lat: 7.4125, lng: -7.5539 }
    }
  ];

  const categories = ['Tous', 'Tisanes', 'Huiles', 'Soins', 'Compléments'];
  const ecoFilters = [
    'Tous',
    'Espèces protégées', 
    'Culture locale',
    'Récolte traditionnelle',
    'Forêt préservée'
  ];

  const getFilteredProducts = () => {
    let filtered = selectedCategory === 'Tous' 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    
    if (selectedFilter !== 'Tous') {
      filtered = filtered.filter(product => {
        switch(selectedFilter) {
          case 'Espèces protégées':
            return product.conservationStatus === 'protegee' || product.conservationStatus === 'vulnerable';
          case 'Culture locale':
            return product.harvestType === 'cultive';
          case 'Récolte traditionnelle':
            return product.harvestType === 'traditionnel';
          case 'Forêt préservée':
            return product.sustainableBadge === 'Forêt protégée';
          default:
            return true;
        }
      });
    }
    
    return filtered;
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} sera bientôt disponible à l'achat ! En attendant, contactez-nous sur WhatsApp.`);
  };

  const getConservationColor = (status) => {
    switch(status) {
      case 'non-menacee': return 'bg-green-100 text-green-800';
      case 'surveillance': return 'bg-yellow-100 text-yellow-800';
      case 'protegee': return 'bg-blue-100 text-blue-800';
      case 'vulnerable': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConservationLabel = (status) => {
    switch(status) {
      case 'non-menacee': return 'Non menacée';
      case 'surveillance': return 'Sous surveillance';
      case 'protegee': return 'Espèce protégée';
      case 'vulnerable': return 'Vulnérable';
      default: return 'Statut inconnu';
    }
  };

  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConservationColor(product.conservationStatus)}`}>
                    {getConservationLabel(product.conservationStatus)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Impact éco: {product.ecoImpact}/10
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Fermer la modal"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-lg mb-4" 
                />
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Région d'origine
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">{product.origin}</p>
                  <div className="bg-green-200 h-20 rounded flex items-center justify-center text-green-700 text-sm">
                    📍 Carte interactive (simulation)
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800 flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    Producteur local
                  </h4>
                  <p className="text-sm text-gray-700">{product.producer}</p>
                  <p className="text-xs text-green-600 mt-1">{product.localCommunity}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Récolte responsable
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Période:</strong> {product.harvestSeason}</div>
                    <div><strong>Méthode:</strong> {product.sustainableBadge}</div>
                    <div className="text-blue-700 bg-blue-100 p-2 rounded text-xs">
                      💡 {product.biodiversityNote}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Bienfaits naturels :</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Mode d'utilisation :</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{product.usage}</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Précautions & Sensibilisation
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">{product.precautions}</p>
                  <div className="bg-orange-100 p-3 rounded text-sm text-orange-800">
                    ⚠️ {product.warning}
                  </div>
                </div>

                {product.reforestationContrib && (
                  <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <TreePine className="h-4 w-4 mr-2" />
                      Action pour la forêt
                    </h4>
                    <p className="text-sm text-green-700">
                      🌱 Une partie des ventes finance des actions de reboisement en Côte d'Ivoire
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm font-medium mb-1">
            🌿 Achetez en conscience • Protégeons la biodiversité ivoirienne • Commerce 100% équitable
          </p>
          <p className="text-xs text-green-100">
            Une partie des ventes financera des actions de reboisement en Côte d'Ivoire
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boutique REMÈDIA
            <span className="block text-lg font-normal text-green-600 mt-2">
              La nature se partage, elle ne s'épuise pas
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Découvrez nos produits naturels issus de la médecine traditionnelle ivoirienne. 
            Chaque achat soutient les communautés locales et participe à la protection de notre biodiversité.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="flex flex-col items-center space-y-2 text-green-700 bg-white p-4 rounded-lg shadow-sm">
              <Award className="h-6 w-6" />
              <span className="text-xs font-medium text-center">Certifié Bio</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-green-700 bg-white p-4 rounded-lg shadow-sm">
              <Users className="h-6 w-6" />
              <span className="text-xs font-medium text-center">Commerce Équitable</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-green-700 bg-white p-4 rounded-lg shadow-sm">
              <Leaf className="h-6 w-6" />
              <span className="text-xs font-medium text-center">100% Naturel</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-green-700 bg-white p-4 rounded-lg shadow-sm">
              <TreePine className="h-6 w-6" />
              <span className="text-xs font-medium text-center">Reboisement</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-green-700 bg-white p-4 rounded-lg shadow-sm">
              <Heart className="h-6 w-6" />
              <span className="text-xs font-medium text-center">Made in CI</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-green-700 bg-white p-4 rounded-lg shadow-sm">
              <Shield className="h-6 w-6" />
              <span className="text-xs font-medium text-center">Espèces Protégées</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-700 to-green-700 rounded-xl text-white p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="relative z-10 text-center">
            <TreePine className="h-12 w-12 mx-auto mb-4 text-emerald-200" />
            <h3 className="text-2xl font-bold mb-4">Protégeons la Forêt Ivoirienne</h3>
            <p className="text-emerald-100 mb-6 max-w-3xl mx-auto">
              La Côte d'Ivoire a perdu 80% de sa couverture forestière. Ensemble, protégeons ce qui reste 
              et reconstituons notre patrimoine naturel pour les générations futures.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-emerald-600 bg-opacity-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-emerald-200 mb-2">500+</div>
                <div className="text-sm text-emerald-100">Arbres plantés cette année</div>
              </div>
              <div className="bg-emerald-600 bg-opacity-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-emerald-200 mb-2">15%</div>
                <div className="text-sm text-emerald-100">Des ventes pour le reboisement</div>
              </div>
              <div className="bg-emerald-600 bg-opacity-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-emerald-200 mb-2">8</div>
                <div className="text-sm text-emerald-100">Villages partenaires</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Explorez nos produits</h3>
            
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border-2 transition-all font-medium text-sm ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white border-green-600 shadow-lg'
                      : 'border-green-200 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-3">Filtres écoresponsables :</p>
              <div className="flex flex-wrap justify-center gap-2">
                {ecoFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {getFilteredProducts().map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 space-y-1">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold block">
                    {product.category}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold block ${getConservationColor(product.conservationStatus)}`}>
                    {getConservationLabel(product.conservationStatus)}
                  </span>
                </div>
                <div className="absolute top-2 right-2 space-y-1">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold block ${
                    product.stock === 'En stock' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {product.stock}
                  </span>
                  {product.reforestationContrib && (
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-semibold block">
                      🌱 Reboisement
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded-md">
                    <div className="flex items-center space-x-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">
                        Impact: {product.ecoImpact}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-gray-600">{product.origin}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-gray-600">{product.localCommunity}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <Clock className="h-3 w-3 mr-1" />
                    {product.sustainableBadge}
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="mb-4 p-2 bg-orange-50 rounded-lg border-l-3 border-orange-300">
                  <p className="text-xs text-orange-800 leading-relaxed">
                    💡 {product.warning}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {product.priceLocal}
                    </div>
                    <div className="text-sm text-gray-500">
                      ({product.price}€)
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Info className="h-4 w-4" />
                      En savoir plus
                    </button>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Intéressé(e)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-green-600 mr-2" />
              Origine de nos plantes médicinales
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Découvrez les régions de Côte d'Ivoire d'où proviennent nos produits. 
              Chaque zone géographique offre des conditions climatiques uniques favorisant 
              des plantes aux propriétés spécifiques.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-8 mb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-sm text-gray-900">{product.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{product.origin}</p>
                  <p className="text-xs text-green-700">{product.producer}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="inline-block bg-green-200 text-green-800 px-4 py-6 rounded-lg">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Carte interactive complète</p>
                <p className="text-xs">Bientôt disponible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Boutique en ligne écoresponsable bientôt disponible
            </h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Notre plateforme d'achat en ligne intégrera des fonctionnalités uniques : 
              calculateur d'impact écologique, traçabilité complète des produits, 
              et contribution automatique aux projets de reboisement.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <TreePine className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-green-800">Compensation carbone</div>
                <div className="text-xs text-green-600">Calcul automatique</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <RefreshCw className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-blue-800">Traçabilité complète</div>
                <div className="text-xs text-blue-600">Du producteur à vous</div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center">
                <Users className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-emerald-800">Impact communautaire</div>
                <div className="text-xs text-emerald-600">Bénéfices directs</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-orange-800">Alertes conservation</div>
                <div className="text-xs text-orange-600">Espèces menacées</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 bg-green-50 p-4 rounded-lg">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">WhatsApp</div>
                  <div className="text-xs text-gray-600">+225 XX XX XX XX</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 bg-green-50 p-4 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">Téléphone</div>
                  <div className="text-xs text-gray-600">+225 XX XX XX XX</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 bg-green-50 p-4 rounded-lg">
                <Mail className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-sm">Email</div>
                  <div className="text-xs text-gray-600">boutique@remedia.ci</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Nos Partenaires Locaux</h3>
            <p className="text-green-100 max-w-3xl mx-auto">
              Tous nos produits sont issus de coopératives et groupements de producteurs ivoiriens. 
              En choisissant REMÈDIA, vous soutenez l'agriculture locale et le savoir-faire traditionnel, 
              tout en contribuant à la protection de notre environnement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Commerce Équitable</h4>
              <p className="text-green-100 text-sm">
                Prix justes garantis aux producteurs et respect des conditions de travail
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                <Leaf className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Culture Durable</h4>
              <p className="text-green-100 text-sm">
                Méthodes agricoles respectueuses de l'environnement et de la biodiversité
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2">Qualité Garantie</h4>
              <p className="text-green-100 text-sm">
                Contrôles qualité rigoureux et certification biologique
              </p>
            </div>
          </div>

          <div className="bg-green-500 bg-opacity-30 rounded-lg p-6">
            <h4 className="text-center font-semibold mb-4 text-green-100">Notre Impact en 2024</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">285</div>
                <div className="text-xs text-green-200">Femmes bénéficiaires</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-green-200">Villages partenaires</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-xs text-green-200">Arbres plantés</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">85%</div>
                <div className="text-xs text-green-200">Revenus redistribués</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-12">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              Notre Engagement pour la Biodiversité
            </h3>
            <p className="text-orange-700 mb-6 max-w-3xl mx-auto">
              La Côte d'Ivoire fait face à une urgence écologique. La déforestation menace 
              nos plantes médicinales ancestrales. REMÈDIA s'engage à sensibiliser et agir 
              concrètement pour leur préservation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <TreePine className="h-5 w-5 mr-2" />
                  Actions de Conservation
                </h4>
                <ul className="text-sm text-gray-700 space-y-2 text-left">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Plantation de 1000 arbres par an dans les zones dégradées</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Formation des communautés aux pratiques durables</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Création de pépinières communautaires</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Surveillance des espèces menacées</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Espèces Prioritaires
                </h4>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Karité (protégée)</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Surveillée</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Baobab (vulnérable)</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Priorité</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Argan local (surveillance)</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Attention</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Moringa (stable)</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Sécurisée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-800 to-green-800 rounded-xl text-white p-8 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-4 text-emerald-200" />
          <h3 className="text-2xl font-bold mb-4">
            "Achetez en conscience – la nature se partage, elle ne s'épuise pas"
          </h3>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
            Chaque produit REMÈDIA raconte l'histoire de nos ancêtres, porte l'espoir de nos communautés 
            et construit l'avenir de notre biodiversité. Merci de faire partie de cette mission.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-emerald-200">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Fait avec amour en Côte d'Ivoire</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-200">
              <TreePine className="h-5 w-5" />
              <span className="text-sm">Pour un avenir plus vert</span>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}

export default Shop;