
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { ChatMessageList } from "@/components/ChatMessageList";
import { MessageInput } from "@/components/MessageInput";
import { RepoUrlForm } from "@/components/RepoUrlForm";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function ChatLayout() {
  const { currentChatId, isLoading, currentChat } = useChat();

  const handleSyncWorkflow = async () => {
    if (!currentChatId || !currentChat?.repoUrl) {
      toast.error("No repository to sync");
      return;
    }

    toast.loading("Syncing workflow...");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success message
      toast.success("Workflow synced successfully!");
    } catch (error) {
      toast.error("Failed to sync workflow");
      console.error("Error syncing workflow:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}
      
      {!currentChatId ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <RepoUrlForm />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between border-b px-4 py-2">
            <h2 className="text-sm font-medium">{currentChat?.title || "Chat"}</h2>
            {currentChat?.repoUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleSyncWorkflow}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Sync Workflow
              </Button>
            )}
          </div>
          <ChatMessageList />
          <MessageInput />
        </>
      )}
    </div>
  );
}
