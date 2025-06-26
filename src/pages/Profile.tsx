
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import { User, Settings, LogOut } from "lucide-react";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    avatar_url: ''
  });
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalDistance: 0,
    totalDuration: 0
  });

  useEffect(() => {
    if (user) {
      loadProfile();
      loadStats();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('runs')
        .select('distance, duration')
        .eq('user_id', user?.id);

      if (error) throw error;

      if (data) {
        const totalRuns = data.length;
        const totalDistance = data.reduce((sum, run) => sum + parseFloat(run.distance || '0'), 0);
        const totalDuration = data.reduce((sum, run) => sum + (run.duration || 0), 0);

        setStats({
          totalRuns,
          totalDistance: Math.round(totalDistance * 100) / 100,
          totalDuration
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-light text-gray-900">Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Profile Avatar */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-light text-gray-900">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-gray-500">@{profile.username}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">{stats.totalRuns}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Runs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">{stats.totalDistance}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">KM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">{formatDuration(stats.totalDuration)}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Time</div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="px-6 space-y-6">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-normal text-gray-900">Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.first_name}
                  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.last_name}
                  onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="mt-1"
              />
            </div>

            <Button
              onClick={updateProfile}
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
