import React, { useState } from 'react';
import {
  Lightbulb,
  RefreshCw,
  BookOpen,
  Leaf,
  Star,
  TrendingUp,
  Share2,
  Heart
} from 'lucide-react';
import clsx from 'clsx';

type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

const categories: Category[] = [
  { id: 'all', name: 'All Tips', icon: Lightbulb },
  {
    id: 'energy',
    name: 'Energy',
    icon: (props) => <span {...props} className={clsx(props.className, 'text-lg')}>⚡</span>
  },
  { id: 'transport', name: 'Transport', icon: (props) => <span {...props} className={clsx(props.className, 'text-lg')}>🚗</span> },
  { id: 'food', name: 'Food', icon: (props) => <span {...props} className={clsx(props.className, 'text-lg')}>🍽️</span> },
  { id: 'waste', name: 'Waste', icon: (props) => <span {...props} className={clsx(props.className, 'text-lg')}>♻️</span> },
  { id: 'shopping', name: 'Shopping', icon: (props) => <span {...props} className={clsx(props.className, 'text-lg')}>🛍️</span> }
];

type Tip = {
  id: number;
  category: string;
  title: string;
  description: string;
  impact: string;
  co2_saved: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
  likes: number;
  featured: boolean;
};

const tips: Tip[] = [
  { id: 1, category: 'energy', title: 'Switch to LED Bulbs', description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.', impact: '15% electricity reduction', co2_saved: 2.3, difficulty: 'Easy', time: '5 min', likes: 234, featured: true },
  { id: 2, category: 'transport', title: 'Walk or Bike Short Distances', description: 'For trips under 3km, walking or cycling can save significant emissions while improving your health.', impact: '3.2kg CO₂ per trip', co2_saved: 3.2, difficulty: 'Easy', time: '0 min', likes: 189, featured: false },
  { id: 3, category: 'food', title: 'Try Meatless Monday', description: 'Reducing meat consumption by one day per week can significantly lower your carbon footprint.', impact: '8kg CO₂ per week', co2_saved: 8.0, difficulty: 'Medium', time: '30 min', likes: 312, featured: true },
  { id: 4, category: 'waste', title: 'Use Reusable Water Bottles', description: 'A single reusable bottle can replace hundreds of plastic bottles per year.', impact: '1.5kg CO₂ per month', co2_saved: 1.5, difficulty: 'Easy', time: '1 min', likes: 156, featured: false },
  { id: 5, category: 'shopping', title: 'Buy Local Products', description: 'Local products require less transportation, reducing their carbon footprint significantly.', impact: '20% emission reduction', co2_saved: 4.1, difficulty: 'Medium', time: '10 min', likes: 98, featured: false },
  { id: 6, category: 'energy', title: 'Unplug Devices When Not in Use', description: 'Electronics consume energy even when turned off. Unplugging can save 5-10% on electricity.', impact: '8% electricity reduction', co2_saved: 1.8, difficulty: 'Easy', time: '2 min', likes: 201, featured: false },
  { id: 7, category: 'transport', title: 'Use Public Transportation', description: 'Public transport can reduce your carbon footprint by up to 85% compared to driving alone.', impact: '85% transport emission cut', co2_saved: 5.5, difficulty: 'Medium', time: '15 min', likes: 287, featured: true },
  { id: 8, category: 'food', title: 'Reduce Food Waste', description: 'Plan meals and store food properly to reduce waste. Food waste contributes to methane emissions.', impact: '3kg CO₂ per week', co2_saved: 3.0, difficulty: 'Medium', time: '20 min', likes: 176, featured: false }
];

const dailyFacts = [
  "Did you know? The average person produces 4.5 tons of CO₂ per year, but sustainable living can cut this by 50%!",
  "A single tree can absorb 22kg of CO₂ per year. Planting trees is one of the most effective climate actions!",
  "Switching to renewable energy can reduce household emissions by up to 70% instantly.",
  "Food transportation accounts for 11% of global emissions. Eating local can make a big difference!",
  "Electric vehicles produce 50% fewer emissions than gas cars, even accounting for electricity generation."
];

export const TipsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedTips, setLikedTips] = useState<number[]>([]);
  const [currentFact, setCurrentFact] = useState<number>(0);

  const getDifficultyColor = (difficulty: Tip['difficulty']) => ({
    Easy: 'text-green-400 bg-green-500/20 border-green-500/30',
    Medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    Hard: 'text-red-400 bg-red-500/20 border-red-500/30'
  })[difficulty] ?? 'text-gray-400 bg-gray-500/20 border-gray-500/30';

  const filteredTips = selectedCategory === 'all'
    ? tips
    : tips.filter((tip) => tip.category === selectedCategory);

  const toggleLike = (tipId: number) => {
    setLikedTips((prev) =>
      prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]
    );
  };

  const nextFact = () => setCurrentFact((prev) => (prev + 1) % dailyFacts.length);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Lightbulb className="w-10 h-10 text-yellow-400 mr-3" />
            Sustainability Tips & Insights
          </h1>
          <p className="text-gray-400 text-lg">Discover practical ways to reduce your environmental impact</p>
        </div>

        {/* Daily Fact */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Did You Know?</h3>
                <p className="text-blue-400">Daily Environmental Fact</p>
              </div>
            </div>
            <button
              onClick={nextFact}
              className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-300 mt-4 text-lg leading-relaxed">{dailyFacts[currentFact]}</p>
        </div>

        {/* Category Filter */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={clsx(
                    'flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200',
                    selectedCategory === category.id
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-gray-800/50 border border-gray-600 text-gray-300 hover:border-green-500/50 hover:text-green-400'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Tips */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
              Featured Tips
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tips.filter((tip) => tip.featured).slice(0, 3).map((tip) => (
                <div
                  key={tip.id}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className={clsx('px-3 py-1 rounded-full text-xs font-medium border', getDifficultyColor(tip.difficulty))}>
                        {tip.difficulty}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">-{tip.co2_saved}kg</div>
                      <div className="text-gray-400 text-xs">CO₂ saved</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{tip.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{tip.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>⏱️ {tip.time}</span>
                      <span>💡 {tip.impact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleLike(tip.id)}
                        className={clsx('p-2 rounded-lg transition-colors', likedTips.includes(tip.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400')}
                      >
                        <Heart className={clsx('w-4 h-4', likedTips.includes(tip.id) && 'fill-current')} />
                      </button>
                      <span className="text-gray-400 text-sm">{tip.likes + (likedTips.includes(tip.id) ? 1 : 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Tips Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-400 mr-2" />
            {selectedCategory === 'all'
              ? 'All Tips'
              : `${categories.find((c) => c.id === selectedCategory)?.name} Tips`}
            <span className="ml-2 text-gray-400 text-lg">({filteredTips.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-500/20 transition-colors">
                      <Leaf className="w-5 h-5 text-green-400" />
                    </div>
                    <span className={clsx('px-3 py-1 rounded-full text-xs font-medium border', getDifficultyColor(tip.difficulty))}>
                      {tip.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">-{tip.co2_saved}kg</div>
                    <div className="text-gray-400 text-xs">CO₂ saved</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{tip.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <span>⏱️</span><span>{tip.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>💡</span><span>{tip.impact}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleLike(tip.id)}
                      className={clsx('flex items-center space-x-1 p-2 rounded-lg transition-colors',
                        likedTips.includes(tip.id) ? 'text-red-400 bg-red-500/10' : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                      )}
                    >
                      <Heart className={clsx('w-4 h-4', likedTips.includes(tip.id) && 'fill-current')} />
                      <span className="text-sm">{tip.likes + (likedTips.includes(tip.id) ? 1 : 0)}</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">This Week's Challenge</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Try implementing 3 tips from the energy category this week and track your electricity usage reduction!
            </p>
            <button
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105"
              key="weekly-challenge" // optional
            >
              Accept Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsSection;