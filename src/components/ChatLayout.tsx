
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { ChatMessageList } from "@/components/ChatMessageList";
import { MessageInput } from "@/components/MessageInput";
import { RepoUrlForm } from "@/components/RepoUrlForm";
import { Loader2 } from "lucide-react";

export function ChatLayout() {
  const { currentChatId, isLoading } = useChat();

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
          <ChatMessageList />
          <MessageInput />
        </>
      )}
    </div>
  );
}
