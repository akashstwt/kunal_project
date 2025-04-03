import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types';
import ChatMessage from './ChatMessage';
import LoadingDots from './LodingDots';
import LanguageSelector from './LangaugeSelector';
import { getChatResponse } from '@/lib/openai';
import { detectLanguage } from '@/lib/langaugeDetection';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [autoDetect, setAutoDetect] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Determine language
    let messageLanguage = selectedLanguage;
    if (autoDetect) {
      messageLanguage = detectLanguage(inputMessage);
    }

    const userMessage: Message = {
      id: uuidv4(),
      content: inputMessage,
      role: 'user',
      language: messageLanguage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Format messages for API
      const apiMessages = messages
        .concat(userMessage)
        .map(({ content, role }) => ({ content, role }));

      const response = await getChatResponse(apiMessages, messageLanguage);

      const assistantMessage: Message = {
        id: uuidv4(),
        content: response.message,
        role: 'assistant',
        language: response.language,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          content: 'Sorry, I encountered an error. Please try again.',
          role: 'assistant',
          language: 'en',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl text-black mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
        <div className="p-4 bg-primary-700 text-black">
          <h1 className="text-xl font-bold text-center">Multilingual Chatbot</h1>
        </div>

        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          autoDetect={autoDetect}
          onAutoDetectChange={setAutoDetect}
        />

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-8">
              <p>Send a message in any language to start chatting!</p>
              <p className="text-sm mt-2">
                The chatbot can detect and respond in multiple languages.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <LoadingDots />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex text-black">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 text-black p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Type your message in any language..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-600 text-white p-2 px-4 rounded-r-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;