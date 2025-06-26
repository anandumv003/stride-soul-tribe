
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, Square, MapPin } from "lucide-react";
import MoodJournal from "./MoodJournal";

interface RunTrackerProps {
  onBack: () => void;
}

const RunTracker = ({ onBack }: RunTrackerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [showMoodJournal, setShowMoodJournal] = useState(false);

  // Mock data for current pace and location
  const currentPace = "5:24";
  const currentLocation = "Central Park Loop";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
        // Simulate distance increase (very basic simulation)
        setDistance(distance => distance + 0.005);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setShowMoodJournal(true);
  };

  const handleMoodJournalComplete = () => {
    setShowMoodJournal(false);
    onBack();
  };

  if (showMoodJournal) {
    return (
      <MoodJournal 
        runData={{
          time: formatTime(time),
          distance: distance.toFixed(2),
          pace: currentPace,
          location: currentLocation
        }}
        onComplete={handleMoodJournalComplete}
        onBack={() => setShowMoodJournal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center text-sm text-purple-200">
            <MapPin className="h-4 w-4 mr-1" />
            {currentLocation}
          </div>
        </div>

        {/* Main Stats */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{formatTime(time)}</div>
            <div className="text-purple-200">Duration</div>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">{distance.toFixed(2)}</div>
              <div className="text-sm text-blue-200">km</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-300">{currentPace}</div>
              <div className="text-sm text-pink-200">pace/km</div>
            </div>
          </div>

          {/* Run Controls */}
          <div className="flex space-x-4 mt-8">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 p-0 shadow-lg"
              >
                <Play className="h-8 w-8" />
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-16 h-16 p-0 shadow-lg"
              >
                <Pause className="h-8 w-8" />
              </Button>
            )}
            
            <Button
              onClick={handleStop}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 rounded-full w-16 h-16 p-0 shadow-lg"
            >
              <Square className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <Card className="m-6 bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-semibold">Avg Pace</div>
                <div className="text-purple-200">{currentPace}</div>
              </div>
              <div>
                <div className="font-semibold">Calories</div>
                <div className="text-purple-200">{Math.round(distance * 65)}</div>
              </div>
              <div>
                <div className="font-semibold">Steps</div>
                <div className="text-purple-200">{Math.round(distance * 1300)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RunTracker;
