// Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Lightbulb, Leaf, TrendingDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI with error handling
const initializeGenAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('Gemini API key not configured');
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

// Debug function to test API key
const testGeminiConnection = async () => {
  try {
    const genAI = initializeGenAI();
    if (!genAI) return false;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Hello');
    const response = await result.response;
    console.log('API test successful:', response.text());
    return true;
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const hasValidApiKey = apiKey && apiKey !== 'your_api_key_here';
    
    return [
      {
        id: '1',
        text: hasValidApiKey 
          ? "Hi! I'm EcoBot 🌱 I'm here to help you reduce your carbon footprint. What would you like to know about today?"
          : "Hi! I'm EcoBot 🌱 To get started, please add your Gemini API key to the .env file. Get your free key from: https://makersuite.google.com/app/apikey",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: hasValidApiKey ? [
          "How can I reduce my daily emissions?",
          "What's my carbon footprint trend?",
          "Suggest eco-friendly alternatives",
          "Help me set emission goals"
        ] : [
          "How do I get an API key?",
          "What is Gemini AI?",
          "Help with setup"
        ]
      }
    ];
  });

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
      // Check if API key is available
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_api_key_here') {
        console.error('Gemini API key not configured');
        return "⚠️ API key not configured. Please add your Gemini API key to the .env.local file. Get your key from: https://makersuite.google.com/app/apikey";
      }

      console.log('Attempting to call Gemini API...');
      const genAI = initializeGenAI();
      if (!genAI) {
        return "⚠️ Failed to initialize Gemini AI. Please check your API key configuration.";
      }

      // Try different model names in case gemini-pro is not available
      const modelNames = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.5-pro'];
      let model;

      for (const modelName of modelNames) {
        try {
          model = genAI.getGenerativeModel({ model: modelName });
          console.log(`Using model: ${modelName}`);
          break;
        } catch (error) {
          console.log(`Model ${modelName} not available, trying next...`);
          continue;
        }
      }

      if (!model) {
        return "❌ No available Gemini models found. Please check your API key permissions.";
      }
      
      const prompt = `You are EcoBot, an AI assistant focused on helping users reduce their carbon footprint. 
You help with sustainability questions, carbon emission calculations, eco-friendly tips, and environmental advice.
Provide helpful, specific, and actionable advice. Keep responses concise but informative.

User question: ${userMessage}`;

      console.log('Sending request to Gemini...');
      const result = await model.generateContent(prompt);
      console.log('Received response from Gemini');
      
      const response = await result.response;
      const text = response.text();
      
      console.log('Response text:', text);
      
      return text && text.trim() !== ''
        ? text.trim()
        : "Hmm, I couldn't find a good answer. Can you try rephrasing your question?";
    } catch (error: any) {
      console.error('Detailed Gemini API Error:', {
        message: error?.message,
        status: error?.status,
        statusText: error?.statusText,
        response: error?.response,
        stack: error?.stack,
        name: error?.name
      });
      
      // More specific error messages based on error type
      if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('API key') || error?.status === 401) {
        return "❌ Invalid API key. Please check your Gemini API key in the .env.local file.";
      } else if (error?.message?.includes('PERMISSION_DENIED') || error?.status === 403) {
        return "❌ Permission denied. Please verify your API key has the correct permissions or try generating a new API key.";
      } else if (error?.message?.includes('QUOTA_EXCEEDED') || error?.status === 429) {
        return "❌ API quota exceeded. Please check your Gemini API usage limits or try again later.";
      } else if (error?.status === 404 || error?.message?.includes('not found')) {
        return "❌ API endpoint not found. The model might not be available. Please try again or check if your API key has access to Gemini models.";
      } else if (error?.status === 400) {
        return "❌ Bad request. There might be an issue with the request format. Please try again.";
      } else if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return "🌐 Network error. Please check your internet connection. If you're behind a firewall, it might be blocking the API request.";
      } else if (error?.message?.includes('CORS')) {
        return "🔒 CORS error. This might be a browser security issue. Try refreshing the page.";
      } else {
        return `❌ Error: ${error?.message || 'Unknown error occurred'}. Status: ${error?.status || 'N/A'}. Please check the browser console for more details.`;
      }
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

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    const botText = await generateGeminiResponse(userMessage.text);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botText,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Tell me more about this",
        "Show me specific data",
        "What else can I do?",
        "Set a reminder for this"
      ]
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic if needed
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
          <button 
            onClick={async () => {
              const isWorking = await testGeminiConnection();
              alert(isWorking ? 'API connection successful!' : 'API connection failed - check console for details');
            }}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Test API Connection
          </button>
        </div>

        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl h-[700px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    }`}>
                      {message.sender === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>
                  </div>
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
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {messages.length > 0 &&
              messages[messages.length - 1].sender === 'bot' &&
              messages[messages.length - 1].suggestions && (
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

          {/* Input area */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-4">
              {[{ icon: Lightbulb, text: "Get eco tips", color: "text-yellow-400" },
                { icon: TrendingDown, text: "Check my progress", color: "text-blue-400" },
                { icon: Leaf, text: "Find alternatives", color: "text-green-400" }].map((action, index) => (
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