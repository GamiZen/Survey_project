"use client"; // Allows dynamic rendering and transitions

import SurveyLayout from "../Components/SurveyLayout";

// Wraps the success page using the same layout as other survey pages
export default function SurveyWrapperLayout({ children }) {
  return <SurveyLayout>{children}</SurveyLayout>;
}
