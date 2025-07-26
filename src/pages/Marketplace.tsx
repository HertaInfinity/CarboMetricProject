import { useState } from 'react';
import { ShoppingCart, Star, Leaf, Filter, Search, Heart, Truck, Shield } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  eco_impact: string;
  co2_saved: number;
  certification: string;
  seller: string;
  shipping: string;
  in_stock: boolean;
  discount?: number;
}

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Products', icon: ShoppingCart },
    { id: 'energy', name: 'Energy', icon: '⚡' },
    { id: 'transport', name: 'Transport', icon: '🚲' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'personal', name: 'Personal Care', icon: '🧴' },
    { id: 'food', name: 'Food & Drink', icon: '🌱' }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Solar Power Bank 20,000mAh',
      description: 'Portable solar charger with wireless charging capability',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviews: 342,
      category: 'energy',
      image: 'https://images.pexels.com/photos/4790265/pexels-photo-4790265.jpeg',
      eco_impact: 'Reduces electronic waste',
      co2_saved: 15.2,
      certification: 'Energy Star',
      seller: 'GreenTech Solutions',
      shipping: 'Free shipping',
      in_stock: true,
      discount: 25
    },
    {
      id: '2',
      name: 'Bamboo Fiber Water Bottle',
      description: 'Biodegradable water bottle made from bamboo fiber',
      price: 24.99,
      rating: 4.6,
      reviews: 158,
      category: 'personal',
      image: 'https://images.pexels.com/photos/6995251/pexels-photo-6995251.jpeg',
      eco_impact: 'Replaces 500+ plastic bottles',
      co2_saved: 8.5,
      certification: 'BPA Free',
      seller: 'EcoLife Products',
      shipping: 'Free shipping over $50',
      in_stock: true
    },
    {
      id: '3',
      name: 'Electric Folding Bike',
      description: '350W motor, 50km range, foldable design for urban commuting',
      price: 1299.99,
      originalPrice: 1599.99,
      rating: 4.9,
      reviews: 89,
      category: 'transport',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
      eco_impact: 'Zero emission transport',
      co2_saved: 2500,
      certification: 'CE Certified',
      seller: 'Urban Mobility Co.',
      shipping: 'Free assembly included',
      in_stock: true,
      discount: 19
    },
    {
      id: '4',
      name: 'Organic Cotton T-Shirt',
      description: 'Fair trade organic cotton t-shirt, naturally dyed',
      price: 35.99,
      rating: 4.7,
      reviews: 234,
      category: 'personal',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      eco_impact: 'Sustainable fashion',
      co2_saved: 3.2,
      certification: 'GOTS Certified',
      seller: 'Conscious Clothing',
      shipping: 'Carbon neutral shipping',
      in_stock: false
    },
    {
      id: '5',
      name: 'LED Smart Bulb Set (4-pack)',
      description: 'WiFi enabled, color changing, 90% energy efficient',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviews: 567,
      category: 'energy',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      eco_impact: '25 year lifespan',
      co2_saved: 120,
      certification: 'Energy Star',
      seller: 'Smart Home Tech',
      shipping: 'Next-day delivery',
      in_stock: true,
      discount: 20
    },
    {
      id: '6',
      name: 'Reusable Food Wraps (6-pack)',
      description: 'Beeswax wraps to replace plastic wrap and bags',
      price: 18.99,
      rating: 4.4,
      reviews: 189,
      category: 'food',
      image: 'https://images.pexels.com/photos/6621269/pexels-photo-6621269.jpeg',
      eco_impact: 'Eliminates plastic waste',
      co2_saved: 4.1,
      certification: 'Organic Certified',
      seller: 'Zero Waste Kitchen',
      shipping: 'Free shipping',
      in_stock: true
    },
    {
      id: '7',
      name: 'Compost Bin with Charcoal Filter',
      description: 'Countertop composter for kitchen scraps, odor-free design',
      price: 56.99,
      rating: 4.6,
      reviews: 123,
      category: 'home',
      image: 'https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg',
      eco_impact: 'Reduces food waste by 40%',
      co2_saved: 28.5,
      certification: 'Food Safe',
      seller: 'Garden Solutions',
      shipping: 'Free shipping',
      in_stock: true
    },
    {
      id: '8',
      name: 'Natural Cleaning Kit',
      description: 'Plant-based cleaning products for entire home',
      price: 42.99,
      originalPrice: 54.99,
      rating: 4.8,
      reviews: 298,
      category: 'home',
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
      eco_impact: 'Non-toxic, biodegradable',
      co2_saved: 6.8,
      certification: 'EPA Safer Choice',
      seller: 'CleanGreen',
      shipping: 'Free shipping',
      in_stock: true,
      discount: 22
    }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low': return a.price - b.price;
        case 'price_high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'eco_impact': return b.co2_saved - a.co2_saved;
        default: return 0; // featured
      }
    });

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <ShoppingCart className="w-10 h-10 text-green-400 mr-3" />
            Green Marketplace
          </h1>
          <p className="text-gray-400 text-lg">Discover eco-friendly products for a sustainable lifestyle</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search eco-friendly products..."
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
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            >
              <option value="featured">Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="eco_impact">Most Eco-Friendly</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const renderIcon = () => {
              if (typeof category.icon === 'string') {
                return <span className="text-lg">{category.icon}</span>;
              }
              const IconComponent = category.icon;
              return <IconComponent className="w-5 h-5" />;
            };
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black'
                    : 'bg-gray-800/50 border border-gray-600 text-gray-300 hover:border-green-500/50 hover:text-green-400'
                }`}
              >
                {renderIcon()}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    -{product.discount}%
                  </div>
                )}
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-colors ${
                    likedProducts.includes(product.id)
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-black/20 text-gray-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Title and Rating */}
                <div className="mb-3">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-sm font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                </div>

                {/* Eco Impact */}
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">Eco Impact</span>
                  </div>
                  <p className="text-gray-300 text-xs">{product.eco_impact}</p>
                  <p className="text-green-400 text-xs font-semibold">Saves {product.co2_saved}kg CO₂</p>
                </div>

                {/* Certification */}
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs">{product.certification}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Truck className="w-3 h-3" />
                      <span>{product.shipping}</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.in_stock}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    product.in_stock
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black hover:from-green-400 hover:to-emerald-400'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>

                <div className="mt-2 text-center">
                  <span className="text-gray-400 text-xs">by {product.seller}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No products found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}

        {/* Shopping Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-black p-4 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6" />
              <div>
                <div className="font-bold">{cart.length} items in cart</div>
                <div className="text-sm opacity-80">Click to checkout</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;