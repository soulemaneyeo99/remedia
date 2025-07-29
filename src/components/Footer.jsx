import React from 'react';
import { Heart, Leaf, Users, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
      {/* Section principale */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1: À propos */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <h3 className="text-2xl font-bold text-green-300">REMÈDIA</h3>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Valoriser la médecine traditionnelle africaine grâce à la technologie moderne pour préserver ce patrimoine millénaire.
            </p>
            <div className="flex items-center space-x-2 text-green-300">
              <Heart className="h-4 w-4 fill-current" />
              <span className="text-sm">Fait avec passion pour l'Afrique</span>
            </div>
          </div>

          {/* Colonne 2: Fonctionnalités */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-300 mb-4">Fonctionnalités</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Scanner une plante</span>
              </li>
              <li className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Assistant IA spécialisé</span>
              </li>
              <li className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Encyclopédie complète</span>
              </li>
              <li className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Observations communautaires</span>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-300 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-green-100 hover:text-white transition-colors cursor-pointer">
                Accueil
              </li>
              <li className="text-green-100 hover:text-white transition-colors cursor-pointer">
                Scanner une plante
              </li>
              <li className="text-green-100 hover:text-white transition-colors cursor-pointer">
                Assistant IA
              </li>
              <li className="text-green-100 hover:text-white transition-colors cursor-pointer">
                Boutique
              </li>
              <li className="text-green-100 hover:text-white transition-colors cursor-pointer">
                Carte des observations
              </li>
            </ul>
          </div>

          {/* Colonne 4: Contact & Mission */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-300 mb-4">Notre Mission</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Users className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-100">Préserver les savoirs ancestraux</span>
              </div>
              <div className="flex items-start space-x-2">
                <Globe className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-100">Connecter les communautés</span>
              </div>
              <div className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-100">Protéger la biodiversité</span>
              </div>
            </div>
            
            {/* Contact rapide */}
            <div className="pt-4 border-t border-green-700">
              <div className="flex items-center space-x-2 text-green-100 text-xs">
                <Mail className="h-3 w-3" />
                <span>contact@remedia.africa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright avec design amélioré */}
      <div className="border-t border-green-700 bg-green-950">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-green-200 text-sm">
              <span>© 2025 REMÈDIA</span>
              <span className="text-green-500">•</span>
              <span>Tous droits réservés</span>
            </div>
            
            <div className="flex items-center space-x-4 text-green-200 text-sm">
              <span className="hover:text-white transition-colors cursor-pointer">Politique de confidentialité</span>
              <span className="text-green-500">•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Conditions d'utilisation</span>
              <span className="text-green-500">•</span>
              <div className="flex items-center space-x-1">
                <span>Fait avec</span>
                <Heart className="h-3 w-3 text-red-400 fill-current animate-pulse" />
                <span>pour l'Afrique</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur écologique */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 text-white text-xs">
            <Leaf className="h-3 w-3" />
            <span className="font-medium">Application éco-responsable</span>
            <span className="text-green-200">•</span>
            <span>Zéro impact sur la biodiversité</span>
            <span className="text-green-200">•</span>
            <span>Développement éthique</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;