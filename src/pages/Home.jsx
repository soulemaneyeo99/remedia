import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Globe, 
  TestTube, 
  MessageCircle, 
  ShoppingBag, 
  Camera, 
  MapPin,
  TreePine,
  Heart,
  ArrowRight,
  Sprout,
  Users,
  BookOpen
} from 'lucide-react';

// Données simulées des plantes (remplacez par l'import de plantes.json)
const plantesData = [
  {
    id: 1,
    nom: "Baobab",
    nomScientifique: "Adansonia digitata",
    description: "L'arbre de vie, symbole de résistance et de longévité",
    proprietes: ["Antioxydant", "Digestif", "Nutritif"],
    // image: null - pas d'image disponible
  },
  {
    id: 2,
    nom: "Moringa",
    nomScientifique: "Moringa oleifera",
    description: "L'arbre miracle aux multiples vertus nutritionnelles",
    proprietes: ["Énergisant", "Anti-inflammatoire", "Nutritif"],
    // image: null - pas d'image disponible
  },
  {
    id: 3,
    nom: "Artemisia",
    nomScientifique: "Artemisia annua",
    description: "Plante aux propriétés antipaludiques reconnues",
    proprietes: ["Antipaludique", "Antimicrobien", "Digestif"],
    // image: null - pas d'image disponible
  }
];

const PlantCard = ({ plante, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100">
      {/* Fallback élégant pour image manquante */}
      <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <p className="text-green-700 font-medium text-sm">Image à venir</p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-gray-800 text-lg mb-1">{plante.nom}</h3>
          <p className="text-green-600 italic text-sm font-medium">{plante.nomScientifique}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plante.description}</p>
        
        {plante.proprietes && (
          <div className="flex flex-wrap gap-1 mb-4">
            {plante.proprietes.slice(0, 2).map((propriete, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                {propriete}
              </span>
            ))}
          </div>
        )}
        
        <button
          onClick={() => onViewDetails(plante)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Voir la fiche
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, link, gradient }) => {
  const handleClick = () => {
    // Navigation simulée - remplacez par useNavigate() dans votre app React Router
    console.log(`Navigating to: ${link}`);
    // navigate(link);
  };
  
  return (
    <div 
      className={`bg-gradient-to-br ${gradient} rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-white text-lg">{title}</h3>
      </div>
      <p className="text-white/90 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([]);

  // Navigation simulée - remplacez par useNavigate() dans votre app React Router
  const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
    // navigate(path);
  };

  useEffect(() => {
    // Charger les plantes featured (ici simulé, remplacez par le vrai import)
    setFeaturedPlants(plantesData.slice(0, 3));
  }, []);

  const handleViewPlantDetails = (plante) => {
    navigateTo(`/plant/${plante.id}`);
  };

  const features = [
    {
      icon: Camera,
      title: "Scanner une plante",
      description: "Identifiez instantanément les plantes médicinales grâce à notre IA avancée",
      link: "/scan",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Globe,
      title: "Carte collaborative",
      description: "Explorez et contribuez à notre cartographie mondiale des plantes médicinales",
      link: "/observations-map",
      gradient: "from-blue-500 to-teal-600"
    },
    {
      icon: TreePine,
      title: "Mission Racines",
      description: "Formation et suivi de vos plantations pour lutter contre la déforestation",
      link: "/mission-racines",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: MessageCircle,
      title: "Assistant IA",
      description: "Posez vos questions sur les plantes médicinales à notre chatbot expert",
      link: "/chatbot",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: ShoppingBag,
      title: "Boutique éthique",
      description: "Découvrez nos produits naturels issus du commerce équitable",
      link: "/shop",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: MapPin,
      title: "Biodiversité",
      description: "Explorez la richesse de la biodiversité africaine sur notre carte interactive",
      link: "/biodiversity-map",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bandeau d'appel à l'action */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 font-medium">
            <Sprout className="w-5 h-5" />
            Participez à la Mission Racines 🌱 et devenez un gardien de la biodiversité
            <button 
              onClick={() => navigateTo('/mission-racines')}
              className="ml-2 underline hover:no-underline"
            >
              En savoir plus
            </button>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="text-green-600">REMÉDIA</span>
            <br />
            <span className="text-2xl md:text-3xl font-normal text-gray-600">
              La sagesse des plantes africaines
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Découvrez, préservez et valorisez le patrimoine botanique africain. 
            Une plateforme dédiée à l'éducation écologique, au reboisement et à la 
            reconnaissance des plantes médicinales traditionnelles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo('/scan')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <Camera className="w-5 h-5" />
              Scanner une plante
            </button>
            <button 
              onClick={() => navigateTo('/observations-map')}
              className="bg-white hover:bg-gray-50 text-green-600 font-semibold py-4 px-8 rounded-xl border-2 border-green-600 flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <Globe className="w-5 h-5" />
              Explorer la carte
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Notre Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Préserver la biodiversité africaine et transmettre les savoirs ancestraux 
              pour un avenir plus durable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <TestTube className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Revalorisation</h3>
              <p className="text-gray-600">
                Redécouvrir et documenter les propriétés des plantes médicinales africaines 
                grâce à la science moderne
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <TreePine className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Reboisement</h3>
              <p className="text-gray-600">
                Lutter activement contre la déforestation par l'éducation, la formation 
                et l'action communautaire
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Éducation</h3>
              <p className="text-gray-600">
                Transmettre les connaissances écologiques et sensibiliser aux enjeux 
                de la biodiversité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explorez nos fonctionnalités
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Des outils modernes au service de la connaissance traditionnelle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Plantes en vedette
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Découvrez quelques-unes des plantes médicinales africaines les plus remarquables
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlants.map((plante) => (
              <PlantCard 
                key={plante.id} 
                plante={plante} 
                onViewDetails={handleViewPlantDetails}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigateTo('/plants')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl flex items-center justify-center gap-2 mx-auto transition-colors duration-200"
            >
              Voir toutes les plantes
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Users className="w-16 h-16 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Plus de 10,000 passionnés de nature contribuent déjà à préserver 
              la biodiversité africaine. Et vous ?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="text-white/80">Plantes documentées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15,000+</div>
              <div className="text-white/80">Arbres plantés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-white/80">Communautés actives</div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/community')}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 inline-flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Rejoindre la communauté
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;