// API route for handling survey submission and fetching responses
import { promises as fs } from 'fs';
import path from 'path';

// Location of the data file (will be created if not found)
const filePath = path.join(process.cwd(), 'data.json');

// Handle POST request: store new survey submission
export async function POST(req) {
  try {
    const body = await req.json(); // Parse request body
    let existingData = [];

    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(fileData); // Load existing data
    } catch (err) {
      if (err.code !== 'ENOENT') throw err; // If file doesn't exist, ignore
    }

    // Add new entry with timestamp
    existingData.push({ ...body, timestamp: new Date().toISOString() });
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2)); // Save

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

// Handle GET request: return all saved responses
export async function GET() {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(fileData);
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
