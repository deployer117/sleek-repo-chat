
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/contexts/ChatContext";
import { extractRepoInfo } from "@/lib/utils";
import { toast } from "sonner";
import { GitBranch } from "lucide-react";

export function RepoUrlForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const { createNewChat } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast.error("Please enter a repository URL");
      return;
    }
    
    const repoInfo = extractRepoInfo(repoUrl);
    if (!repoInfo) {
      toast.error("Invalid GitHub repository URL");
      return;
    }
    
    createNewChat(repoUrl);
    setRepoUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-md border border-secondary/80 bg-card/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Connect to a Repository
          </CardTitle>
          <CardDescription>
            Enter a GitHub repository URL to start analyzing the code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Example: https://github.com/facebook/react
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Start Chat
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
