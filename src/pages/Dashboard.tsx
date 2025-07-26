import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, Zap, Car, ShoppingCart, Utensils, Target, Award, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { user } = useUser();
  const { getTotalEmissions, getEmissionsByCategory } = useData();

  // Sample data for charts
  const dailyData = [
    { date: 'Mon', emissions: 12.5 },
    { date: 'Tue', emissions: 8.3 },
    { date: 'Wed', emissions: 15.2 },
    { date: 'Thu', emissions: 6.8 },
    { date: 'Fri', emissions: 11.4 },
    { date: 'Sat', emissions: 9.2 },
    { date: 'Sun', emissions: 7.6 }
  ];

  const hourlyData = [
    { hour: '6AM', emissions: 2.1 },
    { hour: '9AM', emissions: 4.5 },
    { hour: '12PM', emissions: 3.2 },
    { hour: '3PM', emissions: 2.8 },
    { hour: '6PM', emissions: 5.1 },
    { hour: '9PM', emissions: 1.8 }
  ];

  const categoryData = Object.entries(getEmissionsByCategory()).map(([category, value]) => ({
    name: category,
    value: parseFloat(value.toFixed(1))
  }));

  const COLORS = {
    'Travel': '#10B981',
    'Electricity': '#F59E0B',
    'Food': '#EF4444',
    'Shopping': '#3B82F6'
  };

  const totalEmissions = getTotalEmissions();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 🌱
          </h1>
          <p className="text-gray-400 text-lg">
            Let's track your environmental impact today
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-semibold">TODAY</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {totalEmissions.toFixed(1)} <span className="text-lg text-gray-400">kg CO₂</span>
            </div>
            <div className="text-green-400 text-sm">-12% from yesterday</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">SCORE</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{user?.greenScore}</div>
            <div className="text-blue-400 text-sm">Eco Warrior Level</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-semibold">STREAK</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{user?.streak}</div>
            <div className="text-yellow-400 text-sm">Days in a row</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-semibold">SAVED</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {user?.totalSavedEmissions} <span className="text-lg text-gray-400">kg</span>
            </div>
            <div className="text-purple-400 text-sm">Total CO₂ saved</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Emissions Line Chart */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingDown className="w-5 h-5 text-green-400 mr-2" />
              Weekly Emissions Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown Pie Chart */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mr-2"></div>
              Emissions by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
                  ></div>
                  <span className="text-gray-300 text-sm">{entry.name}: {entry.value}kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly Emissions Bar Chart */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mr-2"></div>
            Today's Hourly Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #F59E0B',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Bar 
                dataKey="emissions" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Zap, label: 'Log Electricity', color: 'from-yellow-400 to-orange-500' },
            { icon: Car, label: 'Add Travel', color: 'from-blue-400 to-cyan-500' },
            { icon: Utensils, label: 'Food Entry', color: 'from-red-400 to-pink-500' },
            { icon: ShoppingCart, label: 'Shopping', color: 'from-green-400 to-emerald-500' }
          ].map((action, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-white font-semibold">{action.label}</h4>
              <p className="text-gray-400 text-sm mt-1">Quick add entry</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;