import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Some background animation like before */}
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/80 backdrop-blur border border-green-500/30 rounded-2xl p-8 shadow-2xl"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              EcoTracker
            </h1>
            <p className="text-gray-400 mt-2">
              {isAuthenticated ? `Welcome, ${user?.name}` : 'Join the green revolution!'}
            </p>
          </div>

          {!isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loginWithRedirect()}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              Sign in with Auth0
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-400 transition-all duration-300 shadow-lg shadow-red-500/25"
            >
              Logout
            </motion.button>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;