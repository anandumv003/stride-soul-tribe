
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Zap, Sun, Smile, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodJournalProps {
  runData: {
    time: string;
    distance: string;
    pace: string;
    location: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const MoodJournal = ({ runData, onComplete, onBack }: MoodJournalProps) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [journal, setJournal] = useState('');
  const { toast } = useToast();

  const moods = [
    { id: 'energized', icon: Zap, label: 'Energized', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'accomplished', icon: Star, label: 'Accomplished', color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 'peaceful', icon: Heart, label: 'Peaceful', color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'grateful', icon: Sun, label: 'Grateful', color: 'text-orange-500', bg: 'bg-orange-100' },
  ];

  const handleSave = () => {
    if (!selectedMood) {
      toast({
        title: "Please select your mood",
        description: "How are you feeling after this run?",
        variant: "destructive",
      });
      return;
    }

    // Here you would save to database
    console.log('Saving run:', {
      ...runData,
      mood: selectedMood,
      journal
    });

    toast({
      title: "Run saved! 🎉",
      description: "Great job on completing your run!",
    });

    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">How was your run?</h1>
          <div></div>
        </div>

        <div className="p-6 space-y-6">
          {/* Run Summary */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Run Complete! 🏃‍♀️</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Time</div>
                  <div className="font-semibold text-lg">{runData.time}</div>
                </div>
                <div>
                  <div className="text-gray-600">Distance</div>
                  <div className="font-semibold text-lg">{runData.distance} km</div>
                </div>
                <div>
                  <div className="text-gray-600">Pace</div>
                  <div className="font-semibold">{runData.pace}/km</div>
                </div>
                <div>
                  <div className="text-gray-600">Location</div>
                  <div className="font-semibold">{runData.location}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Selection */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">How are you feeling?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;
                  
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? `${mood.bg} border-current ${mood.color} scale-105`
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${isSelected ? mood.color : 'text-gray-400'}`} />
                      <div className={`text-sm font-medium ${isSelected ? mood.color : 'text-gray-600'}`}>
                        {mood.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Journal Entry */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Share your experience</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What made this run special? Any insights or thoughts to share with your pod? (Optional)"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="text-xs text-gray-500 mt-2">
                This will be shared with your pod to inspire and connect with others
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Save & Share with Pod
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodJournal;
