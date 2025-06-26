
import { Home, Users, Calendar, User, Trophy } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Run' },
    { id: 'pods', icon: Users, label: 'Pods' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'challenges', icon: Trophy, label: 'Goals' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black border-t border-gray-800">
      <div className="flex justify-around items-center px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-3 transition-all duration-200 ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
