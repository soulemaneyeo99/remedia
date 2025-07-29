import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Leaf,
  Scan,
  MessageCircle,
  ShoppingBag,
  Home,
} from 'lucide-react';

/**
 * Composant Navbar
 *
 * ✅ Navbar responsive avec menu mobile animé
 * ✅ Indicateur de page active
 * ✅ Icône "NEW" possible pour certaines entrées (à activer dans navItems)
 * ✅ Design moderne avec Tailwind CSS
 */

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Liens de navigation
  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/scan', label: 'Scanner', icon: Scan },
    { path: '/chatbot', label: 'Assistant IA', icon: MessageCircle },
    { path: '/shop', label: 'Boutique', icon: ShoppingBag, isNew: true },
  ];

  // Vérifie si la route est active
  const isActive = (path) => location.pathname === path;

  // Toggle menu mobile
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo REMÈDIA */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary-700 hover:text-primary-800 transition-colors"
          >
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
              REMÈDIA
            </span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon, isNew }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {isNew && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon, isNew }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                  {isNew && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
