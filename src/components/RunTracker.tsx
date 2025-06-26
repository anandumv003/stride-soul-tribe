
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/10 border border-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center text-sm text-gray-300 font-bold uppercase tracking-wide">
            <MapPin className="h-4 w-4 mr-2" />
            {currentLocation}
          </div>
        </div>

        {/* Main Stats */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 space-y-12">
          <div className="text-center">
            <div className="text-8xl font-black mb-4 tracking-tighter">{formatTime(time)}</div>
            <div className="text-gray-400 uppercase tracking-widest font-bold">Duration</div>
          </div>

          <div className="grid grid-cols-2 gap-12 w-full max-w-sm">
            <div className="text-center">
              <div className="text-5xl font-black text-green-400 mb-2">{distance.toFixed(2)}</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Kilometers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">{currentPace}</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Pace/KM</div>
            </div>
          </div>

          {/* Run Controls */}
          <div className="flex space-x-6 mt-12">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="bg-white text-black hover:bg-gray-100 w-20 h-20 p-0 font-black text-xl shadow-2xl border-4 border-white"
              >
                <Play className="h-10 w-10" />
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300 w-20 h-20 p-0 font-black text-xl shadow-2xl border-4 border-yellow-400"
              >
                <Pause className="h-10 w-10" />
              </Button>
            )}
            
            <Button
              onClick={handleStop}
              size="lg"
              className="bg-transparent border-4 border-white text-white hover:bg-white hover:text-black w-20 h-20 p-0 font-black text-xl shadow-2xl"
            >
              <Square className="h-10 w-10" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 m-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700">
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 text-center text-sm">
              <div>
                <div className="font-black text-lg text-white mb-1">{currentPace}</div>
                <div className="text-gray-400 uppercase tracking-wide font-bold">Avg Pace</div>
              </div>
              <div>
                <div className="font-black text-lg text-orange-400 mb-1">{Math.round(distance * 65)}</div>
                <div className="text-gray-400 uppercase tracking-wide font-bold">Calories</div>
              </div>
              <div>
                <div className="font-black text-lg text-green-400 mb-1">{Math.round(distance * 1300)}</div>
                <div className="text-gray-400 uppercase tracking-wide font-bold">Steps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunTracker;
