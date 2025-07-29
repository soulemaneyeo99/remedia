// src/components/UI/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant pour forcer la remontée en haut de page à chaque navigation
 * À placer dans App.jsx à côté des Routes
 * 
 * Utilise useLocation pour détecter les changements de route
 * et scroll automatiquement vers le haut
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut de façon fluide
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Se déclenche à chaque changement de route

  return null; // Ce composant ne rend rien visuellement
};

export default ScrollToTop;