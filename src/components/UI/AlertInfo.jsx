// src/components/UI/AlertInfo.jsx
import React from 'react';
import { ALERT_TYPES } from '../../utils/constants';

/**
 * Composant d'alerte pour les informations médicales importantes
 * @param {string} type - Type d'alerte (warning, info, success, error)
 * @param {string} title - Titre de l'alerte
 * @param {string} message - Message principal
 * @param {React.ReactNode} children - Contenu personnalisé
 * @param {boolean} dismissible - Si l'alerte peut être fermée
 * @param {function} onDismiss - Callback de fermeture
 */
const AlertInfo = ({ 
  type = ALERT_TYPES.WARNING,
  title,
  message,
  children,
  dismissible = false,
  onDismiss,
  className = ""
}) => {
  // Configuration des styles selon le type
  const alertConfig = {
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
      icon: '⚠️'
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200', 
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
      icon: 'ℹ️'
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800', 
      iconColor: 'text-green-600',
      icon: '✅'
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600', 
      icon: '❌'
    }
  };

  const config = alertConfig[type] || alertConfig.warning;

  return (
    <div className={`
      ${config.bgColor} ${config.borderColor} ${config.textColor}
      border rounded-lg p-4 mb-4 relative
      ${className}
    `}>
      {/* Bouton de fermeture */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className={`
            absolute top-2 right-2 ${config.iconColor} hover:${config.textColor}
            transition-colors duration-200 text-lg leading-none
          `}
          aria-label="Fermer l'alerte"
        >
          ×
        </button>
      )}

      <div className="flex items-start gap-3">
        {/* Icône */}
        <span className={`${config.iconColor} text-xl flex-shrink-0`}>
          {config.icon}
        </span>

        <div className="flex-1">
          {/* Titre */}
          {title && (
            <h4 className={`font-semibold ${config.textColor} mb-2`}>
              {title}
            </h4>
          )}

          {/* Message */}
          {message && (
            <p className={`${config.textColor} leading-relaxed`}>
              {message}
            </p>
          )}

          {/* Contenu personnalisé */}
          {children && (
            <div className={`${config.textColor} mt-2`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Composants pré-configurés pour usage rapide
export const MedicalWarning = ({ title, message, children, ...props }) => (
  <AlertInfo 
    type={ALERT_TYPES.WARNING}
    title={title || "⚕️ Avertissement médical"}
    message={message}
    {...props}
  >
    {children}
  </AlertInfo>
);

export const UsageInfo = ({ title, message, children, ...props }) => (
  <AlertInfo 
    type={ALERT_TYPES.INFO}
    title={title || "💡 Information d'usage"}
    message={message}
    {...props}
  >
    {children}
  </AlertInfo>
);

export default AlertInfo;