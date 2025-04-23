"use client"; // Enables client-side rendering

import { useProgress } from "./ProgressContext";

// Full-width progress bar that displays current progress percentage
export default function ProgressBar() {
  const { progress } = useProgress(); // Get progress value from context

  return (
    <div className="relative z-50 w-full flex justify-center" style={{ top: "-40px" }}>
      <div className="h-[40px] w-[1016px] bg-gray-200 rounded-[30px] overflow-hidden shadow-inner">
        {/* Animated progress fill */}
        <div
          className="h-full bg-[#2E646A] transition-all duration-700 ease-in-out rounded-[30px]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
