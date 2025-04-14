
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatLayout } from "@/components/ChatLayout";
import { ChatProvider } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Mobile Sidebar Toggle */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 z-50"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {/* Sidebar */}
        <div className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out' : 'relative'}
          ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        `}>
          <Sidebar />
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatLayout />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
