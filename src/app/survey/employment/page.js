"use client"; // Required for client-side state and effects

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProgress } from "../../Components/ProgressContext";
import ProgressBar from "../../Components/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

export default function EmploymentPage() {
  const { setProgress } = useProgress();
  const [selected, setSelected] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Restore saved employment selection from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("employment");
    if (saved) setSelected(saved);
  }, []);

  // Save to localStorage when selection changes
  useEffect(() => {
    if (selected) {
      localStorage.setItem("employment", selected);
    }
  }, [selected]);

  // Set progress bar to 33%
  useEffect(() => {
    setProgress(33);
  }, [setProgress]);

  const handleNext = () => {
    if (selected) {
      setIsExiting(true); // Trigger exit animation
    }
  };

  const handleExitComplete = () => {
    router.push("/survey/phone"); // Navigate after animation completes
  };

  const options = [
    "Full time",
    "Part time",
    "Self-employed",
    "Retired",
    "Other",
  ];

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key="employment"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-4 py-10"
        >
          <ProgressBar />

          <h2 className="text-3xl md:text-5xl font-semibold text-[#2E646A] text-center mb-8">
            What is your employment status?
          </h2>

          {/* Radio options */}
          <div className="space-y-6 w-full max-w-md">
            {options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="employment"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                  className="w-5 h-5 text-[#2E646A] focus:ring-[#2E646A]"
                />
                <span className="text-lg text-black group-hover:text-[#2E646A] transition">
                  {option}
                </span>
              </label>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-4 mt-12">
            <button
              onClick={() => router.back()}
              className="px-10 py-3 rounded-xl text-[#2E646A] border border-[#2E646A] text-2xl font-semibold hover:bg-[#2E646A] hover:text-white transition"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selected}
              className={`px-10 py-3 rounded-xl text-white text-2xl font-semibold transition ${
                selected
                  ? "bg-[#2E646A] hover:bg-[#1f4a4e]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
