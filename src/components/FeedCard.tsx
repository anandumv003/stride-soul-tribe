
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MapPin, Clock, Zap } from "lucide-react";

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
      'energized': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      'accomplished': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      'peaceful': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      'happy': 'text-green-400 bg-green-400/10 border-green-400/20',
      'grateful': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    };
    return colors[mood as keyof typeof colors] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  };

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-200">
      <div className="p-6">
        {/* User Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-black font-black text-lg">
              {avatar}
            </div>
            <div>
              <div className="font-bold text-white text-lg">{user}</div>
              <div className="text-xs text-gray-400 flex items-center uppercase tracking-wide">
                <Clock className="h-3 w-3 mr-1" />
                {time}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border ${getMoodColor(mood)}`}>
            {mood}
          </div>
        </div>

        {/* Run Stats - Nike Style Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 bg-black/30 p-4 border border-gray-800">
          <div className="text-center">
            <div className="text-2xl font-black text-green-400">{distance}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">KM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400">{duration}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Time</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 flex items-center justify-center">
              <MapPin className="h-3 w-3 mr-1" />
            </div>
            <div className="text-xs text-gray-300 font-medium">{location}</div>
          </div>
        </div>

        {/* Note */}
        <p className="text-gray-300 mb-4 leading-relaxed font-medium">{note}</p>

        {/* Actions */}
        <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
          <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-0 font-bold">
            <Heart className="h-5 w-5 mr-2" />
            <span className="text-sm uppercase tracking-wide">{cheers}</span>
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 p-0 font-bold">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span className="text-sm uppercase tracking-wide">Cheer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
