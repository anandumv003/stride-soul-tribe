
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Users, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import RunTracker from "@/components/RunTracker";
import FeedCard from "@/components/FeedCard";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showRunTracker, setShowRunTracker] = useState(false);

  // Mock data for demonstration
  const mockUser = {
    name: "Sarah",
    streakDays: 12,
    totalRuns: 47,
    totalDistance: 234.5,
    currentMood: "energized"
  };

  const mockPod = {
    name: "Morning Warriors",
    members: 4,
    weeklyGoal: 20,
    currentProgress: 14
  };

  const mockFeedItems = [
    {
      id: 1,
      user: "Alex Chen",
      avatar: "AC",
      distance: 5.2,
      duration: "32:15",
      mood: "accomplished",
      note: "Beautiful sunrise run through the park! Feeling grateful for this community 🌅",
      time: "2 hours ago",
      cheers: 12,
      location: "Central Park Loop"
    },
    {
      id: 2,
      user: "Maya Patel",
      avatar: "MP",
      distance: 3.1,
      duration: "24:30",
      mood: "peaceful",
      note: "Slow and steady today. Sometimes it's about showing up, not speed ✨",
      time: "5 hours ago",
      cheers: 8,
      location: "Riverside Trail"
    }
  ];

  const handleStartRun = () => {
    setShowRunTracker(true);
  };

  if (showRunTracker) {
    return <RunTracker onBack={() => setShowRunTracker(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Hero Section - Minimalistic */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light text-gray-900">Run</h1>
              <p className="text-gray-500 text-sm">Hey {mockUser.name}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900">{mockUser.streakDays}</div>
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

        {/* Stats Grid - Clean */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center py-4">
              <div className="text-2xl font-light text-gray-900">{mockUser.totalRuns}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Runs</div>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl font-light text-gray-900">{mockUser.totalDistance}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">KM</div>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl font-light text-gray-900 capitalize">{mockUser.currentMood}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Mood</div>
            </div>
          </div>
        </div>

        {/* Pod Section - Minimal */}
        <div className="px-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="mr-3 h-5 w-5 text-gray-400" />
              <div>
                <h3 className="text-lg font-normal">{mockPod.name}</h3>
                <p className="text-sm text-gray-500">{mockPod.members} members</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Weekly Goal</span>
                <span className="text-lg font-light text-gray-900">
                  {mockPod.currentProgress}/{mockPod.weeklyGoal}km
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1 rounded">
                <div 
                  className="bg-gray-900 h-1 rounded transition-all duration-500"
                  style={{ width: `${(mockPod.currentProgress / mockPod.weeklyGoal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed - Clean */}
        <div className="px-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-normal flex items-center">
              <Zap className="mr-2 h-5 w-5 text-gray-400" />
              Activity
            </h2>
            <Button variant="ghost" className="text-gray-400 hover:text-gray-600 font-normal text-sm">
              View All
            </Button>
          </div>
          
          {mockFeedItems.map((item) => (
            <FeedCard key={item.id} {...item} />
          ))}
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
