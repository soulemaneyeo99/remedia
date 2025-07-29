import { Link } from 'react-router-dom';
import { Camera, MessageCircle, Leaf, Users, Award, Globe } from 'lucide-react';
import PlantCard from '../components/PlantCard';

/**
 * Page Home - Page d'accueil de REMÉDIA
 * 
 * Features :
 * - Hero section avec CTA
 * - Aperçu des fonctionnalités principales
 * - Sélection de plantes populaires
 * - Statistiques de l'app
 */
function Home() {
  // Données simulées des plantes populaires
  const featuredPlants = [
    {
      id: 1,
      nom: "Moringa",
      nomScientifique: "Moringa oleifera",
      image: "https://images.unsplash.com/photo-1609501676725-7186f734457d?w=400&h=300&fit=crop",
      region: "Afrique de l'Ouest",
      usages: ["Nutrition", "Anti-inflammatoire", "Antioxydant"],
      difficulte: "Facile"
    },
    {
      id: 2,
      nom: "Kinkeliba",
      nomScientifique: "Combretum micranthum",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      region: "Sahel",
      usages: ["Digestion", "Détox", "Immunité"],
      difficulte: "Modérée"
    },
    {
      id: 3,
      nom: "Bissap",
      nomScientifique: "Hibiscus sabdariffa",
      image: "https://images.unsplash.com/photo-1563789031959-4c02c4441797?w=400&h=300&fit=crop",
      region: "Afrique tropicale",
      usages: ["Hypertension", "Antioxydant", "Rafraîchissant"],
      difficulte: "Facile"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Découvrez les plantes
              <span className="block text-green-200">médicinales africaines</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Explorez la richesse de la pharmacopée africaine traditionnelle avec notre app éducative interactive
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scan"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 transition-colors"
              >
                <Camera className="mr-2 h-5 w-5" />
                Scanner une plante
              </Link>
              <Link
                to="/chatbot"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-green-700 transition-colors"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Poser une question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Plantes répertoriées</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">10k+</h3>
              <p className="text-gray-600">Utilisateurs actifs</p>
            </div>
            <div>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600">Précision du scan</p>
            </div>
            <div>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15</h3>
              <p className="text-gray-600">Pays couverts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plantes populaires */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plantes les plus consultées
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les plantes médicinales africaines les plus populaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/scan"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Voir toutes les plantes
            </Link>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Une app complète pour apprendre
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Reconnaissance IA
              </h3>
              <p className="text-gray-600">
                Scannez n'importe quelle plante avec votre appareil photo et obtenez une identification instantanée
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Assistant IA
              </h3>
              <p className="text-gray-600">
                Posez vos questions à notre chatbot spécialisé dans les plantes médicinales africaines
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Base de données
              </h3>
              <p className="text-gray-600">
                Accédez à une encyclopédie complète avec propriétés, usages et modes de préparation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;