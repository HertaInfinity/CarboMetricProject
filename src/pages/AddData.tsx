import React, { useState } from 'react';
import { Upload, Zap, Car, Utensils, ShoppingCart, Camera, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const AddData = () => {
  const { addEmission } = useData();
  const [activeTab, setActiveTab] = useState('electricity');
  const [formData, setFormData] = useState({
    electricity: { usage: '', cost: '' },
    travel: { type: 'car', distance: '', cost: '' },
    food: { item: '', quantity: '', cost: '' },
    shopping: { item: '', price: '', category: 'electronics' }
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const tabs = [
    { id: 'electricity', label: 'Electricity', icon: Zap, color: 'text-yellow-400' },
    { id: 'travel', label: 'Travel', icon: Car, color: 'text-blue-400' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'text-red-400' },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart, color: 'text-green-400' }
  ];

  const handleInputChange = (category: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const calculateEmission = (category: string, data: any) => {
    const factors = {
      electricity: 0.45, // kg CO2 per kWh
      car: 0.21, // kg CO2 per km
      bus: 0.089,
      train: 0.041,
      beef: 27, // kg CO2 per kg
      chicken: 6.9,
      vegetables: 2,
      electronics: 0.5, // kg CO2 per $
      clothing: 0.3,
      books: 0.1
    };

    switch (category) {
      case 'electricity':
        return parseFloat(data.usage) * factors.electricity;
      case 'travel':
        return parseFloat(data.distance) * factors[data.type as keyof typeof factors];
      case 'food':
        return parseFloat(data.quantity) * factors[data.item as keyof typeof factors];
      case 'shopping':
        return parseFloat(data.price) * factors[data.category as keyof typeof factors];
      default:
        return 0;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentData = formData[activeTab as keyof typeof formData];
    const emission = calculateEmission(activeTab, currentData);
    
    let itemDescription = '';
    switch (activeTab) {
      case 'electricity':
        itemDescription = `Home Usage - ${currentData.usage}kWh`;
        break;
      case 'travel':
        itemDescription = `${currentData.type} Journey - ${currentData.distance}km`;
        break;
      case 'food':
        itemDescription = `${currentData.item} - ${currentData.quantity}kg`;
        break;
      case 'shopping':
        itemDescription = `${currentData.category} - $${currentData.price}`;
        break;
    }

    addEmission({
      date: new Date().toISOString().split('T')[0],
      category: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
      item: itemDescription,
      emission,
      cost: parseFloat(currentData.cost || '0')
    });

    toast.success('Emission data added successfully!');
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      [activeTab]: Object.keys(prev[activeTab as keyof typeof prev]).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as any)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsScanning(true);
      
      // Simulate OCR processing
      setTimeout(() => {
        setIsScanning(false);
        // Mock extracted data
        const mockData = {
          electricity: { usage: '15.2', cost: '42.50' },
          travel: { distance: '25.8', cost: '12.00' },
          food: { item: 'chicken', quantity: '1.5', cost: '18.99' },
          shopping: { item: 'Electronics', price: '89.99', category: 'electronics' }
        };
        
        setFormData(prev => ({
          ...prev,
          [activeTab]: mockData[activeTab as keyof typeof mockData]
        }));
        
        toast.success('Bill scanned successfully! Data auto-filled.');
      }, 2000);
    }
  };

  const renderForm = () => {
    const currentData = formData[activeTab as keyof typeof formData];
    
    switch (activeTab) {
      case 'electricity':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Usage (kWh)</label>
              <input
                type="number"
                value={currentData.usage}
                onChange={(e) => handleInputChange('electricity', 'usage', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                placeholder="Enter electricity usage"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Cost ($)</label>
              <input
                type="number"
                value={currentData.cost}
                onChange={(e) => handleInputChange('electricity', 'cost', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                placeholder="Bill amount"
              />
            </div>
          </div>
        );
      
      case 'travel':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Transport Type</label>
              <select
                value={currentData.type}
                onChange={(e) => handleInputChange('travel', 'type', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              >
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Distance (km)</label>
              <input
                type="number"
                value={currentData.distance}
                onChange={(e) => handleInputChange('travel', 'distance', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                placeholder="Distance traveled"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Cost ($)</label>
              <input
                type="number"
                value={currentData.cost}
                onChange={(e) => handleInputChange('travel', 'cost', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                placeholder="Travel cost"
              />
            </div>
          </div>
        );
      
      case 'food':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Food Item</label>
              <select
                value={currentData.item}
                onChange={(e) => handleInputChange('food', 'item', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
              >
                <option value="">Select food type</option>
                <option value="beef">Beef</option>
                <option value="chicken">Chicken</option>
                <option value="vegetables">Vegetables</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Quantity (kg)</label>
              <input
                type="number"
                value={currentData.quantity}
                onChange={(e) => handleInputChange('food', 'quantity', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                placeholder="Weight in kg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Cost ($)</label>
              <input
                type="number"
                value={currentData.cost}
                onChange={(e) => handleInputChange('food', 'cost', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                placeholder="Food cost"
              />
            </div>
          </div>
        );
      
      case 'shopping':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Item</label>
              <input
                type="text"
                value={currentData.item}
                onChange={(e) => handleInputChange('shopping', 'item', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                placeholder="Product name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <select
                value={currentData.category}
                onChange={(e) => handleInputChange('shopping', 'category', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                value={currentData.price}
                onChange={(e) => handleInputChange('shopping', 'price', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                placeholder="Item price"
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Add Emission Data</h1>
          <p className="text-gray-400 text-lg">Track your carbon footprint across different categories</p>
        </div>

        {/* Smart Receipt Scanner */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Camera className="w-5 h-5 text-green-400 mr-2" />
            Smart Receipt Scanner
          </h3>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-400 transition-colors duration-300">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {isScanning ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
                  <span className="text-green-400">Scanning and extracting data...</span>
                </div>
              ) : uploadedFile ? (
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span>File uploaded: {uploadedFile.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Upload your bill or receipt</p>
                  <p className="text-gray-500 text-sm">Supports JPG, PNG, PDF • AI will extract data automatically</p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white border border-gray-600'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {renderForm()}
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-green-500/25"
              >
                Add Emission Data
              </button>
            </div>
          </form>

          {/* Smart Suggestions */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">💡 Smart Suggestion</h4>
            <p className="text-gray-300 text-sm">
              Based on your history, you usually consume 12kWh of electricity daily. Would you like to use this as default?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddData;