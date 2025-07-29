// src/components/Footer.jsx
import { Heart, Leaf } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-earth-brown text-white mt-20" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-african-gold" />
              <span className="font-display text-2xl font-bold tracking-wide">
                REMÈDIA
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-sm">
              Valoriser la médecine traditionnelle africaine grâce à la technologie moderne pour préserver ce patrimoine millénaire.
            </p>
          </div>

          {/* Liens utiles */}
          <nav aria-label="Navigation principale">
            <h3 className="font-display text-xl font-semibold text-african-gold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/scan" className="text-gray-300 hover:text-white transition-colors">Scanner une plante</a></li>
              <li><a href="/chatbot" className="text-gray-300 hover:text-white transition-colors">Assistant IA</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-white transition-colors">Boutique</a></li>
            </ul>
          </nav>

          {/* À propos / Contact */}
          <div>
            <h3 className="font-display text-xl font-semibold text-african-gold mb-4">À propos</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Projet développé avec passion pour préserver et transmettre les connaissances ancestrales africaines au service de la santé naturelle.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-1">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>pour l’Afrique • © {new Date().getFullYear()} REMÈDIA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
