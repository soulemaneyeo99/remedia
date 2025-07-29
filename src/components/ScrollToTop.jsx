import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant ScrollToTop optimisé
 * Force le scroll en haut de la page à chaque changement de route
 * 
 * Fonctionnalités:
 * - Scroll fluide avec fallback instant
 * - Gestion des erreurs de scroll
 * - Performance optimisée avec useCallback
 * - Support des navigateurs anciens
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  const scrollToTop = useCallback(() => {
    try {
      // Si il y a un hash (#section), laisser le navigateur gérer le scroll
      if (hash) {
        return;
      }

      // Vérifier si scrollTo avec options est supporté
      if (typeof window !== 'undefined' && 'scrollTo' in window) {
        // Tentative de scroll fluide
        const supportsOptions = 'scrollBehavior' in document.documentElement.style;
        
        if (supportsOptions) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Fallback pour les navigateurs plus anciens
          window.scrollTo(0, 0);
        }
      }
    } catch (error) {
      // Fallback en cas d'erreur
      console.warn('Erreur lors du scroll automatique:', error);
      try {
        window.scrollTo(0, 0);
      } catch (fallbackError) {
        console.warn('Impossible de faire le scroll automatique');
      }
    }
  }, [hash]);

  useEffect(() => {
    // Petit délai pour s'assurer que le rendu est terminé
    const timeoutId = setTimeout(scrollToTop, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, scrollToTop]);

  // Ce composant ne rend rien visuellement
  return null;
}