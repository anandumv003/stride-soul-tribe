
import { Button } from "@/components/ui/button";
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
      'energized': 'text-yellow-600',
      'accomplished': 'text-purple-600',
      'peaceful': 'text-blue-600',
      'happy': 'text-green-600',
      'grateful': 'text-orange-600',
    };
    return colors[mood as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200 rounded-lg">
      <div className="p-6">
        {/* User Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm rounded-full">
              {avatar}
            </div>
            <div>
              <div className="font-medium text-gray-900">{user}</div>
              <div className="text-xs text-gray-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {time}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 text-xs font-medium rounded-full bg-gray-50 ${getMoodColor(mood)}`}>
            {mood}
          </div>
        </div>

        {/* Run Stats - Clean Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-xl font-light text-gray-900">{distance}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">KM</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-light text-gray-900">{duration}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Time</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 flex items-center justify-center">
              <MapPin className="h-3 w-3 mr-1" />
            </div>
            <div className="text-xs text-gray-600 font-medium">{location}</div>
          </div>
        </div>

        {/* Note */}
        <p className="text-gray-700 mb-4 leading-relaxed">{note}</p>

        {/* Actions */}
        <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
          <Button variant="ghost" className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-0 font-normal">
            <Heart className="h-4 w-4 mr-2" />
            <span className="text-sm">{cheers}</span>
          </Button>
          <Button variant="ghost" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-0 font-normal">
            <MessageCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">Cheer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
