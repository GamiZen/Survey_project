"use client"; // Enables client-side interactivity

import { motion } from "framer-motion";
import Link from "next/link";

// Landing page that welcomes users and leads to the start of the survey
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-6">
      <motion.div
        className="rounded-2xl p-12 md:p-20 w-full max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Title */}
        <h1 className="text-[#2E646A] text-4xl md:text-6xl font-bold mb-8 leading-tight">
          Quick Survey<br />for Financial Insights
        </h1>

        {/* Subtitle */}
        <p className="text-[#2E646A] text-lg md:text-2xl mb-10">
          Please take a few moments to complete this short survey
        </p>

        {/* Start button leading to the first question */}
        <Link href="/survey/Income" passHref>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2E646A] hover:bg-[#234f53] text-white px-8 py-4 rounded-xl font-semibold text-lg md:text-xl transition duration-300"
          >
            Start Survey
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
