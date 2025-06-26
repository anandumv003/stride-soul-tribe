
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MapPin, Clock } from "lucide-react";

interface FeedCardProps {
  id: number;
  user: string;
  avatar: string;
  distance: number;
  duration: string;
  mood: string;
  note: string;
  time: string;
  cheers: number;
  location: string;
}

const FeedCard = ({ user, avatar, distance, duration, mood, note, time, cheers, location }: FeedCardProps) => {
  const getMoodColor = (mood: string) => {
    const colors = {
      'energized': 'bg-yellow-100 text-yellow-800',
      'accomplished': 'bg-purple-100 text-purple-800',
      'peaceful': 'bg-blue-100 text-blue-800',
      'happy': 'bg-green-100 text-green-800',
      'grateful': 'bg-orange-100 text-orange-800',
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* User Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {avatar}
            </div>
            <div>
              <div className="font-semibold text-sm">{user}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {time}
              </div>
            </div>
          </div>
          <Badge className={`${getMoodColor(mood)} border-0`}>
            {mood}
          </Badge>
        </div>

        {/* Run Stats */}
        <div className="grid grid-cols-3 gap-4 mb-3 text-center">
          <div>
            <div className="text-lg font-bold text-orange-600">{distance}km</div>
            <div className="text-xs text-gray-500">Distance</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{duration}</div>
            <div className="text-xs text-gray-500">Time</div>
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{note}</p>

        {/* Actions */}
        <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">{cheers}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-2">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Cheer</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
