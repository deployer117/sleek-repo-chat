
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function extractRepoInfo(url: string): { owner: string; repo: string } | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== "github.com") return null;
    
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2) return null;
    
    return {
      owner: pathParts[0],
      repo: pathParts[1],
    };
  } catch (e) {
    return null;
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
