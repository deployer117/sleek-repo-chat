
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Chat, Message } from "@/types/types";
import { generateId } from "@/lib/utils";
import { toast } from "sonner";

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  currentChat: Chat | null;
  setCurrentChatId: (id: string | null) => void;
  createNewChat: (repoUrl?: string) => void;
  addMessage: (content: string, role: "user" | "assistant") => void;
  deleteChat: (id: string) => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current chat from chats array
  const currentChat = chats.find(chat => chat.id === currentChatId) || null;

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setChats(parsedChats);

        // Set current chat to most recent if exists
        if (parsedChats.length > 0) {
          setCurrentChatId(parsedChats[0].id);
        }
      } catch (e) {
        console.error("Failed to parse saved chats", e);
      }
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const createNewChat = (repoUrl?: string) => {
    const newChat: Chat = {
      id: generateId(),
      title: repoUrl ? `Chat about ${repoUrl.split("/").slice(-2).join("/")}` : "New Chat",
      messages: [],
      repoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats((prevChats) => [newChat, ...prevChats]);
    setCurrentChatId(newChat.id);

    if (repoUrl) {
      setIsLoading(true);
      // Simulate a delay to represent processing the repo
      toast.loading("Processing repository...");
      
      setTimeout(() => {
        const initialMessage: Message = {
          id: generateId(),
          content: `I'm ready to help you with ${repoUrl.split("/").slice(-2).join("/")}. What would you like to know?`,
          role: "assistant",
          timestamp: new Date(),
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === newChat.id
              ? {
                  ...chat,
                  messages: [...chat.messages, initialMessage],
                  updatedAt: new Date(),
                }
              : chat
          )
        );
        setIsLoading(false);
        toast.success("Repository processed successfully!");
      }, 1500);
    }
  };

  const addMessage = async (content: string, role: "user" | "assistant") => {
    if (!currentChatId) return;

    const newMessage: Message = {
      id: generateId(),
      content,
      role,
      timestamp: new Date(),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              updatedAt: new Date(),
              // Update title if it's the first user message
              title:
                chat.messages.length === 0 && role === "user"
                  ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
                  : chat.title,
            }
          : chat
      )
    );

    // If it's a user message, generate a response
    if (role === "user") {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call to your agent
        toast.loading("Processing your request...");
        
        // Simulating a delay to represent API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const assistantResponse: Message = {
          id: generateId(),
          content: `I'm analyzing your request about "${content.slice(0, 40)}${content.length > 40 ? "..." : ""}". In a real app, this would connect to an API that processes the repo and responds accordingly.`,
          role: "assistant",
          timestamp: new Date(),
        };
        
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, assistantResponse],
                  updatedAt: new Date(),
                }
              : chat
          )
        );
        
        toast.success("Response received");
      } catch (error) {
        toast.error("Failed to get a response");
        console.error("Error getting assistant response:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteChat = (id: string) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    
    // If we're deleting the current chat, set current to the next available chat
    if (currentChatId === id) {
      const remainingChats = chats.filter((chat) => chat.id !== id);
      setCurrentChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
      toast.info("Chat deleted");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        currentChat,
        setCurrentChatId,
        createNewChat,
        addMessage,
        deleteChat,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
