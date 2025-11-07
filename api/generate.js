export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const API_KEY = 'key_e4e97a12ca888d0c90305840748d1af28bab40ea5864bff60192786c3e753b05b85d8856fcbce814f57549a090ce6c5496e5e407f8b6f25932bab8bf8796bebc';
  
  try {
    const response = await fetch('https://api.runwayml.com/v1/gen2', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
