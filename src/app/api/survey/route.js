// src/app/api/survey/route.js
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

export async function POST(req) {
  try {
    const body = await req.json();
    let existingData = [];

    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(fileData);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    existingData.push({ ...body, timestamp: new Date().toISOString() });
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(fileData);
    return new Response(JSON.stringify(json), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
