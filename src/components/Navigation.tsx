
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
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
      <div className="flex justify-around items-center px-2 py-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 transition-all duration-200 ${
                isActive 
                  ? 'text-gray-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1`} />
              <span className="text-xs font-normal">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
