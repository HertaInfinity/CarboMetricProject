import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddData from './pages/AddData';
import TransactionHistory from './pages/TransactionHistory';
import EmissionBreakdown from './pages/EmissionBreakdown';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Chatbot from './pages/Chatbot';
import EcoCalendar from './pages/EcoCalendar';
import TipsSection from './pages/TipsSection';
import Goals from './pages/Goals';
import CarbonOffset from './pages/CarbonOffset';
import SocialFeed from './pages/SocialFeed';
import Marketplace from './pages/Marketplace';
import AuthPage from './pages/AuthPage';
import { UserProvider } from './context/UserContext';
import { DataProvider } from './context/DataContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-black text-green-400">
            {isAuthenticated && <Navbar />}
            <Routes>
              <Route path="/" element={<LandingPage setAuth={setIsAuthenticated} />} />
              <Route path="/auth" element={<AuthPage setAuth={setIsAuthenticated} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-data" element={<AddData />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/breakdown" element={<EmissionBreakdown />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/calendar" element={<EcoCalendar />} />
              <Route path="/tips" element={<TipsSection />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/offset" element={<CarbonOffset />} />
              <Route path="/social" element={<SocialFeed />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App;