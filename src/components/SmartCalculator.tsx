import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Calendar, Zap } from 'lucide-react';

interface SmartSuggestion {
  category: string;
  value: number;
  confidence: number;
  reason: string;
  lastUsed: string;
}

interface SmartCalculatorProps {
  category: string;
  onSuggestionAccept: (value: number) => void;
}

const SmartCalculator: React.FC<SmartCalculatorProps> = ({ category, onSuggestionAccept }) => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock data - in real app, this would come from user's history
  const mockSuggestions = {
    electricity: [
      { category: 'electricity', value: 12.5, confidence: 85, reason: 'Your usual daily consumption', lastUsed: '2 days ago' },
      { category: 'electricity', value: 15.2, confidence: 72, reason: 'Weekend usage pattern', lastUsed: '1 week ago' }
    ],
    travel: [
      { category: 'travel', value: 5.8, confidence: 90, reason: 'Daily commute distance', lastUsed: 'yesterday' },
      { category: 'travel', value: 25.0, confidence: 65, reason: 'Weekend trip pattern', lastUsed: '3 days ago' }
    ],
    food: [
      { category: 'food', value: 1.2, confidence: 78, reason: 'Average meal portion', lastUsed: 'today' },
      { category: 'food', value: 2.5, confidence: 82, reason: 'Weekend cooking pattern', lastUsed: '2 days ago' }
    ]
  };

  useEffect(() => {
    if (mockSuggestions[category as keyof typeof mockSuggestions]) {
      setSuggestions(mockSuggestions[category as keyof typeof mockSuggestions]);
      setShowSuggestions(true);
    }
  }, [category]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (confidence >= 60) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electricity': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'travel': return <span className="text-blue-400">🚗</span>;
      case 'food': return <span className="text-green-400">🍽️</span>;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Brain className="w-5 h-5 text-blue-400" />
        <h4 className="text-blue-400 font-semibold">Smart Suggestions</h4>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center space-x-3">
              {getCategoryIcon(suggestion.category)}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{suggestion.value}</span>
                  <span className={`px-2 py-1 rounded text-xs border ${getConfidenceColor(suggestion.confidence)}`}>
                    {suggestion.confidence}% match
                  </span>
                </div>
                <div className="text-gray-400 text-sm">{suggestion.reason}</div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Last used {suggestion.lastUsed}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onSuggestionAccept(suggestion.value)}
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
            >
              Use This
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <button
          onClick={() => setShowSuggestions(false)}
          className="text-gray-400 text-sm hover:text-gray-300 transition-colors"
        >
          Hide suggestions
        </button>
      </div>
    </div>
  );
};

export default SmartCalculator;