import React, { useState } from 'react';
import { Target, Plus, CheckCircle, TrendingUp, Calendar, Award, Edit3, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Reduce Monthly Emissions',
      description: 'Cut down carbon footprint by 20% this month',
      target: 100,
      current: 73,
      unit: 'kg CO₂',
      deadline: '2025-01-31',
      category: 'emissions',
      status: 'active',
      progress: 73
    },
    {
      id: '2',
      title: 'Green Commute Challenge',
      description: 'Use public transport or walk for 15 days',
      target: 15,
      current: 8,
      unit: 'days',
      deadline: '2025-01-25',
      category: 'transport',
      status: 'active',
      progress: 53
    },
    {
      id: '3',
      title: 'Zero Waste Week',
      description: 'Achieve zero single-use plastic for 7 days',
      target: 7,
      current: 7,
      unit: 'days',
      deadline: '2025-01-14',
      category: 'waste',
      status: 'completed',
      progress: 100
    },
    {
      id: '4',
      title: 'Energy Efficiency',
      description: 'Reduce electricity consumption by 25%',
      target: 25,
      current: 12,
      unit: '% reduction',
      deadline: '2025-02-15',
      category: 'energy',
      status: 'active',
      progress: 48
    }
  ]);

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Goals', color: 'text-white' },
    { id: 'emissions', name: 'Emissions', color: 'text-red-400' },
    { id: 'transport', name: 'Transport', color: 'text-blue-400' },
    { id: 'energy', name: 'Energy', color: 'text-yellow-400' },
    { id: 'waste', name: 'Waste', color: 'text-green-400' }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      emissions: 'from-red-500/20 to-pink-500/20 border-red-500/30',
      transport: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      energy: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
      waste: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredGoals = selectedCategory === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const activeGoals = goals.filter(goal => goal.status === 'active').length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Target className="w-10 h-10 text-green-400 mr-3" />
            Sustainability Goals
          </h1>
          <p className="text-gray-400 text-lg">Set, track, and achieve your environmental targets</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-semibold">ACTIVE</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{activeGoals}</div>
            <div className="text-green-400 text-sm">Goals in progress</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">COMPLETED</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{completedGoals}</div>
            <div className="text-blue-400 text-sm">Goals achieved</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-semibold">PROGRESS</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{totalProgress.toFixed(0)}%</div>
            <div className="text-yellow-400 text-sm">Average completion</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-semibold">STREAK</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">12</div>
            <div className="text-purple-400 text-sm">Days consistent</div>
          </div>
        </div>

        {/* Category Filter & Add Button */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-gray-800/50 border border-gray-600 text-gray-300 hover:border-green-500/50 hover:text-green-400'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowNewGoalForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>New Goal</span>
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className={`bg-gradient-to-br ${getCategoryColor(goal.category)} rounded-2xl p-6 border backdrop-blur-sm hover:border-green-400/50 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800/50 rounded-lg">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                    {goal.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{goal.title}</h3>
              <p className="text-gray-300 mb-4">{goal.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white font-semibold">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
                {goal.status === 'completed' && (
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">Completed!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Goals */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
            Suggested Goals for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Meatless Meals',
                description: 'Try 10 plant-based meals this month',
                impact: 'Save ~15kg CO₂',
                difficulty: 'Easy'
              },
              {
                title: 'Car-Free Week',
                description: 'Use alternatives to driving for 7 days',
                impact: 'Save ~25kg CO₂',
                difficulty: 'Medium'
              },
              {
                title: 'Energy Audit',
                description: 'Reduce home energy usage by 30%',
                impact: 'Save ~40kg CO₂',
                difficulty: 'Hard'
              }
            ].map((suggestion, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-600 hover:border-green-500/50 transition-all duration-300 cursor-pointer group">
                <h4 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">
                  {suggestion.title}
                </h4>
                <p className="text-gray-400 text-sm mb-3">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm font-semibold">{suggestion.impact}</span>
                  <span className="text-gray-500 text-xs">{suggestion.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;