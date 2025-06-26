
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Play, Users, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import RunTracker from "@/components/RunTracker";
import FeedCard from "@/components/FeedCard";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [showRunTracker, setShowRunTracker] = useState(false);
  const [userStats, setUserStats] = useState({
    totalRuns: 0,
    totalDistance: 0,
    streakDays: 0,
    currentMood: 'energized'
  });
  const [profile, setProfile] = useState({ first_name: 'Runner' });
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [podData, setPodData] = useState({
    name: "Morning Warriors",
    members: 4,
    weeklyGoal: 20,
    currentProgress: 14
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      loadUserData();
      loadFeedData();
    }
  }, [user, loading, navigate]);

  const loadUserData = async () => {
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Load user stats
      const { data: runsData } = await supabase
        .from('runs')
        .select('distance, created_at')
        .eq('user_id', user?.id);

      if (runsData) {
        const totalRuns = runsData.length;
        const totalDistance = runsData.reduce((sum, run) => sum + parseFloat(run.distance || '0'), 0);
        
        // Calculate streak (simplified)
        const streakDays = totalRuns > 0 ? Math.min(totalRuns, 12) : 0;

        setUserStats({
          totalRuns,
          totalDistance: Math.round(totalDistance * 100) / 100,
          streakDays,
          currentMood: 'energized'
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadFeedData = async () => {
    try {
      const { data } = await supabase
        .from('runs')
        .select(`
          *,
          profiles!runs_user_id_fkey (first_name, last_name, username)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        const formattedFeed = data.map((run, index) => ({
          id: run.id,
          user: run.profiles?.first_name ? `${run.profiles.first_name} ${run.profiles.last_name}` : run.profiles?.username || 'Anonymous',
          avatar: run.profiles?.first_name ? `${run.profiles.first_name[0]}${run.profiles.last_name?.[0] || ''}` : 'A',
          distance: parseFloat(run.distance || '0'),
          duration: formatDuration(run.duration || 0),
          mood: run.mood || 'accomplished',
          note: run.journal_note || 'Great run today!',
          time: formatTimeAgo(run.created_at),
          cheers: Math.floor(Math.random() * 20) + 1,
          location: run.location || 'Unknown'
        }));
        setFeedItems(formattedFeed);
      }
    } catch (error) {
      console.error('Error loading feed data:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const handleStartRun = () => {
    setShowRunTracker(true);
  };

  const handleRunComplete = () => {
    setShowRunTracker(false);
    loadUserData();
    loadFeedData();
  };

  // Handle different tabs
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        navigate('/profile');
        return null;
      case 'pods':
        return <div className="p-6 text-center text-gray-500">Pods feature coming soon!</div>;
      case 'events':
        return <div className="p-6 text-center text-gray-500">Events feature coming soon!</div>;
      case 'challenges':
        return <div className="p-6 text-center text-gray-500">Challenges feature coming soon!</div>;
      default:
        return (
          <>
            {/* Hero Section */}
            <div className="px-6 pt-12 pb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-light text-gray-900">Run</h1>
                  <p className="text-gray-500 text-sm">Hey {profile.first_name}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900">{userStats.streakDays}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Days</div>
                </div>
              </div>
              
              <Button 
                onClick={handleStartRun}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 font-normal py-6 text-base rounded-lg"
              >
                <Play className="mr-3 h-5 w-5" />
                Start Run
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="px-6 mb-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center py-4">
                  <div className="text-2xl font-light text-gray-900">{userStats.totalRuns}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Runs</div>
                </div>
                <div className="text-center py-4">
                  <div className="text-2xl font-light text-gray-900">{userStats.totalDistance}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">KM</div>
                </div>
                <div className="text-center py-4">
                  <div className="text-2xl font-light text-gray-900 capitalize">{userStats.currentMood}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Mood</div>
                </div>
              </div>
            </div>

            {/* Pod Section */}
            <div className="px-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-normal">{podData.name}</h3>
                    <p className="text-sm text-gray-500">{podData.members} members</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weekly Goal</span>
                    <span className="text-lg font-light text-gray-900">
                      {podData.currentProgress}/{podData.weeklyGoal}km
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-1 rounded">
                    <div 
                      className="bg-gray-900 h-1 rounded transition-all duration-500"
                      style={{ width: `${(podData.currentProgress / podData.weeklyGoal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="px-6 space-y-6 pb-24">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-normal flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-gray-400" />
                  Activity
                </h2>
                <Button variant="ghost" className="text-gray-400 hover:text-gray-600 font-normal text-sm">
                  View All
                </Button>
              </div>
              
              {feedItems.length > 0 ? (
                feedItems.map((item) => (
                  <FeedCard key={item.id} {...item} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Start your first run to see activity!</p>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (showRunTracker) {
    return <RunTracker onBack={() => setShowRunTracker(false)} onComplete={handleRunComplete} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {renderContent()}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
