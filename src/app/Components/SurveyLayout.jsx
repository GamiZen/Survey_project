// Basic layout wrapper for survey pages with consistent background styling
export default function SurveyLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      {/* Render all child survey pages inside layout */}
      {children}
    </div>
  );
}
