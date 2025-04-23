"use client";
import SurveyLayout from "../Components/SurveyLayout";

// Wraps all survey step pages inside a shared layout (e.g., with consistent spacing, background)
export default function SurveyWrapperLayout({ children }) {
  return <SurveyLayout>{children}</SurveyLayout>;
}
