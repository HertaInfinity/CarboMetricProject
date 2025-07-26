import React, { useState } from 'react';
import { Users, Heart, MessageCircle, Share2, Trophy, Leaf, TrendingUp, Plus, UserPlus } from 'lucide-react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
    greenScore: number;
  };
  content: string;
  type: 'achievement' | 'challenge' | 'tip' | 'milestone';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  achievement?: {
    title: string;
    description: string;
    co2Saved: number;
  };
}

const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: { name: 'Emma Watson', avatar: '🌱', level: 'Eco Master', greenScore: 95 },
      content: 'Just completed my plastic-free week challenge! Feeling amazing about reducing waste.',
      type: 'achievement',
      timestamp: '2 hours ago',
      likes: 34,
      comments: 8,
      isLiked: false,
      achievement: { title: 'Plastic-Free Week', description: 'Zero single-use plastic for 7 days', co2Saved: 2.3 }
    },
    {
      id: '2',
      user: { name: 'Alex Chen', avatar: '♻️', level: 'Green Warrior', greenScore: 87 },
      content: 'Pro tip: Switching to cold water for washing clothes can save up to 90% of energy! 💡',
      type: 'tip',
      timestamp: '4 hours ago',
      likes: 56,
      comments: 12,
      isLiked: true
    },
    {
      id: '3',
      user: { name: 'Maya Patel', avatar: '🌿', level: 'Eco Champion', greenScore: 92 },
      content: 'Hit my monthly goal of reducing emissions by 25%! The planet and my wallet are both happy 🌍',
      type: 'milestone',
      timestamp: '6 hours ago',
      likes: 78,
      comments: 15,
      isLiked: false,
      achievement: { title: 'Monthly Goal Crusher', description: '25% emission reduction', co2Saved: 45.2 }
    },
    {
      id: '4',
      user: { name: 'David Kim', avatar: '🌍', level: 'Green Novice', greenScore: 68 },
      content: 'Started the "Walk Wednesday" challenge today. Already feeling more energized! Who wants to join?',
      type: 'challenge',
      timestamp: '8 hours ago',
      likes: 23,
      comments: 6,
      isLiked: false
    },
    {
      id: '5',
      user: { name: 'Sofia Rodriguez', avatar: '🌳', level: 'Eco Expert', greenScore: 89 },
      content: 'Planted 5 trees in my neighborhood today as part of the community offset project! 🌳',
      type: 'achievement',
      timestamp: '1 day ago',
      likes: 102,
      comments: 24,
      isLiked: true,
      achievement: { title: 'Tree Planter', description: 'Planted 5+ trees', co2Saved: 110 }
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const friends = [
    { name: 'Emma Watson', avatar: '🌱', status: 'online', greenScore: 95 },
    { name: 'Alex Chen', avatar: '♻️', status: 'active', greenScore: 87 },
    { name: 'Maya Patel', avatar: '🌿', status: 'offline', greenScore: 92 },
    { name: 'David Kim', avatar: '🌍', status: 'online', greenScore: 68 },
    { name: 'Sofia Rodriguez', avatar: '🌳', status: 'active', greenScore: 89 }
  ];

  const challenges = [
    { title: 'Meatless Monday', participants: 1250, difficulty: 'Easy', reward: '2.5kg CO₂ saved' },
    { title: 'Plastic-Free Week', participants: 890, difficulty: 'Medium', reward: '4.1kg CO₂ saved' },
    { title: 'Zero Waste Weekend', participants: 445, difficulty: 'Hard', reward: '6.8kg CO₂ saved' }
  ];

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'challenge': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'tip': return <Leaf className="w-4 h-4 text-green-400" />;
      case 'milestone': return <Trophy className="w-4 h-4 text-purple-400" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'challenge': return 'border-blue-500/30 bg-blue-500/5';
      case 'tip': return 'border-green-500/30 bg-green-500/5';
      case 'milestone': return 'border-purple-500/30 bg-purple-500/5';
      default: return 'border-gray-500/30';
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Eco Master': 'text-purple-400',
      'Eco Expert': 'text-blue-400',
      'Eco Champion': 'text-green-400',
      'Green Warrior': 'text-yellow-400',
      'Green Novice': 'text-gray-400'
    };
    return colors[level as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Users className="w-10 h-10 text-blue-400 mr-3" />
            Eco Community
          </h1>
          <p className="text-gray-400 text-lg">Connect with fellow eco-warriors and share your journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                  🌱
                </div>
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-xl text-left text-gray-400 hover:border-green-500 transition-colors"
                >
                  Share your eco journey...
                </button>
              </div>

              {showNewPost && (
                <div className="space-y-4">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your achievement, tip, or challenge..."
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowNewPost(false)}
                      className="px-6 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:border-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-300">
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className={`bg-gray-900/50 border rounded-2xl p-6 ${getTypeColor(post.type)}`}>
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-semibold">{post.user.name}</h3>
                        <span className={`text-sm ${getLevelColor(post.user.level)}`}>
                          {post.user.level}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span>Green Score: {post.user.greenScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(post.type)}
                  </div>
                </div>

                {/* Achievement Badge */}
                {post.achievement && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-green-400 font-semibold">{post.achievement.title}</h4>
                        <p className="text-gray-300 text-sm">{post.achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">-{post.achievement.co2Saved}kg</div>
                        <div className="text-gray-400 text-xs">CO₂ saved</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Post Content */}
                <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Friends List */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Eco Friends</h3>
                <button className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors">
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {friends.map((friend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-lg">
                          {friend.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                          friend.status === 'online' ? 'bg-green-400' : 
                          friend.status === 'active' ? 'bg-yellow-400' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{friend.name}</div>
                        <div className="text-gray-400 text-xs">Score: {friend.greenScore}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Challenges */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                Active Challenges
              </h3>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-xl border border-gray-600 hover:border-green-500/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold text-sm">{challenge.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{challenge.participants} participants</span>
                      <span className="text-green-400 text-xs font-semibold">{challenge.reward}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Join Challenge</span>
                </button>
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Community Impact</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">2,847</div>
                  <div className="text-gray-400 text-sm">kg CO₂ saved this week</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-400">156</div>
                    <div className="text-gray-400 text-xs">Active members</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-yellow-400">89</div>
                    <div className="text-gray-400 text-xs">Challenges completed</div>
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

export default SocialFeed;