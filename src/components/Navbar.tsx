import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Plus, History, PieChart, User, Trophy, 
  MessageCircle, Calendar, Lightbulb, Target,
  Leaf, Users, ShoppingCart
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/add-data', icon: Plus, label: 'Add Data' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/breakdown', icon: PieChart, label: 'Breakdown' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/tips', icon: Lightbulb, label: 'Tips' },
    { path: '/social', icon: Users, label: 'Social' },
    { path: '/marketplace', icon: ShoppingCart, label: 'Store' },
    { path: '/offset', icon: Leaf, label: 'Offset' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/chatbot', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="bg-gray-900 border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              EcoTracker
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 group ${
                    isActive
                      ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
                      : 'text-gray-300 hover:text-green-400 hover:bg-green-500/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-green-400' : 'group-hover:text-green-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <select 
              className="bg-gray-800 text-green-400 border border-green-500/30 rounded-lg px-3 py-1"
              onChange={(e) => window.location.href = e.target.value}
              value={location.pathname}
            >
              {navItems.map((item) => (
                <option key={item.path} value={item.path}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;