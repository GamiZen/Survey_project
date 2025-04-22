// app/api/survey/route.ts
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  console.log("Received survey:", data);

  // Čia galima būtų išsaugoti į DB ar pan.

  return NextResponse.json({ message: "Success" });
}
