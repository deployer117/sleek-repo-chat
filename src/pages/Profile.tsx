
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogOut, User, Save } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!data.session) {
          navigate("/signin");
          return;
        }
        
        // Set current user info
        const user = data.session.user;
        setUserId(user.id);
        setEmail(user.email || "");
        
        // Fetch profile data
        await fetchProfile(user.id);
      } catch (error) {
        console.error("Error checking session:", error);
        navigate("/signin");
      } finally {
        setIsFetching(false);
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setUsername(data.username || "");
        setFullName(data.full_name || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("You must be logged in to update your profile");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success("Signed out successfully!");
      navigate("/signin");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-t from-purple-500 to-blue-500 blur-[120px] opacity-10"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-primary to-secondary blur-[100px] opacity-10"></div>
      </div>
      
      <div className="max-w-4xl mx-auto w-full pt-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar */}
          <div className="md:w-1/3">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border shadow-sm sticky top-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-24 h-24 mb-4">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={fullName || username} />
                  ) : (
                    <AvatarFallback className="text-xl">
                      {(fullName || username || email)?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h2 className="text-xl font-bold">{fullName || username || "User"}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" disabled>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive" 
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border shadow-sm">
              <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
