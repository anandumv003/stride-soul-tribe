
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Square, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import MoodJournal from './MoodJournal';

interface RunTrackerProps {
  onBack: () => void;
  onComplete?: () => void;
}

const RunTracker = ({ onBack, onComplete }: RunTrackerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [showMoodJournal, setShowMoodJournal] = useState(false);
  const [runData, setRunData] = useState({
    distance: 0,
    duration: 0,
    pace: '0:00',
    location: 'Current Location',
    calories: 0,
    steps: 0
  });

  useEffect(() => {
    let interval: number;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime(time => time + 1);
        // Simulate distance increase (very basic)
        if (time % 10 === 0) {
          setDistance(prev => prev + 0.1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, time]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePace = () => {
    if (distance === 0) return '0:00';
    const paceInSeconds = (time / distance) / 60;
    const minutes = Math.floor(paceInSeconds);
    const seconds = Math.floor((paceInSeconds - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateCalories = () => {
    // Rough calculation: 100 calories per km
    return Math.round(distance * 100);
  };

  const calculateSteps = () => {
    // Rough calculation: 1300 steps per km
    return Math.round(distance * 1300);
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    const finalData = {
      distance: Math.round(distance * 100) / 100,
      duration: time,
      pace: calculatePace(),
      location: 'Current Location',
      calories: calculateCalories(),
      steps: calculateSteps()
    };
    
    setRunData(finalData);
    setIsRunning(false);
    setShowMoodJournal(true);
  };

  const handleSaveRun = async (mood: string, note: string) => {
    try {
      const { error } = await supabase
        .from('runs')
        .insert({
          user_id: user?.id,
          distance: runData.distance,
          duration: runData.duration,
          pace: runData.pace,
          location: runData.location,
          mood: mood,
          journal_note: note,
          calories: runData.calories,
          steps: runData.steps
        });

      if (error) throw error;

      toast({
        title: "Run Saved!",
        description: `Great job! You ran ${runData.distance}km in ${formatTime(runData.duration)}.`,
      });

      onComplete?.();
      onBack();
    } catch (error) {
      console.error('Error saving run:', error);
      toast({
        title: "Error",
        description: "Failed to save your run. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showMoodJournal) {
    return (
      <MoodJournal
        runData={runData}
        onSave={handleSaveRun}
        onBack={() => setShowMoodJournal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-normal">Run Tracker</h1>
          <div className="w-10" />
        </div>

        {/* Main Stats */}
        <div className="p-8 text-center">
          <div className="mb-8">
            <div className="text-6xl font-light text-gray-900 mb-2">
              {formatTime(time)}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">
              Duration
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-1">
                {distance.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                KM
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-1">
                {calculatePace()}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Pace /KM
              </div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg mb-8">
            <div className="text-center">
              <div className="text-lg font-light text-gray-900">{calculateCalories()}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Cal</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-light text-gray-900">{calculateSteps()}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Steps</div>
            </div>
            <div className="text-center">
              <MapPin className="h-4 w-4 text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-gray-600">GPS</div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="px-8 pb-8 space-y-4">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Run
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handlePause}
                variant="outline"
                className="py-6 text-lg"
              >
                <Pause className="mr-2 h-5 w-5" />
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                onClick={handleStop}
                className="bg-red-500 hover:bg-red-600 text-white py-6 text-lg"
              >
                <Square className="mr-2 h-5 w-5" />
                Stop
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunTracker;
