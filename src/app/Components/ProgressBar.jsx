"use client";
import { useProgress } from "./ProgressContext";

export default function ProgressBar() {
  const { progress } = useProgress();

  return (
    <div className="relative z-50 w-full flex justify-center" style={{ top: "-40px" }}>
      <div
        className="h-[40px] w-[1016px] bg-gray-200 rounded-[30px] overflow-hidden shadow-inner"
      >
        <div
          className="h-full bg-[#2E646A] transition-all duration-700 ease-in-out rounded-[30px]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
