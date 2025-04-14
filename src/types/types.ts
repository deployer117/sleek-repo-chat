
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  repoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
