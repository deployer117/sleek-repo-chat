
import React, { useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export function ChatMessageList() {
  const { chats, currentChatId } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-80">
          <Bot size={40} className="text-primary" />
          <h3 className="text-xl font-medium">Repository Chat Assistant</h3>
          <p className="text-muted-foreground max-w-md">
            Ask questions about your repository, get code explanations, architecture insights, and more.
          </p>
        </div>
      )}

      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className="flex items-start gap-3 animate-slide-in" 
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <Avatar className={message.role === "assistant" ? "bg-primary" : "bg-secondary"}>
            {message.role === "assistant" ? (
              <Bot className="h-5 w-5" />
            ) : (
              <User className="h-5 w-5" />
            )}
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {message.role === "assistant" ? "Assistant" : "You"}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(message.timestamp)}
              </span>
            </div>

            <div className="text-sm whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
