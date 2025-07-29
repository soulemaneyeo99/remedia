import { ShoppingCart, Star, Plus } from 'lucide-react';

/**
 * Page Shop - Boutique de produits à base de plantes médicinales
 * 
 * Features :
 * - Catalogue de produits simulés
 * - Filtres par catégorie
 * - Ajout au panier (simulé)
 * - Design responsive
 */
function Shop() {
  // Données simulées des produits
  const products = [
    {
      id: 1,
      name: "Tisane Moringa Bio",
      price: "15.99",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Tisanes"
    },
    {
      id: 2,
      name: "Huile d'Argan Pure",
      price: "24.99",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Huiles"
    },
    {
      id: 3,
      name: "Baume au Karité",
      price: "12.50",
      image: "https://images.unsplash.com/photo-1556228578-dd6e4ced7fa9?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "Soins"
    },
    {
      id: 4,
      name: "Poudre de Baobab",
      price: "18.90",
      image: "https://images.unsplash.com/photo-1594736797933-d0bd15ba7427?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 73,
      category: "Compléments"
    }
  ];

  const handleAddToCart = (product) => {
    // Simulation d'ajout au panier
    alert(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boutique REMÉDIA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits naturels à base de plantes médicinales africaines
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Tous', 'Tisanes', 'Huiles', 'Soins', 'Compléments'].map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border-2 border-green-200 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image produit */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              {/* Détails produit */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Prix et bouton */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price}€
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message informatif */}
        <div className="mt-12 text-center bg-green-50 rounded-lg p-8">
          <ShoppingCart className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Boutique en développement
          </h3>
          <p className="text-gray-600">
            Cette boutique est une démonstration. Les produits et fonctionnalités de paiement seront intégrés prochainement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shop;