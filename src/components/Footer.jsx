// src/components/Footer.jsx
import { Heart, Leaf } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-earth-brown text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-african-gold" />
              <span className="font-display text-2xl font-bold">REMÈDIA</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Valoriser la médecine traditionnelle africaine grâce à la technologie moderne 
              pour préserver ce patrimoine millénaire.
            </p>
          </div>

          {/* Navigation rapide */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-african-gold">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/scan" className="text-gray-300 hover:text-white transition-colors">Scanner une plante</a></li>
              <li><a href="/chatbot" className="text-gray-300 hover:text-white transition-colors">Assistant IA</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-white transition-colors">Boutique</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-african-gold">À propos</h3>
            <p className="text-gray-300">
              Projet développé avec passion pour préserver et partager 
              les connaissances ancestrales africaines.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center space-x-1">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>pour l'Afrique • © 2024 REMÈDIA</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer