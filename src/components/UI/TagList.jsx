// src/components/UI/TagList.jsx
import React from 'react';

/**
 * Composant pour afficher une liste de tags de plantes médicinales
 * @param {Array} tags - Liste des tags à afficher (ex: ["anti-inflammatoire", "détoxifiant"])
 * @param {string} variant - Style des tags ("primary", "secondary", "outline")
 * @param {string} size - Taille des tags ("sm", "md", "lg")
 * @param {number} maxTags - Nombre maximum de tags à afficher
 */
const TagList = ({ 
  tags = [], 
  variant = "primary", 
  size = "md",
  maxTags = null,
  className = ""
}) => {
  // Si pas de tags, ne rien afficher
  if (!tags || tags.length === 0) return null;

  // Limiter le nombre de tags si spécifié
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;
  const hasMoreTags = maxTags && tags.length > maxTags;

  // Styles selon la variante
  const variantStyles = {
    primary: "bg-green-100 text-green-800 border-green-200",
    secondary: "bg-blue-100 text-blue-800 border-blue-200", 
    outline: "bg-transparent text-gray-700 border-gray-300",
    medical: "bg-red-50 text-red-700 border-red-200"
  };

  // Styles selon la taille
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm", 
    lg: "px-4 py-2 text-base"
  };

  const tagClasses = `
    inline-flex items-center rounded-full border font-medium
    ${variantStyles[variant]} 
    ${sizeStyles[size]}
    transition-colors duration-200 hover:opacity-80
  `.trim();

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag, index) => (
        <span 
          key={index}
          className={tagClasses}
          title={tag} // Tooltip au survol
        >
          {tag}
        </span>
      ))}
      
      {hasMoreTags && (
        <span className="px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-full border border-gray-200">
          +{tags.length - maxTags} autres
        </span>
      )}
    </div>
  );
};

export default TagList;