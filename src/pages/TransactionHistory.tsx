import { useState } from 'react';
import { Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';
import { useData } from '../context/DataContext';

const TransactionHistory = () => {
  const { emissions } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = ['all', 'Travel', 'Electricity', 'Food', 'Shopping'];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Travel': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Electricity': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Food': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Shopping': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredAndSortedEmissions = emissions
    .filter(emission => {
      const matchesSearch = emission.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emission.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || emission.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'emission':
          aValue = a.emission;
          bValue = b.emission;
          break;
        case 'cost':
          aValue = a.cost || 0;
          bValue = b.cost || 0;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalEmissions = filteredAndSortedEmissions.reduce((sum, emission) => sum + emission.emission, 0);
  const totalCost = filteredAndSortedEmissions.reduce((sum, emission) => sum + (emission.cost || 0), 0);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-400 text-lg">Track and analyze your emission patterns</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-green-400 font-semibold mb-2">Total Emissions</h3>
            <div className="text-3xl font-bold text-white">
              {totalEmissions.toFixed(1)} <span className="text-lg text-gray-400">kg CO₂</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
            <h3 className="text-blue-400 font-semibold mb-2">Total Transactions</h3>
            <div className="text-3xl font-bold text-white">{filteredAndSortedEmissions.length}</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
            <h3 className="text-yellow-400 font-semibold mb-2">Total Cost</h3>
            <div className="text-3xl font-bold text-white">
              ${totalCost.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="date">Sort by Date</option>
                <option value="emission">Sort by Emission</option>
                <option value="cost">Sort by Cost</option>
                <option value="category">Sort by Category</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white hover:border-green-500 transition-colors"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Item</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Emission (kg CO₂)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredAndSortedEmissions.map((emission) => (
                  <tr
                    key={emission.id}
                    className="hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(emission.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(emission.category)}`}>
                        {emission.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-medium">
                      {emission.item}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-semibold text-red-400">
                        {emission.emission.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-300">
                      {emission.cost ? `$${emission.cost.toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAndSortedEmissions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No transactions found</div>
                <div className="text-gray-500">Try adjusting your search or filter criteria</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;