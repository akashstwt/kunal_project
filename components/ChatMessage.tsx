import React from 'react';
import { Message } from '@/types';
import { getLanguageName } from '@/lib/langaugeDetection';

interface ChatMessageProps {
  message: Message;
  showLanguageIndicator?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  showLanguageIndicator = true 
}) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`message-bubble ${
          message.role === 'user' ? 'user-message' : 'bot-message'
        } relative`}
      >
        {message.language && showLanguageIndicator && message.role === 'assistant' && (
          <div className="absolute -top-5 left-0 text-xs text-gray-500">
            {getLanguageName(message.language)} {message.language && (
              <span>{supportedLanguages.find(l => l.code === message.language)?.flag}</span>
            )}
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;

// Add this at the bottom to avoid re-declaration error
import { supportedLanguages } from '@/lib/langaugeDetection';