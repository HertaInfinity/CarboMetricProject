import { Award, Target, TrendingUp, Calendar, Edit, Settings, Star, Trophy } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user } = useUser();

  const achievements = [
    { id: 1, name: 'Plastic-Free Week', description: 'Completed 7 days without plastic products', icon: '🌿', unlocked: true, date: '2025-01-10' },
    { id: 2, name: 'Low Carbon Commute', description: 'Used public transport for 10 consecutive days', icon: '🚌', unlocked: true, date: '2025-01-08' },
    { id: 3, name: 'Green Warrior', description: 'Reduced emissions by 20% in a month', icon: '⚔️', unlocked: true, date: '2025-01-05' },
    { id: 4, name: 'Recycling Champion', description: 'Properly recycled 50+ items', icon: '♻️', unlocked: false },
    { id: 5, name: 'Carbon Neutral', description: 'Offset 100kg of CO₂ emissions', icon: '🌍', unlocked: false },
    { id: 6, name: 'Eco Influencer', description: 'Inspire 10 friends to join the platform', icon: '📢', unlocked: false }
  ];

  const stats = [
    { label: 'Days Active', value: '42', icon: Calendar, color: 'text-blue-400' },
    { label: 'Emissions Tracked', value: '156', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Goals Completed', value: '8', icon: Target, color: 'text-yellow-400' },
    { label: 'Badges Earned', value: user?.badges.length.toString() || '0', icon: Award, color: 'text-purple-400' }
  ];

  const recentActivity = [
    { action: 'Reduced daily emissions by 15%', date: '2 hours ago', type: 'achievement' },
    { action: 'Completed "Walk Wednesday" challenge', date: '1 day ago', type: 'challenge' },
    { action: 'Added electricity usage data', date: '2 days ago', type: 'data' },
    { action: 'Earned "Green Warrior" badge', date: '3 days ago', type: 'badge' },
    { action: 'Set new monthly goal: -10% emissions', date: '5 days ago', type: 'goal' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🎯';
      case 'challenge': return '🏆';
      case 'data': return '📊';
      case 'badge': return '🏅';
      case 'goal': return '🎖️';
      default: return '📌';
    }
  };

  const levelProgress = ((user?.greenScore || 0) % 100) / 100;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl">
                    {user?.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>
                  <p className="text-gray-400 text-lg mb-2">{user?.email}</p>
                  <div className="flex items-center space-x-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400 font-semibold">
                      {user?.level}
                    </span>
                    <span className="text-gray-300">Level {Math.floor((user?.greenScore || 0) / 100) + 1}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="p-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-300 hover:text-white hover:border-green-500 transition-all duration-200">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-300 hover:text-white hover:border-green-500 transition-all duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Level Progress</h3>
                <span className="text-green-400 font-semibold">{user?.greenScore}/100</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${levelProgress * 100}%` }}
                  ></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {Math.round(levelProgress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
              Achievements ({achievements.filter(a => a.unlocked).length}/{achievements.length})
            </h3>
            <div className="space-y-4">
              {achievements.slice(0, 6).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-green-500/10 border-green-500/30 hover:border-green-400/50'
                      : 'bg-gray-800/30 border-gray-600/30 opacity-60'
                  }`}
                >
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-green-400 text-xs mt-1">Unlocked {achievement.date}</p>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-white">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Impact Summary */}
        <div className="mt-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">{user?.totalSavedEmissions} kg</div>
              <div className="text-gray-300">CO₂ Emissions Saved</div>
              <div className="text-gray-400 text-sm mt-1">Equivalent to planting 6 trees</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{user?.streak}</div>
              <div className="text-gray-300">Day Streak</div>
              <div className="text-gray-400 text-sm mt-1">Keep it up!</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">Top 15%</div>
              <div className="text-gray-300">Global Ranking</div>
              <div className="text-gray-400 text-sm mt-1">Among all users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;