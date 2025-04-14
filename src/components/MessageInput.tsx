
import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/contexts/ChatContext";
import { toast } from "sonner";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const { addMessage, currentChatId, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      toast.error("Please enter a message");
      return;
    }
    
    if (!currentChatId) {
      toast.error("No chat selected");
      return;
    }

    addMessage(trimmedMessage, "user");
    setMessage("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t bg-secondary/50 p-4"
    >
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading || !currentChatId}
          className="bg-background border-secondary"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim() || isLoading || !currentChatId}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
