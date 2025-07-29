import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Leaf, BookOpen, AlertCircle, Heart } from 'lucide-react';

// Simuler les réponses du chatbot - remplace par ton fichier chatResponses.json
const chatResponses = {
  greetings: [
    "Bonjour ! Je suis votre assistant REMÈDIA 🌿. Comment puis-je vous aider avec les plantes médicinales africaines aujourd'hui ?",
    "Salut ! Prêt à découvrir les secrets de la médecine traditionnelle africaine ? 🌍",
    "Hello ! Je suis là pour répondre à vos questions sur les plantes médicinales. Que souhaitez-vous savoir ?"
  ],
  plantQuestions: [
    "Cette plante est riche en composés actifs naturels. Puis-je vous donner plus de détails sur ses propriétés ?",
    "Excellente question ! Cette plante a une longue histoire d'utilisation traditionnelle. Voici ce que je peux vous dire...",
    "Intéressant ! Cette espèce est particulièrement appréciée pour ses vertus thérapeutiques. Laissez-moi vous expliquer..."
  ],
  conservation: [
    "La conservation est cruciale ! REMÈDIA encourage toujours la culture responsable plutôt que la cueillette sauvage 🌱",
    "C'est une préoccupation importante. Nous devons protéger ces espèces pour les générations futures.",
    "Excellente question écologique ! La durabilité est au cœur de notre mission."
  ],
  fallback: [
    "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question sur les plantes médicinales ?",
    "Hmm, pouvez-vous être plus spécifique ? Je suis spécialisé dans la médecine traditionnelle africaine.",
    "Désolé, je n'ai pas bien saisi. Parlez-moi plutôt des plantes qui vous intéressent !"
  ]
};

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
    <span className="text-gray-500 text-sm ml-2">REMÈDIA écrit...</span>
  </div>
);

const ChatMessage = ({ message, isBot, timestamp, isTyping }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`flex max-w-xs lg:max-w-md ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-green-100 mr-3' : 'bg-blue-100 ml-3'
      }`}>
        {isBot ? <Bot className="w-4 h-4 text-green-600" /> : <User className="w-4 h-4 text-blue-600" />}
      </div>
      <div className={`px-4 py-2 rounded-2xl ${
        isBot 
          ? 'bg-white border border-green-200 text-gray-800' 
          : 'bg-blue-600 text-white'
      } shadow-sm`}>
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <>
            <p className="text-sm leading-relaxed">{message}</p>
            <p className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-blue-100'}`}>
              {timestamp}
            </p>
          </>
        )}
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick, color = "green" }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 bg-${color}-50 border border-${color}-200 rounded-full text-${color}-700 hover:bg-${color}-100 transition-colors text-sm font-medium`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const Chatbot = ({ initialPlant = null, onNavigateToPlant }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Message d'accueil avec effet de typing
    const welcomeMessage = chatResponses.greetings[0];
    
    if (initialPlant) {
      // Si on vient d'une plante spécifique
      setTimeout(() => {
        addBotMessage(`Je vois que vous vous intéressez au ${initialPlant.nom} ! C'est une plante fascinante. Que souhaitez-vous savoir à son sujet ?`);
      }, 1000);
    } else {
      // Message d'accueil général
      setTimeout(() => {
        addBotMessage(welcomeMessage);
      }, 500);
    }
  }, [initialPlant]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (message) => {
    setIsTyping(true);
    setShowQuickActions(false);
    
    // Simuler la vitesse de typing (plus réaliste)
    const typingDelay = Math.min(message.length * 30, 2000); // Max 2s
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: message,
        isBot: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }]);
      setIsTyping(false);
      setShowQuickActions(true);
    }, typingDelay);
  };

  const addUserMessage = (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickActions(false);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Analyse simple des mots-clés
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return chatResponses.greetings[Math.floor(Math.random() * chatResponses.greetings.length)];
    }
    
    if (lowerMessage.includes('conservation') || lowerMessage.includes('cueillette') || lowerMessage.includes('protéger')) {
      return chatResponses.conservation[Math.floor(Math.random() * chatResponses.conservation.length)];
    }
    
    if (lowerMessage.includes('plante') || lowerMessage.includes('propriété') || lowerMessage.includes('vertu')) {
      return chatResponses.plantQuestions[Math.floor(Math.random() * chatResponses.plantQuestions.length)];
    }
    
    if (lowerMessage.includes('aloe') || lowerMessage.includes('aloé')) {
      return "L'Aloe Vera est exceptionnelle ! Ses propriétés cicatrisantes sont reconnues depuis l'Antiquité. Souhaitez-vous en savoir plus sur sa composition chimique ou ses usages traditionnels ? 🌿";
    }
    
    if (lowerMessage.includes('moringa')) {
      return "Le Moringa est surnommé 'l'arbre de vie' ! Il est incroyablement nutritif. Les feuilles contiennent plus de vitamine C que les oranges et plus de calcium que le lait. Impressionnant, non ? 🌳";
    }
    
    return chatResponses.fallback[Math.floor(Math.random() * chatResponses.fallback.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');
    
    // Réponse du bot après un délai
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      addBotMessage(response);
    }, 500);
  };

  const handleQuickAction = (actionType) => {
    const actions = {
      'plant-info': "Parlez-moi des propriétés de l'Aloe Vera",
      'conservation': "Comment puis-je cultiver des plantes médicinales de manière responsable ?",
      'traditional-use': "Quels sont les usages traditionnels du Moringa ?",
      'safety': "Quelles précautions prendre avec les plantes médicinales ?"
    };
    
    const message = actions[actionType];
    if (message) {
      addUserMessage(message);
      setTimeout(() => {
        const response = getBotResponse(message);
        addBotMessage(response);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-xl p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Assistant REMÈDIA</h1>
              <p className="text-sm text-gray-600">Expert en médecine traditionnelle africaine</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">En ligne</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white shadow-xl h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex flex-row max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-100 mr-3">
                  <Bot className="w-4 h-4 text-green-600" />
                </div>
                <div className="bg-white border border-green-200 rounded-2xl shadow-sm">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Actions rapides */}
        {showQuickActions && messages.length <= 2 && (
          <div className="bg-white shadow-xl px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Actions rapides :</p>
            <div className="flex flex-wrap gap-2">
              <QuickAction
                icon={Leaf}
                label="Propriétés des plantes"
                onClick={() => handleQuickAction('plant-info')}
                color="green"
              />
              <QuickAction
                icon={Heart}
                label="Culture responsable"
                onClick={() => handleQuickAction('conservation')}
                color="blue"
              />
              <QuickAction
                icon={BookOpen}
                label="Usages traditionnels"
                onClick={() => handleQuickAction('traditional-use')}
                color="purple"
              />
              <QuickAction
                icon={AlertCircle}
                label="Précautions"
                onClick={() => handleQuickAction('safety')}
                color="orange"
              />
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white rounded-b-2xl shadow-xl p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question sur les plantes médicinales..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Appuyez sur Entrée pour envoyer</span>
            <span>{inputValue.length}/500</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ <strong>Important :</strong> Ces informations sont à des fins éducatives uniquement. 
            Consultez toujours un professionnel de santé avant d'utiliser des plantes médicinales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;