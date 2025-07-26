import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Lightbulb, Leaf, TrendingDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm EcoBot 🌱 I'm here to help you reduce your carbon footprint. What would you like to know about today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "How can I reduce my daily emissions?",
        "What's my carbon footprint trend?",
        "Suggest eco-friendly alternatives",
        "Help me set emission goals"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are EcoBot, an AI assistant focused on helping users reduce their carbon footprint. 
      Provide helpful, specific advice about sustainability and environmental impact.
      Keep responses concise and practical.
      Current user message: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponseText = await generateGeminiResponse(inputText);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "Show me specific data",
          "What else can I do?",
          "Set a reminder for this"
        ]
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual voice recording functionality
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Bot className="w-10 h-10 text-green-400 mr-3" />
            EcoBot Assistant
          </h1>
          <p className="text-gray-400 text-lg">Your AI-powered sustainability companion</p>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl h-[700px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-6 py-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                      : 'bg-gray-800 border border-gray-700 text-gray-100'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex mr-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 text-gray-100 rounded-2xl px-6 py-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].suggestions && (
              <div className="flex flex-wrap gap-2 justify-start">
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-gray-300 text-sm hover:border-green-500 hover:text-green-400 transition-all duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-700">
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: Lightbulb, text: "Get eco tips", color: "text-yellow-400" },
                { icon: TrendingDown, text: "Check my progress", color: "text-blue-400" },
                { icon: Leaf, text: "Find alternatives", color: "text-green-400" }
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(action.text)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-gray-300 hover:border-green-500 hover:text-green-400 transition-all duration-200"
                >
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                  <span className="text-sm">{action.text}</span>
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about reducing your carbon footprint..."
                  className="w-full p-4 pr-12 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none"
                  rows={1}
                />
              </div>
              
              <button
                onClick={toggleRecording}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  isRecording
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl hover:from-green-400 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;