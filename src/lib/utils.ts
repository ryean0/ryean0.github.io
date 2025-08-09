// Filename: src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function for conditionally merging Tailwind classes (Best Practice)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}