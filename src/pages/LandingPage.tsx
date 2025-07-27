import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, TrendingDown, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const handleGetStarted = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    // Since this is a landing page, we can track analytics before navigation
    // You would replace this with your actual analytics implementation
    console.log('User clicked Get Started');
    
    // Navigate to the dashboard
    window.location.href = '/AuthPage';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                EcoTracker
              </span>
            </div>
            <Link
              to="/auth"
              className="px-6 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200"
            >
              Sign In
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Track Your
              </span>
              <br />
              <span className="text-white">Carbon Footprint👣</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join millions of eco-warriors in the fight against climate change. Track, reduce, and offset your carbon emissions with our AI-powered platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-12 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose EcoTracker?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Advanced features designed to make sustainability simple, engaging, and rewarding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: TrendingDown,
                  title: 'Smart Tracking',
                  description: 'AI-powered emission calculation with OCR bill scanning and auto-categorization.',
                  color: 'from-green-400 to-emerald-500'
                },
                {
                  icon: Users,
                  title: 'Social Impact',
                  description: 'Connect with friends, join challenges, and compete on global leaderboards.',
                  color: 'from-blue-400 to-cyan-500'
                },
                {
                  icon: Award,
                  title: 'Gamification',
                  description: 'Earn badges, unlock achievements, and level up your eco-warrior status.',
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: Leaf,
                  title: 'Carbon Offset',
                  description: 'Offset your emissions through verified tree planting and renewable energy projects.',
                  color: 'from-green-400 to-teal-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl hover:border-green-500/50 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { number: '2.5M+', label: 'CO₂ Tons Saved', color: 'text-green-400' },
                { number: '150K+', label: 'Active Users', color: 'text-blue-400' },
                { number: '50K+', label: 'Trees Planted', color: 'text-yellow-400' }
              ].map((stat, index) => (
                <div key={index} className="p-6">
                  <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start your carbon-neutral journey today and join the global movement for a sustainable future.
            </p>
            <Link
              to="/dashboard"
              onClick={handleGetStarted}
              className="inline-flex items-center px-12 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Tracking Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;