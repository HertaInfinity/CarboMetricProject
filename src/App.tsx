import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
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
import PrivateRoute from './components/PrivateRoute.tsx';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className="text-center mt-20 text-green-400">Loading...</div>;

  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-black text-green-400">
            {isAuthenticated && <Navbar />}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/add-data" element={<PrivateRoute><AddData /></PrivateRoute>} />
              <Route path="/history" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
              <Route path="/breakdown" element={<PrivateRoute><EmissionBreakdown /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
              <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute><EcoCalendar /></PrivateRoute>} />
              <Route path="/tips" element={<PrivateRoute><TipsSection /></PrivateRoute>} />
              <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
              <Route path="/offset" element={<PrivateRoute><CarbonOffset /></PrivateRoute>} />
              <Route path="/social" element={<PrivateRoute><SocialFeed /></PrivateRoute>} />
              <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App;