import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, Tag, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';

const EmissionBreakdown = () => {
  const { emissions, getEmissionsByCategory } = useData();
  const [timeFilter, setTimeFilter] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryData = Object.entries(getEmissionsByCategory()).map(([category, value]) => ({
    name: category,
    value: parseFloat(value.toFixed(1)),
    percentage: ((value / Object.values(getEmissionsByCategory()).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
  }));

  const COLORS = {
    'Travel': '#3B82F6',
    'Electricity': '#F59E0B',
    'Food': '#EF4444',
    'Shopping': '#10B981'
  };

  // Sample trend data for different time periods
  const getTrendData = () => {
    const data = {
      week: [
        { period: 'Mon', Travel: 3.2, Electricity: 5.4, Food: 8.1, Shopping: 2.3 },
        { period: 'Tue', Travel: 2.8, Electricity: 4.9, Food: 6.2, Shopping: 1.8 },
        { period: 'Wed', Travel: 4.1, Electricity: 6.2, Food: 7.5, Shopping: 3.1 },
        { period: 'Thu', Travel: 2.5, Electricity: 5.8, Food: 5.9, Shopping: 2.7 },
        { period: 'Fri', Travel: 3.7, Electricity: 5.1, Food: 9.2, Shopping: 4.2 },
        { period: 'Sat', Travel: 1.9, Electricity: 4.3, Food: 7.8, Shopping: 2.1 },
        { period: 'Sun', Travel: 2.2, Electricity: 3.9, Food: 6.5, Shopping: 1.5 }
      ],
      month: [
        { period: 'Week 1', Travel: 22.1, Electricity: 37.2, Food: 48.4, Shopping: 18.7 },
        { period: 'Week 2', Travel: 18.9, Electricity: 34.8, Food: 42.1, Shopping: 16.2 },
        { period: 'Week 3', Travel: 25.3, Electricity: 39.1, Food: 51.2, Shopping: 21.8 },
        { period: 'Week 4', Travel: 20.7, Electricity: 36.5, Food: 45.9, Shopping: 19.4 }
      ],
      year: [
        { period: 'Jan', Travel: 89.2, Electricity: 142.1, Food: 187.3, Shopping: 72.4 },
        { period: 'Feb', Travel: 76.8, Electricity: 134.9, Food: 169.2, Shopping: 68.1 },
        { period: 'Mar', Travel: 92.5, Electricity: 138.7, Food: 195.8, Shopping: 78.3 },
        { period: 'Apr', Travel: 85.1, Electricity: 129.4, Food: 182.4, Shopping: 71.9 },
        { period: 'May', Travel: 78.9, Electricity: 125.8, Food: 175.6, Shopping: 69.2 },
        { period: 'Jun', Travel: 82.3, Electricity: 131.2, Food: 189.7, Shopping: 73.8 }
      ]
    };
    return data[timeFilter as keyof typeof data];
  };

  const trendData = getTrendData();

  const filteredEmissions = selectedCategory === 'all' 
    ? emissions 
    : emissions.filter(e => e.category === selectedCategory);

  const avgEmissionPerDay = filteredEmissions.reduce((sum, e) => sum + e.emission, 0) / 7; // Assuming week view

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Emission Breakdown</h1>
          <p className="text-gray-400 text-lg">Detailed analysis of your carbon footprint patterns</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {categoryData.map((category, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{category.name}</h3>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[category.name as keyof typeof COLORS] }}
                ></div>
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {category.value} <span className="text-sm text-gray-400">kg CO₂</span>
              </div>
              <div className="text-sm text-gray-400">{category.percentage}% of total</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="all">All Categories</option>
                <option value="Travel">Travel</option>
                <option value="Electricity">Electricity</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown Pie Chart */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mr-2"></div>
              Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
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
                  formatter={(value: any) => [`${value} kg CO₂`, 'Emissions']}
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
                  <span className="text-gray-300 text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emissions Trend */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
              Emissions Trend
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="period" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Line type="monotone" dataKey="Travel" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="Electricity" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="Food" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="Shopping" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Breakdown Bar Chart */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mr-2"></div>
            Detailed Breakdown by {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="period" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #10B981',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Bar dataKey="Travel" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Electricity" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Food" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Shopping" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-green-400 font-semibold">Daily Average</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {avgEmissionPerDay.toFixed(1)} <span className="text-sm text-gray-400">kg CO₂/day</span>
            </div>
            <p className="text-gray-300 text-sm">Based on current period</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="w-6 h-6 text-blue-400" />
              <h3 className="text-blue-400 font-semibold">Top Category</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {categoryData.sort((a, b) => b.value - a.value)[0]?.name || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm">
              {categoryData.sort((a, b) => b.value - a.value)[0]?.percentage || '0'}% of total emissions
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-6 h-6 text-purple-400" />
              <h3 className="text-purple-400 font-semibold">Improvement</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-2">-8.5%</div>
            <p className="text-gray-300 text-sm">Compared to last {timeFilter}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionBreakdown;