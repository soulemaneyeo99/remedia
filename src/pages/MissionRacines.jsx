import { useState } from 'react';
import { TreePine, Shield, MapPin, Award, Users, Leaf, BookOpen, School, Clock, Droplets, Heart } from 'lucide-react';

function MissionRacines() {
  const [activeTab, setActiveTab] = useState('savoir');
  const [plantations, setPlantations] = useState([]);
  const [formData, setFormData] = useState({
    typePlante: '',
    date: '',
    localisation: '',
    photo: null,
    commentaire: '',
    communaute: ''
  });

  // Données des espèces locales recommandées
  const especesLocales = [
    { nom: "Karité", periode: "Juin-Août", avantages: "Arbre sacré, fruits nutritifs", icon: "🛡️" },
    { nom: "Baobab", periode: "Mars-Mai", avantages: "Arbre millénaire, résistant", icon: "🌳" },
    { nom: "Moringa", periode: "Nov-Fév", avantages: "Croissance rapide, médicinal", icon: "🌿" },
    { nom: "Néré", periode: "Avril-Juin", avantages: "Fertilise les sols", icon: "🍂" }
  ];

  // Système de badges
  const badges = [
    { nom: "Débutant du vert", seuil: 1, icon: "🌱" },
    { nom: "Gardien du village", seuil: 5, icon: "🛡️" },
    { nom: "Héros de la biodiversité", seuil: 10, icon: "🏆" }
  ];

  const topPlanteurs = [
    { nom: "Aïcha K.", ville: "Abidjan", arbres: 23, badge: "🏆" },
    { nom: "Koffi D.", ville: "Bouaké", arbres: 18, badge: "🛡️" },
    { nom: "Mariam S.", ville: "Man", arbres: 15, badge: "🛡️" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const nouvellePlantation = {
      ...formData,
      id: Date.now(),
      dateSoumission: new Date().toLocaleDateString()
    };
    setPlantations([...plantations, nouvellePlantation]);
    setFormData({
      typePlante: '',
      date: '',
      localisation: '',
      photo: null,
      commentaire: '',
      communaute: ''
    });
    alert("Merci pour votre contribution ! Votre plantation a été enregistrée.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/texture-feuilles.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Mission Racines <span className="text-emerald-300">REMÈDIA</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            "Planter c'est protéger, chaque arbre est une mémoire"
          </p>
          <div className="bg-emerald-600 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
            <TreePine className="h-5 w-5 mr-2" />
            Rejoignez le mouvement citoyen
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-200">
          {[
            { id: 'savoir', label: 'Comprendre', icon: <BookOpen size={18} /> },
            { id: 'agir', label: 'Agir', icon: <TreePine size={18} /> },
            { id: 'carte', label: 'Carte', icon: <MapPin size={18} /> },
            { id: 'recompenses', label: 'Récompenses', icon: <Award size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium rounded-t-lg flex items-center space-x-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Section Comprendre */}
        {activeTab === 'savoir' && (
          <div className="space-y-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-green-700 text-white p-8 md:p-12 flex items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Notre Forêt Disparaît</h2>
                    <p className="text-lg mb-6">
                      La Côte d'Ivoire a perdu <span className="font-bold">80%</span> de ses forêts en 60 ans.
                      Chaque minute, l'équivalent de <span className="font-bold">4 terrains de football</span> disparaît.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-600 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">-80%</div>
                        <div className="text-sm">Forêts depuis 1960</div>
                      </div>
                      <div className="bg-green-600 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">200+</div>
                        <div className="text-sm">Espèces menacées</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 bg-emerald-50">
                  <h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-green-600" />
                    Notre Engagement
                  </h3>
                  <p className="mb-6">
                    REMÈDIA s'engage à replanter <span className="font-semibold">10 000 arbres</span> d'ici 2025,
                    en partenariat avec les communautés locales et selon les savoirs traditionnels.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Savoirs Ancestraux</h4>
                        <p className="text-sm text-gray-600">
                          Techniques de plantation transmises par les anciens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Espèces Locales</h4>
                        <p className="text-sm text-gray-600">
                          Privilégier les arbres adaptés à notre écosystème
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-green-600" />
                  Quand Planter ?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-800 font-bold">🌧️</div>
                    <div>
                      <h4 className="font-medium">Saison des pluies</h4>
                      <p className="text-sm text-gray-600">
                        De juin à octobre - Meilleure période pour la plupart des espèces
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 p-3 rounded-lg text-amber-800 font-bold">🌤️</div>
                    <div>
                      <h4 className="font-medium">Début de saison sèche</h4>
                      <p className="text-sm text-gray-600">
                        Novembre - Pour les espèces résistantes comme le baobab
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
                  <Droplets className="h-6 w-6 mr-2 text-green-600" />
                  Guide des Espèces
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {especesLocales.map((espece, index) => (
                    <div key={index} className="border border-green-200 rounded-lg p-3 hover:bg-green-50 transition-colors">
                      <div className="text-2xl mb-1">{espece.icon}</div>
                      <h4 className="font-medium">{espece.nom}</h4>
                      <p className="text-xs text-gray-600">{espece.periode}</p>
                    </div>
                  ))}
                </div>
                <a href="/guide-planteur-ivoirien.pdf" className="inline-block mt-4 text-green-600 text-sm font-medium hover:underline">
                  Télécharger le guide complet →
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200">
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">Planter en Communauté</h3>
              <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="md:w-1/2">
                  <p className="mb-4">
                    En Côte d'Ivoire, planter un arbre est un acte collectif. Rejoignez ou organisez des journées de plantation dans votre village, école ou entreprise.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <School className="h-5 w-5 text-amber-600" />
                      <span className="font-medium">Planter avec son école</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-amber-600" />
                      <span className="font-medium">Planter en famille</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-gray-100 h-40 rounded flex items-center justify-center text-gray-400">
                    [Calendrier des événements communautaires]
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Agir */}
        {activeTab === 'agir' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Enregistrer une Plantation</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de plante *</label>
                  <select
                    required
                    value={formData.typePlante}
                    onChange={(e) => setFormData({...formData, typePlante: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Sélectionner</option>
                    {especesLocales.map((espece, index) => (
                      <option key={index} value={espece.nom}>{espece.nom}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Localisation *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ville/village"
                      value={formData.localisation}
                      onChange={(e) => setFormData({...formData, localisation: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo (optionnel)</label>
                  <div className="mt-1 flex items-center">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 transition-colors">
                      <span>Choisir un fichier</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
                      />
                    </label>
                    {formData.photo && (
                      <span className="ml-3 text-sm text-gray-600">{formData.photo.name}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Communauté (optionnel)</label>
                  <input
                    type="text"
                    placeholder="Nom de l'école, association..."
                    value={formData.communaute}
                    onChange={(e) => setFormData({...formData, communaute: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                  <textarea
                    rows={3}
                    placeholder="Partagez votre expérience..."
                    value={formData.commentaire}
                    onChange={(e) => setFormData({...formData, commentaire: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <TreePine className="h-5 w-5" />
                  <span>Valider ma contribution</span>
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Vos Dernières Contributions</h3>
                {plantations.length > 0 ? (
                  <div className="space-y-4">
                    {plantations.slice(0, 3).map((plant, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{plant.typePlante}</span>
                          <span className="text-sm text-gray-500">{plant.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{plant.localisation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TreePine className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                    <p>Vous n'avez pas encore enregistré de plantation</p>
                  </div>
                )}
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">Conseils pour Bien Planter</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1">
                      <span>1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Choisir le bon emplacement</h4>
                      <p className="text-sm text-gray-600">Loin des constructions, avec espace pour grandir</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1">
                      <span>2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Préparer le sol</h4>
                      <p className="text-sm text-gray-600">Mélangez terre et compost naturel</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1">
                      <span>3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Arrosage régulier</h4>
                      <p className="text-sm text-gray-600">Surtout pendant les 2 premières années</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Carte */}
        {activeTab === 'carte' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Carte des Plantations</h2>
              <p className="text-gray-600">Visualisez l'impact collectif à travers le pays</p>
            </div>
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Carte interactive des plantations</p>
                <p className="text-sm text-gray-400">(Intégration Leaflet/Mapbox)</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{plantations.length}</div>
                  <div className="text-sm text-gray-600">Plantations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {[...new Set(plantations.map(p => p.localisation))].length}
                  </div>
                  <div className="text-sm text-gray-600">Localités</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {[...new Set(plantations.map(p => p.communaute))].length - 1}
                  </div>
                  <div className="text-sm text-gray-600">Communautés</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Récompenses */}
        {activeTab === 'recompenses' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-700 to-emerald-700 text-white">
                <h2 className="text-2xl font-bold mb-2">Votre Progrès</h2>
                <p className="opacity-90">
                  {plantations.length > 0 
                    ? `Vous avez planté ${plantations.length} arbre(s)`
                    : "Commencez votre parcours de planteur"}
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Badges à Découvrir</h3>
                <div className="grid grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border text-center ${
                        plantations.length >= badge.seuil
                          ? 'bg-green-50 border-green-300'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h4 className="font-medium">{badge.nom}</h4>
                      <p className="text-xs text-gray-500">
                        {plantations.length >= badge.seuil
                          ? "Obtenu !"
                          : `${badge.seuil} plantation(s) requise(s)`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Classement des Planteurs</h3>
              <div className="space-y-4">
                {topPlanteurs.map((planteur, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-amber-100 text-amber-800' : 
                      index === 1 ? 'bg-gray-100 text-gray-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{planteur.nom}</h4>
                      <p className="text-sm text-gray-600">{planteur.ville}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">{planteur.arbres}</span>
                      <span className="text-lg">{planteur.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Partagez Votre Action</h3>
              <p className="mb-4">
                Inspirez votre entourage en partageant votre contribution sur les réseaux sociaux avec le hashtag
                <span className="font-bold text-amber-700"> #MissionRacinesREMÈDIA</span>
              </p>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <span>Partager</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <span>Témoigner</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Heart className="h-10 w-10 mx-auto text-green-400 mb-4" />
          <h3 className="text-2xl font-bold mb-4">"Tu plantes un arbre, tu fais pousser l'avenir"</h3>
          <p className="max-w-2xl mx-auto mb-6 text-green-200">
            Merci de contribuer à préserver notre patrimoine naturel pour les générations futures.
            Chaque arbre planté est une mémoire vivante de notre terre ivoirienne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg transition-colors">
              Rejoindre la communauté
            </a>
            <a href="#" className="px-4 py-2 border border-green-400 hover:bg-green-800 rounded-lg transition-colors">
              Télécharger le guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionRacines;