import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question, context } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question' });

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          ...(context ? [{ role: 'system', content: context }] : []),
          { role: 'user', content: question }
        ],
        temperature: 0.7
      })
    });

    const data = await apiRes.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, I couldn't find an answer.";
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Failed to contact OpenAI API' });
  }
} 