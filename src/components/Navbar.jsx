// src/components/Layout/Navbar.jsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Leaf, Scan, MessageCircle, ShoppingBag, Home } from 'lucide-react'

/**
 * Navbar responsive avec menu mobile
 * Design moderne avec indicateur de page active
 * Logo REMÈDIA avec icône feuille
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Navigation items avec icônes
  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/scan', label: 'Scanner', icon: Scan },
    { path: '/chatbot', label: 'Assistant IA', icon: MessageCircle },
    { path: '/shop', label: 'Boutique', icon: ShoppingBag },
  ]

  // Vérifie si le lien est actif
  const isActive = (path) => location.pathname === path

  // Toggle menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo REMÈDIA */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-primary-700 hover:text-primary-800 transition-colors"
          >
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
              REMÈDIA
            </span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar