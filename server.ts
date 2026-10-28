import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini client (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API: AI-Powered Listing Enhancer & Nigerian Landmark Advisor
app.post('/api/ai/enhance-listing', async (req, res) => {
  try {
    const { title, category, condition, location, notes } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        description: `${title}. Kept in ${condition.toLowerCase()} condition. Available freely for any neighbor in ${location} who needs it.`,
        suggestedLandmarks: [`Popular public landmark in ${location}`, `Local fuel station or supermarket front`, `Estate security gate`],
        safetyTip: 'Meet during daylight hours at a recognizable public landmark or arrange an authorized dispatch rider.'
      });
    }

    const prompt = `You are a helpful assistant for KeshoShare, a community mutual-aid and free item sharing platform in Nigeria (tagline: "Give today. Make tomorrow better.").
The user is giving away this item for free:
- Title: "${title}"
- Category: "${category}"
- Condition: "${condition}"
- Location: "${location}"
- Initial notes: "${notes || 'None'}"

Please generate a JSON object with:
1. "description": A warm, neighborly, concise 2-3 sentence description emphasizing sharing and community care in Nigeria.
2. "suggestedLandmarks": An array of 3 realistic, safe public pickup meeting landmarks or collection arrangements specific or customary to ${location} (e.g. known estate gates, busy BRT stops, shopping malls, well-lit fuel stations, or dispatch courier note).
3. "safetyTip": 1 practical local safety reminder (e.g. daylight meeting, bring a companion, inspect item before parting).

Format strictly as JSON without extra markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Gemini enhance-listing error:', error);
    return res.status(200).json({
      description: `Available freely for anyone who can put it to good use. Clean and ready for pickup.`,
      suggestedLandmarks: ['Public landmark in neighborhood', 'Estate security gate handover', 'Dispatch bike pickup'],
      safetyTip: 'Coordinate during daylight hours in an open, public area.'
    });
  }
});

// API: AI-Powered Gratitude Message Generator
app.post('/api/ai/compose-gratitude', async (req, res) => {
  try {
    const { itemTitle, giverName, personalImpact } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        gratitudeMessage: `Dear ${giverName}, thank you so much for the ${itemTitle}! It made such a genuine difference for us. Blessings for your kindness and generosity on KeshoShare.`
      });
    }

    const prompt = `You are an assistant for KeshoShare in Nigeria.
A recipient wants to send a heartfelt thank-you gratitude message to the giver who gave them an item for free.
- Item: "${itemTitle}"
- Giver: "${giverName}"
- How it helped / Impact: "${personalImpact}"

Write a warm, sincere, culturally authentic thank-you note (2-3 sentences) suitable for the KeshoShare Gratitude Wall, expressing deep appreciation and communal warmth. Return JSON:
{ "gratitudeMessage": "..." }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Gemini compose-gratitude error:', error);
    return res.status(200).json({
      gratitudeMessage: `Dear ${req.body.giverName || 'Friend'}, thank you so much for the ${req.body.itemTitle || 'gift'}! Your kindness means the world to our family. Bless your generous heart!`
    });
  }
});

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'KeshoShare' });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KeshoShare server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
