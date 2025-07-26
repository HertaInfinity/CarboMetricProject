import React, { useState } from 'react';
import { Leaf, TreePine, Sun, Wind, ShoppingCart, CreditCard, Heart, Star } from 'lucide-react';

const CarbonOffset = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [offsetAmount, setOffsetAmount] = useState(10);

  const offsetProjects = [
    {
      id: 'trees',
      name: 'Rainforest Restoration',
      icon: TreePine,
      description: 'Plant native trees in deforested areas of the Amazon rainforest',
      pricePerTon: 15,
      impact: 'Each tree absorbs ~22kg CO₂ annually',
      certification: 'Gold Standard Verified',
      location: 'Brazil, Colombia',
      rating: 4.9,
      totalFunded: 156789,
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'solar',
      name: 'Solar Farm Development',
      icon: Sun,
      description: 'Support construction of solar panels in rural communities',
      pricePerTon: 12,
      impact: 'Provides clean energy to 500+ homes',
      certification: 'VCS Verified',
      location: 'India, Kenya',
      rating: 4.8,
      totalFunded: 89456,
      image: 'https://images.pexels.com/photos/9875402/pexels-photo-9875402.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'wind',
      name: 'Wind Energy Projects',
      icon: Wind,
      description: 'Fund wind turbines in coastal and mountainous regions',
      pricePerTon: 18,
      impact: 'Generates renewable energy for 1200+ homes',
      certification: 'CDM Verified',
      location: 'Denmark, Scotland',
      rating: 4.7,
      totalFunded: 234567,
      image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ocean',
      name: 'Ocean Conservation',
      icon: '🌊',
      description: 'Protect marine ecosystems and coral reefs',
      pricePerTon: 20,
      impact: 'Restores 50 hectares of marine habitat',
      certification: 'Blue Carbon Verified',
      location: 'Maldives, Philippines',
      rating: 4.9,
      totalFunded: 67890,
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const myEmissions = {
    daily: 12.5,
    weekly: 87.5,
    monthly: 375,
    yearly: 4500
  };

  const offsetHistory = [
    { date: '2025-01-10', project: 'Rainforest Restoration', amount: 25, cost: 375, status: 'Completed' },
    { date: '2025-01-05', project: 'Solar Farm Development', amount: 15, cost: 180, status: 'Processing' },
    { date: '2024-12-28', project: 'Wind Energy Projects', amount: 30, cost: 540, status: 'Completed' }
  ];

  const calculateCost = (amount: number, project: any) => {
    return project ? amount * project.pricePerTon : 0;
  };

  const selectedProjectData = offsetProjects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Leaf className="w-10 h-10 text-green-400 mr-3" />
            Carbon Offset Marketplace
          </h1>
          <p className="text-gray-400 text-lg">Offset your carbon footprint through verified environmental projects</p>
        </div>

        {/* Your Carbon Footprint */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Carbon Footprint</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { period: 'Daily', amount: myEmissions.daily, color: 'text-red-400' },
              { period: 'Weekly', amount: myEmissions.weekly, color: 'text-orange-400' },
              { period: 'Monthly', amount: myEmissions.monthly, color: 'text-yellow-400' },
              { period: 'Yearly', amount: myEmissions.yearly, color: 'text-red-500' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${item.color} mb-2`}>
                  {item.amount} <span className="text-lg text-gray-400">kg</span>
                </div>
                <div className="text-gray-300">{item.period} CO₂</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-300 mb-4">
              Offset your entire yearly footprint for just <span className="text-green-400 font-bold">${(myEmissions.yearly * 15 / 1000).toFixed(0)}</span>
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300">
              Offset Full Year
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Offset Projects */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Verified Offset Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offsetProjects.map((project) => {
                const IconComponent = typeof project.icon === 'string' ? 
                  () => <span className="text-2xl">{project.icon}</span> : 
                  project.icon;

                return (
                  <div
                    key={project.id}
                    className={`bg-gray-900/50 border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-green-500/50 ${
                      selectedProject === project.id ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 rounded-lg px-2 py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-semibold">{project.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <IconComponent className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Price per ton:</span>
                        <span className="text-green-400 font-semibold">${project.pricePerTon}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Location:</span>
                        <span className="text-white text-sm">{project.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Certification:</span>
                        <span className="text-blue-400 text-sm">{project.certification}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800/30 rounded-lg mb-4">
                      <p className="text-green-400 text-sm font-semibold">{project.impact}</p>
                    </div>

                    <div className="text-center">
                      <span className="text-gray-400 text-xs">
                        ${project.totalFunded.toLocaleString()} funded to date
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Offset Calculator & Purchase */}
          <div className="space-y-6">
            {/* Calculator */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <ShoppingCart className="w-5 h-5 text-green-400 mr-2" />
                Offset Calculator
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">CO₂ to Offset (tons)</label>
                  <input
                    type="number"
                    value={offsetAmount}
                    onChange={(e) => setOffsetAmount(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    min="0.1"
                    step="0.1"
                  />
                </div>

                {selectedProjectData && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <selectedProjectData.icon className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-white font-semibold">{selectedProjectData.name}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white">{offsetAmount} tons CO₂</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-white">${selectedProjectData.pricePerTon}/ton</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-300">Total:</span>
                        <span className="text-green-400">${calculateCost(offsetAmount, selectedProjectData).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  disabled={!selectedProject || offsetAmount <= 0}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Purchase Offset</span>
                </button>
              </div>
            </div>

            {/* Quick Offset Options */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Offset</h3>
              <div className="space-y-3">
                {[
                  { label: 'Daily Footprint', amount: myEmissions.daily / 1000, period: 'day' },
                  { label: 'Weekly Footprint', amount: myEmissions.weekly / 1000, period: 'week' },
                  { label: 'Monthly Footprint', amount: myEmissions.monthly / 1000, period: 'month' }
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setOffsetAmount(option.amount)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-left hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{option.label}</span>
                      <span className="text-green-400">{option.amount.toFixed(1)}t</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Offsets */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 text-red-400 mr-2" />
                Recent Offsets
              </h3>
              <div className="space-y-3">
                {offsetHistory.map((offset, index) => (
                  <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white text-sm font-medium">{offset.project}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        offset.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {offset.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{offset.amount}t CO₂</span>
                      <span className="text-green-400">${offset.cost}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{offset.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonOffset;