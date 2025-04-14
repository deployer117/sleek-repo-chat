
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { cn, formatDate } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const { chats, currentChatId, setCurrentChatId, createNewChat, deleteChat } = useChat();

  return (
    <aside className="w-full md:w-64 h-screen flex flex-col bg-sidebar p-4 border-r border-sidebar-border">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-sidebar-foreground">Repo Chat</h1>
      </div>
      
      <Button 
        onClick={() => createNewChat()} 
        variant="outline" 
        className="mb-4 w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
      >
        <Plus className="mr-2 h-4 w-4" /> New Chat
      </Button>
      
      <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-2">
        {chats.length === 0 ? (
          <p className="text-sidebar-foreground/60 text-sm p-2">No chats yet. Start a new chat!</p>
        ) : (
          <TooltipProvider>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 cursor-pointer group transition-colors",
                  currentChatId === chat.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs opacity-60 truncate">
                    {formatDate(chat.updatedAt)}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete chat</TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        )}
      </div>
    </aside>
  );
}
