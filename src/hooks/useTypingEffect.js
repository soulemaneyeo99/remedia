// hooks/useTypingEffect.js
// Hook personnalisé pour simuler l'effet de frappe du chatbot
import { useState, useEffect } from 'react';
import { APP_CONFIG } from '../utils/constants';

export const useTypingEffect = (fullText, startTyping = false, typingSpeed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!startTyping || !fullText) {
      setDisplayedText('');
      setIsTyping(false);
      setIsComplete(false);
      return;
    }

    setIsTyping(true);
    setIsComplete(false);
    setDisplayedText('');

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        setIsComplete(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [fullText, startTyping, typingSpeed]);

  return {
    displayedText,
    isTyping,
    isComplete
  };
};

// Hook pour gérer les messages du chatbot avec effet de frappe
export const useChatbotTyping = () => {
  const [messages, setMessages] = useState([]);
  const [currentTypingMessage, setCurrentTypingMessage] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // Ajouter un message utilisateur
  const addUserMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage.id;
  };

  // Ajouter une réponse du bot avec effet de frappe
  const addBotResponse = (responseText, delay = APP_CONFIG.TYPING_DELAY) => {
    setIsWaitingForResponse(true);
    
    // Simuler le délai de "réflexion" du bot
    setTimeout(() => {
      const botMessage = {
        id: Date.now(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      setCurrentTypingMessage(botMessage.id);
      setIsWaitingForResponse(false);
      
      // Démarrer l'effet de frappe
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < responseText.length) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, displayedText: responseText.slice(0, currentIndex + 1) }
                : msg
            )
          );
          currentIndex++;
        } else {
          // Frappe terminée
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, isTyping: false, displayedText: responseText }
                : msg
            )
          );
          setCurrentTypingMessage(null);
          clearInterval(typingInterval);
        }
      }, 30); // Vitesse de frappe
      
    }, delay);
  };

  // Effacer la conversation
  const clearMessages = () => {
    setMessages([]);
    setCurrentTypingMessage(null);
    setIsWaitingForResponse(false);
  };

  return {
    messages,
    addUserMessage,
    addBotResponse,
    clearMessages,
    isWaitingForResponse,
    currentTypingMessage
  };
};