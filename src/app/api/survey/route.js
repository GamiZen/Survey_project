// src/app/api/survey/route.js
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json(); // Gauti JSON iš frontend
    const filePath = path.join(process.cwd(), 'data.json');

    // Patikrink ar failas egzistuoja
    let existingData = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(fileData);
    } catch (err) {
      // Jei nėra failo – paliekam tuščią masyvą
      if (err.code !== 'ENOENT') throw err;
    }

    // Pridedam naujus duomenis
    existingData.push({
      ...body,
      timestamp: new Date().toISOString(),
    });

    // Įrašom atnaujintus duomenis
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
