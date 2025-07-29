import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSkeleton from './components/LoadingSkeleton';
import { FEATURE_FLAGS } from './utils/constants';

// Lazy loading des pages pour optimiser les performances
const Home = lazy(() => import('./pages/Home'));
const Scan = lazy(() => import('./pages/Scan'));
const PlantDetail = lazy(() => import('./pages/PlantDetail'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const Shop = lazy(() => import('./pages/Shop'));

/**
 * App Principal - Architecture complète de REMÉDIA
 * Structure optimisée avec lazy loading et gestion d'erreurs
 */
function App() {
  return (
    <>
      {/* Navigation globale */}
      <Navbar />

      {/* ScrollToTop doit être à l'intérieur du Router mais avant les Routes */}
      <ScrollToTop />

      {/* Contenu principal avec Suspense pour le lazy loading */}
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            
            {/* Routes conditionnelles basées sur les feature flags */}
            {FEATURE_FLAGS.ENABLE_CHATBOT && (
              <Route path="/chatbot" element={<Chatbot />} />
            )}
            {FEATURE_FLAGS.ENABLE_SHOP && (
              <Route path="/shop" element={<Shop />} />
            )}
            
            {/* Route 404 - doit être en dernier */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer global */}
      <Footer />
    </>
  );
}

/**
 * Page 404 personnalisée avec navigation React Router
 */
function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-green-600 mb-2">404</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page non trouvée
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-4">
          <a
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l'accueil
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-green-600 text-base font-medium rounded-lg text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;