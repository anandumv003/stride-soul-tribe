
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
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center text-sm text-gray-500 font-normal">
            <MapPin className="h-4 w-4 mr-2" />
            {currentLocation}
          </div>
        </div>

        {/* Main Stats */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-12">
          <div className="text-center">
            <div className="text-6xl font-light mb-4 text-gray-900">{formatTime(time)}</div>
            <div className="text-gray-400 uppercase tracking-widest text-sm">Duration</div>
          </div>

          <div className="grid grid-cols-2 gap-12 w-full max-w-sm">
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">{distance.toFixed(2)}</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Kilometers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">{currentPace}</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Pace/KM</div>
            </div>
          </div>

          {/* Run Controls */}
          <div className="flex space-x-6 mt-12">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 w-16 h-16 p-0 rounded-full shadow-lg"
              >
                <Play className="h-8 w-8" />
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="lg"
                className="bg-orange-500 text-white hover:bg-orange-600 w-16 h-16 p-0 rounded-full shadow-lg"
              >
                <Pause className="h-8 w-8" />
              </Button>
            )}
            
            <Button
              onClick={handleStop}
              size="lg"
              className="bg-white border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 w-16 h-16 p-0 rounded-full shadow-lg"
            >
              <Square className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="m-6 bg-gray-50 rounded-lg">
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 text-center text-sm">
              <div>
                <div className="font-light text-lg text-gray-900 mb-1">{currentPace}</div>
                <div className="text-gray-400 uppercase tracking-wide">Avg Pace</div>
              </div>
              <div>
                <div className="font-light text-lg text-gray-900 mb-1">{Math.round(distance * 65)}</div>
                <div className="text-gray-400 uppercase tracking-wide">Calories</div>
              </div>
              <div>
                <div className="font-light text-lg text-gray-900 mb-1">{Math.round(distance * 1300)}</div>
                <div className="text-gray-400 uppercase tracking-wide">Steps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunTracker;
