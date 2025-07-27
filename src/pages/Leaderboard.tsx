import { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Calendar, Filter } from 'lucide-react';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [categoryFilter, setCategoryFilter] = useState('overall');

  const leaderboardData = [
    { id: 1, name: 'Emma Watson', avatar: '🌱', greenScore: 98, rank: 1, country: '🇬🇧', streak: 45, reduction: '22%' },
    { id: 2, name: 'Alex Chen', avatar: '♻️', greenScore: 95, rank: 2, country: '🇨🇦', streak: 38, reduction: '19%' },
    { id: 3, name: 'Maya Patel', avatar: '🌿', greenScore: 92, rank: 3, country: '🇮🇳', streak: 42, reduction: '18%' },
    { id: 4, name: 'David Kim', avatar: '🌍', greenScore: 89, rank: 4, country: '🇰🇷', streak: 28, reduction: '16%' },
    { id: 5, name: 'Sofia Rodriguez', avatar: '🌳', greenScore: 87, rank: 5, country: '🇪🇸', streak: 35, reduction: '15%' },
    { id: 6, name: 'James Wilson', avatar: '🍃', greenScore: 85, rank: 6, country: '🇺🇸', streak: 31, reduction: '14%' },
    { id: 7, name: 'Lisa Zhang', avatar: '🌿', greenScore: 83, rank: 7, country: '🇨🇳', streak: 29, reduction: '13%' },
    { id: 8, name: 'Tom Anderson', avatar: '🌱', greenScore: 81, rank: 8, country: '🇸🇪', streak: 26, reduction: '12%' },
    { id: 9, name: 'Priya Sharma', avatar: '♻️', greenScore: 79, rank: 9, country: '🇮🇳', streak: 33, reduction: '11%' },
    { id: 10, name: 'Marco Silva', avatar: '🌍', greenScore: 77, rank: 10, country: '🇧🇷', streak: 24, reduction: '10%' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Medal className="w-6 h-6 text-yellow-600" />;
      default: return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
      case 3: return 'from-yellow-600/20 to-yellow-700/20 border-yellow-600/30';
      default: return 'from-gray-800/50 to-gray-900/50 border-gray-700';
    }
  };

  const categories = [
    { value: 'overall', label: 'Overall Score' },
    { value: 'reduction', label: 'Emission Reduction' },
    { value: 'streak', label: 'Longest Streak' },
    { value: 'consistency', label: 'Consistency' }
  ];

  const timeFilters = [
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' },
    { value: 'alltime', label: 'All Time' }
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Global Leaderboard</h1>
          <p className="text-gray-400 text-lg">See how you rank against eco-warriors worldwide</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                {timeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboardData.slice(0, 3).map((_, index) => {
              const positions = [1, 0, 2]; // Second place, First place, Third place
              const actualUser = leaderboardData[positions[index]];
              const heights = ['h-48', 'h-64', 'h-40'];
              
              return (
                <div key={actualUser.id} className={`relative ${heights[index]} flex items-end`}>
                  <div className={`w-full bg-gradient-to-br ${getRankColor(actualUser.rank)} rounded-2xl p-6 border backdrop-blur-sm transform transition-all duration-300 hover:scale-105`}>
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {getRankIcon(actualUser.rank)}
                      </div>
                      <div className="text-3xl mb-2">{actualUser.avatar}</div>
                      <h3 className="text-white font-bold text-lg mb-2">{actualUser.name}</h3>
                      <div className="text-2xl font-bold text-green-400 mb-2">{actualUser.greenScore}</div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                        <span>{actualUser.country}</span>
                        <span>•</span>
                        <span>{actualUser.streak} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
              Complete Rankings
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Green Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Streak</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Reduction</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Country</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {leaderboardData.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-800/30 transition-all duration-200 ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-green-500/5 to-transparent' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">Eco {user.rank <= 10 ? 'Master' : 'Warrior'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{user.greenScore}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-semibold">{user.streak}</span>
                        <span className="text-gray-400 text-sm">days</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                        -{user.reduction}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-2xl">{user.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Position */}
        <div className="mt-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                🌱
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Your Position</h3>
                <p className="text-gray-400">Shaambhavi Singh • Eco Warrior</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400 mb-1">#247</div>
              <div className="text-gray-400">out of 15,432 users</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-800/30 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">85</div>
                <div className="text-gray-400 text-sm">Green Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">7</div>
                <div className="text-gray-400 text-sm">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">12%</div>
                <div className="text-gray-400 text-sm">Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;