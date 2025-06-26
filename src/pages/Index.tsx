
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Heart, MapPin, Trophy, Plus, Zap, Target } from "lucide-react";
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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto bg-black min-h-screen">
        {/* Hero Section - Nike Style */}
        <div className="relative h-80 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight">RUN</h1>
                <p className="text-gray-300 text-sm font-medium">Hey {mockUser.name}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-400">{mockUser.streakDays}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Days</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-4xl font-black mb-2">JUST DO IT</h2>
                <p className="text-gray-300 text-sm">Every run counts. Every step matters.</p>
              </div>
              
              <Button 
                onClick={handleStartRun}
                className="w-full bg-white text-black hover:bg-gray-100 font-black py-4 text-lg rounded-none transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Play className="mr-3 h-6 w-6" />
                START RUN
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid - Nike Style */}
        <div className="p-6 -mt-8 relative z-20">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 p-4 text-center border border-gray-800">
              <div className="text-2xl font-black text-green-400">{mockUser.totalRuns}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Total Runs</div>
            </div>
            <div className="bg-gray-900 p-4 text-center border border-gray-800">
              <div className="text-2xl font-black text-blue-400">{mockUser.totalDistance}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Kilometers</div>
            </div>
            <div className="bg-gray-900 p-4 text-center border border-gray-800">
              <div className="text-2xl font-black text-orange-400 capitalize">{mockUser.currentMood}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Last Mood</div>
            </div>
          </div>

          {/* Pod Section - Nike Style */}
          <div className="bg-gray-900 border border-gray-800 mb-8">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Users className="mr-3 h-6 w-6 text-white" />
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wide">{mockPod.name}</h3>
                  <p className="text-sm text-gray-400">{mockPod.members} runners strong</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-wide">Weekly Goal</span>
                  <span className="text-lg font-black text-green-400">
                    {mockPod.currentProgress}/{mockPod.weeklyGoal}KM
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 transition-all duration-500"
                    style={{ width: `${(mockPod.currentProgress / mockPod.weeklyGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-green-400">
                    {Math.round((mockPod.currentProgress / mockPod.weeklyGoal) * 100)}% COMPLETE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed - Nike Style */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-wide flex items-center">
                <Zap className="mr-2 h-6 w-6 text-yellow-400" />
                Activity
              </h2>
              <Button variant="ghost" className="text-gray-400 hover:text-white font-bold uppercase text-xs">
                View All
              </Button>
            </div>
            
            {mockFeedItems.map((item) => (
              <FeedCard key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
