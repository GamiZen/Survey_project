"use client"; // Required for using React hooks in context

import { createContext, useContext, useState } from "react";

// Create a context to manage survey progress
const ProgressContext = createContext();

// Context provider to wrap around components that need progress state
export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(0); // Completion % (0-100)
  const [isAnimating, setIsAnimating] = useState(false); // Optional animation state

  return (
    <ProgressContext.Provider value={{ progress, setProgress, isAnimating, setIsAnimating }}>
      {children}
    </ProgressContext.Provider>
  );
}

// Custom hook to access progress state
export function useProgress() {
  return useContext(ProgressContext);
}

// Optional reusable top sticky progress bar component (not used if custom one is imported separately)
export function ProgressBar() {
  const { progress } = useProgress();

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="h-2 bg-gray-200">
        <div
          className="h-full bg-[#2E646A] transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
