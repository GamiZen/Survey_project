"use client"; // Enables client-side rendering
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

// Admin dashboard page to view, filter, and export survey responses
export default function AdminPage() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(""); // Admin password input
  const [authorized, setAuthorized] = useState(false); // Auth state
  const [incomeFilter, setIncomeFilter] = useState("All");
  const [employmentFilter, setEmploymentFilter] = useState("All");

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

  // Fetch survey data if authorized
  useEffect(() => {
    if (authorized) {
      fetch("/api/survey")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [authorized]);

  // Show login screen if not authorized
  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl text-[#2E646A] mb-4">Enter admin password</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg mb-4 text-lg"
        />
        <button
          onClick={() => {
            if (input === correctPassword) setAuthorized(true);
            else alert("Incorrect password");
          }}
          className="px-6 py-2 bg-[#2E646A] text-white rounded-lg hover:bg-[#1f4a4e] transition"
        >
          Login
        </button>
      </div>
    );
  }

  // Apply filters
  const filteredData = data.filter((entry) => {
    return (
      (incomeFilter === "All" || entry.income === incomeFilter) &&
      (employmentFilter === "All" || entry.employment === employmentFilter)
    );
  });

  // Prepare data for income chart
  const incomeStats = {};
  filteredData.forEach(({ income }) => {
    incomeStats[income] = (incomeStats[income] || 0) + 1;
  });
  const chartData = Object.entries(incomeStats).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-10 text-[#2E646A]">
      <h1 className="text-4xl font-bold mb-6 text-center">Survey Responses</h1>

      {/* Export to CSV & filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => {
            // Generate CSV content
            const rows = [["Income", "Employment", "Phone", "Timestamp"]];
            filteredData.forEach((e) => {
              rows.push([e.income, e.employment, e.phone, e.timestamp]);
            });
            const csv = rows.map((r) => r.join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "survey_data.csv";
            link.click();
          }}
          className="bg-[#2E646A] text-white px-4 py-2 rounded-md hover:bg-[#1f4a4e]"
        >
          Export CSV
        </button>

        {/* Income filter dropdown */}
        <select
          value={incomeFilter}
          onChange={(e) => setIncomeFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option>All</option>
          <option>$0</option>
          <option>&lt;$20,000</option>
          <option>$20,000–$40,000</option>
          <option>$40,000–$80,000</option>
          <option>&gt;$80,000</option>
        </select>

        {/* Employment filter dropdown */}
        <select
          value={employmentFilter}
          onChange={(e) => setEmploymentFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option>All</option>
          <option>Full time</option>
          <option>Part time</option>
          <option>Self-employed</option>
          <option>Retired</option>
          <option>Other</option>
        </select>
      </div>

      {/* Income chart */}
      <h3 className="text-2xl font-semibold my-6">Income Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#2E646A" />
        </BarChart>
      </ResponsiveContainer>

      {/* Data table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full text-left border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-[#2E646A] text-white">
              <th className="p-4 border border-gray-300">Income</th>
              <th className="p-4 border border-gray-300">Employment</th>
              <th className="p-4 border border-gray-300">Phone</th>
              <th className="p-4 border border-gray-300">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-4 border border-gray-300">{entry.income}</td>
                <td className="p-4 border border-gray-300">{entry.employment}</td>
                <td className="p-4 border border-gray-300">{entry.phone}</td>
                <td className="p-4 border border-gray-300">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
