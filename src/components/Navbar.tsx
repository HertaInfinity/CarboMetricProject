import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Plus, History, PieChart, User, Trophy, 
  MessageCircle, Calendar, Lightbulb, Target,
  Leaf, Users, ShoppingCart, Bell, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Group navigation items by category
  const navItems = {
    main: [
      { path: '/dashboard', icon: Home, label: 'Dashboard' },
      { path: '/add-data', icon: Plus, label: 'Add Data' },
      { path: '/history', icon: History, label: 'History' },
      { path: '/breakdown', icon: PieChart, label: 'Breakdown' }
    ],
    planning: [
      { path: '/calendar', icon: Calendar, label: 'Calendar' },
      { path: '/goals', icon: Target, label: 'Goals' }
    ],
    community: [
      { path: '/social', icon: Users, label: 'Social' },
      { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
      { path: '/chatbot', icon: MessageCircle, label: 'Chat' }
    ],
    resources: [
      { path: '/tips', icon: Lightbulb, label: 'Tips' },
      { path: '/marketplace', icon: ShoppingCart, label: 'Store' },
      { path: '/offset', icon: Leaf, label: 'Offset' }
    ],
    user: [
      { path: '/profile', icon: User, label: 'Profile' },
      { path: '/notifications', icon: Bell, label: 'Notifications', badge: 3 }
    ]
  };

  return (
    <nav className="bg-gray-900 border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto pl-0 pr-4">
        <div className="flex items-center justify-between h-16 gap-8">
          <Link to="/dashboard" className="flex items-center space-x-2 flex-shrink-0 -ml-20">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              EcoTracker
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-3">
            {Object.entries(navItems).map(([group, items]) => (
              <div key={group} className="flex items-center space-x-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <div className="relative group" key={item.path}>
                      <Link
                        to={item.path}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 group ${
                          isActive
                            ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
                            : 'text-gray-300 hover:text-green-400 hover:bg-green-500/10'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-green-400' : 'group-hover:text-green-400'}`} />
                        <span>{item.label}</span>
                        {'badge' in item && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 py-1 px-2 bg-gray-800 text-xs text-gray-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-green-500/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-green-400" />
              ) : (
                <Menu className="w-6 h-6 text-green-400" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
              <div className="h-full w-full max-w-sm mx-auto px-4 py-6 overflow-y-auto">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-green-500/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-green-400" />
                  </button>
                </div>
                {Object.entries(navItems).map(([group, items]) => (
                  <div key={group} className="mb-6">
                    <h3 className="text-xs uppercase text-gray-500 mb-2">{group}</h3>
                    <div className="space-y-1">
                      {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                              isActive
                                ? 'bg-green-500/20 text-green-400'
                                : 'text-gray-300 hover:text-green-400 hover:bg-green-500/10'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-green-400' : ''}`} />
                            <span>{item.label}</span>
                            {'badge' in item && (
                              <span className="bg-red-500 text-white text-xs px-1.5 rounded-full ml-auto">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;