
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Heart, MapPin, Trophy, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Hey {mockUser.name}! 👋</h1>
              <p className="text-orange-100">Ready to run with purpose?</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockUser.streakDays}</div>
              <div className="text-xs text-orange-100">day streak</div>
            </div>
          </div>
          
          <Button 
            onClick={handleStartRun}
            className="w-full bg-white text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Your Run
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="p-4 -mt-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="text-center p-3 shadow-sm">
              <div className="text-lg font-bold text-orange-600">{mockUser.totalRuns}</div>
              <div className="text-xs text-gray-600">Total Runs</div>
            </Card>
            <Card className="text-center p-3 shadow-sm">
              <div className="text-lg font-bold text-pink-600">{mockUser.totalDistance}km</div>
              <div className="text-xs text-gray-600">Distance</div>
            </Card>
            <Card className="text-center p-3 shadow-sm">
              <div className="text-lg font-bold text-purple-600 capitalize">{mockUser.currentMood}</div>
              <div className="text-xs text-gray-600">Last Mood</div>
            </Card>
          </div>

          {/* Pod Section */}
          <Card className="mb-6 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Your Pod: {mockPod.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">{mockPod.members} members</span>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {mockPod.currentProgress}/{mockPod.weeklyGoal}km this week
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(mockPod.currentProgress / mockPod.weeklyGoal) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Weekly Goal Progress</span>
                <span className="text-xs text-blue-600 font-medium">
                  {Math.round((mockPod.currentProgress / mockPod.weeklyGoal) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Community Feed
              </h2>
              <Button variant="ghost" size="sm" className="text-orange-600">
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
