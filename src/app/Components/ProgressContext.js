"use client";

import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Pridėta būsena

  return (
    <ProgressContext.Provider
      value={{ progress, setProgress, isAnimating, setIsAnimating }} // Pridėta reikšmė
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

// Jei reikia, galite palikti ProgressBar kaip papildomą komponentą
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