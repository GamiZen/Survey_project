"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "../../Components/ProgressContext";
import ProgressBar from "../../Components/ProgressBar";

export default function PhonePage() {
  const { setProgress, setIsAnimating } = useProgress();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Load saved phone number from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("phone");
    if (saved) setPhoneNumber(saved);
  }, []);

  // Save valid phone to localStorage
  useEffect(() => {
    const numeric = phoneNumber.replace(/\D/g, "");
    if (numeric && isValid) {
      localStorage.setItem("phone", phoneNumber);
    }
  }, [phoneNumber, isValid]);

  useEffect(() => {
    setProgress(66);
  }, [setProgress]);

  const handleNext = () => {
    if (phoneNumber && isValid) {
      setIsAnimating(true);
      setIsExiting(true);
    }
  };

  const handleBack = () => {
    if (!isValid) {
      localStorage.removeItem("phone");
    }
    router.back();
  };

  const handleExitComplete = () => {
    setIsAnimating(false);
    router.push("/success");
  };

  // Handle phone input formatting and validation
  const handleInputChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) input = input.slice(0, 10);

    let formatted = input;
    if (input.length > 6) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
    } else if (input.length > 3) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 0) {
      formatted = `(${input}`;
    }

    setPhoneNumber(formatted);

    const isValidUSNumber = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(input);
    setIsValid(isValidUSNumber || input === "");
  };

  const handleBlur = () => {
    if (!isValid) {
      localStorage.removeItem("phone");
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key="phone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-4 py-10"
        >
          <ProgressBar />

          <h2 className="text-3xl md:text-5xl font-semibold text-[#2E646A] text-center mb-8">
            Enter your US phone number
          </h2>

          {/* Styled phone input with floating label */}
          <div className="w-full max-w-md relative">
            <label
              className={`absolute left-4 transition-all duration-300 bg-[#F7F7F7] px-1 ${
                isFocused || phoneNumber ? "text-sm top-[-10px] z-10" : "text-lg top-3"
              } text-gray-600`}
            >
              Phone
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                handleBlur();
              }}
              className={`w-full px-4 py-3 border ${
                isValid ? "border-gray-300" : "border-red-500"
              } rounded-lg text-lg text-black placeholder-transparent focus:outline-none focus:ring-2 ${
                isValid ? "focus:ring-[#2E646A]" : "focus:ring-red-500"
              }`}
            />
            {!isValid && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid US phone number.
              </p>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-4 mt-12">
            <button
              onClick={handleBack}
              className="px-10 py-3 rounded-xl text-[#2E646A] border border-[#2E646A] text-2xl font-semibold hover:bg-[#2E646A] hover:text-white transition"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!phoneNumber || !isValid}
              className={`px-10 py-3 rounded-xl text-white text-2xl font-semibold transition ${
                phoneNumber && isValid
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
