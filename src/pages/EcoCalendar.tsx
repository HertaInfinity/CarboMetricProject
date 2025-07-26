import { useState } from 'react';
import { Calendar, Plus, Target, CheckCircle, Clock, Star } from 'lucide-react';

const EcoCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const ecoEvents = [
    {
      id: 1,
      date: '2025-01-15',
      title: 'Meatless Monday',
      type: 'challenge',
      status: 'completed',
      emission_saved: 2.5,
      description: 'Complete day without meat products'
    },
    {
      id: 2,
      date: '2025-01-16',
      title: 'Walk to Work',
      type: 'transport',
      status: 'pending',
      emission_saved: 3.2,
      description: 'Use walking instead of car for commute'
    },
    {
      id: 3,
      date: '2025-01-17',
      title: 'No Plastic Day',
      type: 'challenge',
      status: 'pending',
      emission_saved: 1.8,
      description: 'Avoid all single-use plastic items'
    },
    {
      id: 4,
      date: '2025-01-18',
      title: 'Green Energy Focus',
      type: 'energy',
      status: 'pending',
      emission_saved: 4.1,
      description: 'Monitor and reduce electricity usage'
    },
    {
      id: 5,
      date: '2025-01-19',
      title: 'Local Shopping Only',
      type: 'shopping',
      status: 'pending',
      emission_saved: 2.3,
      description: 'Buy only from local businesses'
    }
  ];

  const challenges = [
    { name: 'Meatless Monday', icon: '🥗', difficulty: 'Easy' },
    { name: 'Plastic-Free Tuesday', icon: '♻️', difficulty: 'Medium' },
    { name: 'Walk Wednesday', icon: '🚶‍♂️', difficulty: 'Easy' },
    { name: 'Thrifty Thursday', icon: '👕', difficulty: 'Medium' },
    { name: 'Fix-It Friday', icon: '🔧', difficulty: 'Hard' },
    { name: 'Sustainable Saturday', icon: '🌱', difficulty: 'Medium' },
    { name: 'Solar Sunday', icon: '☀️', difficulty: 'Easy' }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      challenge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      transport: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      energy: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      shopping: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: 'text-green-400',
      Medium: 'text-yellow-400',
      Hard: 'text-red-400'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-400';
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: string) => {
    return ecoEvents.filter(event => event.date === date);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateString = formatDate(date);
      const dayEvents = getEventsForDate(dateString);
      const isToday = dateString === formatDate(new Date());

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-700 p-2 hover:bg-gray-800/30 transition-colors cursor-pointer ${
            isToday ? 'bg-green-500/10 border-green-500/30' : ''
          }`}
        >
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-green-400' : 'text-white'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded border ${getTypeColor(event.type)} truncate`}
              >
                {event.status === 'completed' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-400">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Calendar className="w-10 h-10 text-green-400 mr-3" />
            Eco Calendar & Planner
          </h1>
          <p className="text-gray-400 text-lg">Plan your sustainable activities and track eco-challenges</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            {/* Calendar Header */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-green-500 transition-colors"
                  >
                    ←
                  </button>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-green-500 transition-colors"
                  >
                    →
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      viewMode === 'month'
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-green-500'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      viewMode === 'week'
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-green-500'
                    }`}
                  >
                    Week
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Week days header */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center text-gray-400 font-semibold">
                    {day}
                  </div>
                ))}
                {/* Calendar days */}
                {renderCalendar()}
              </div>
            </div>

            {/* Today's Activities */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Target className="w-5 h-5 text-blue-400 mr-2" />
                Today's Eco Activities
              </h3>
              <div className="space-y-4">
                {ecoEvents.filter(event => event.date === formatDate(new Date())).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                        {event.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{event.title}</h4>
                        <p className="text-gray-400 text-sm">{event.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">
                        -{event.emission_saved}kg CO₂
                      </div>
                      {event.status === 'completed' && (
                        <div className="text-green-400 text-sm">✓ Completed</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add New Activity */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 text-green-400 mr-2" />
                Quick Add
              </h3>
              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 mb-4">
                Add Eco Activity
              </button>
              <button className="w-full py-3 bg-gray-800 border border-gray-600 text-white rounded-xl hover:border-green-500 transition-colors">
                Set Reminder
              </button>
            </div>

            {/* Weekly Challenges */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                Weekly Challenges
              </h3>
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{challenge.icon}</span>
                      <div>
                        <div className="text-white text-sm font-medium">{challenge.name}</div>
                        <div className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </div>
                      </div>
                    </div>
                    <button className="text-green-400 hover:text-green-300 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Progress */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Activities Completed</span>
                    <span className="text-white font-semibold">12/30</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">CO₂ Saved</span>
                    <span className="text-green-400 font-semibold">38.5kg</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Streak Days</span>
                    <span className="text-yellow-400 font-semibold">7 days</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoCalendar;