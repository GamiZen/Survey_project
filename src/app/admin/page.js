"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

  useEffect(() => {
    if (authorized) {
      fetch("/api/survey")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [authorized]);

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

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-10 text-[#2E646A]">
      <h1 className="text-4xl font-bold mb-6 text-center">Survey Responses</h1>
      <div className="overflow-x-auto">
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
            {data.map((entry, index) => (
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
