"use client"; // Required for using useState and useEffect on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "../Components/ProgressContext";
import ProgressBar from "../Components/ProgressBar";

// Final success page shown after survey completion
export default function SuccessPage() {
  const { setProgress } = useProgress();
  const [isEntering, setIsEntering] = useState(false); // Animation state
  const router = useRouter();

  // Animate entry and mark progress as 100%
  useEffect(() => {
    setProgress(100);
    setTimeout(() => {
      setIsEntering(true);
    }, 100);
  }, [setProgress]);

  // Send survey data to the backend API
  const handleSubmit = async () => {
    const income = localStorage.getItem("income");
    const employment = localStorage.getItem("employment");
    const phone = localStorage.getItem("phone");

    const data = { income, employment, phone };

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Survey submitted successfully!");
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error while submitting survey.");
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-4 py-10 transition-opacity duration-500 ${
        isEntering ? "opacity-100" : "opacity-0"
      }`}
    >
      <ProgressBar />

      {/* Animated checkmark circle */}
      <div className="flex items-center justify-center mt-16">
        <div className="w-32 h-32 rounded-full border-4 border-[#2E646A] flex items-center justify-center animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-[#2E646A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Success message */}
      <h2 className="text-3xl md:text-5xl font-semibold text-[#2E646A] text-center mt-8">
        Thanks for completing the survey!
      </h2>

      {/* Buttons */}
      <div className="flex space-x-4 mt-10">
        {/* Go back if needed */}
        <button
          onClick={() => router.back()}
          className="w-40 px-10 py-3 rounded-xl text-[#2E646A] border border-[#2E646A] text-2xl font-semibold hover:bg-[#2E646A] hover:text-white transition"
        >
          Back
        </button>

        {/* Submit to API */}
        <button
          onClick={handleSubmit}
          className="w-40 px-10 py-3 rounded-xl bg-[#2E646A] text-white text-2xl font-semibold hover:bg-[#1f4a4e] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
