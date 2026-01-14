export default async function handler(req, res) {
  // 1. CORS Headers (Mejorado)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // 2. Validación de Entorno rápida
  const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = process.env;
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
    return res.status(500).json({ error: "Configuración de servidor incompleta" });
  }

  const { code } = req.body; // Cambiado a POST body para mayor seguridad que query params
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    // 3. Intercambio de Token usando Fetch nativo
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error(tokenData.error_description || 'Error en Discord Token');

    // 4. Obtener datos del usuario
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userResponse.json();
    if (!userResponse.ok) throw new Error('Error obteniendo perfil de Discord');

    // 5. Formatear Avatar (Simplificado)
    const avatar = userData.avatar 
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${userData.discriminator % 5}.png`;

    return res.status(200).json({
      id: userData.id,
      username: userData.username,
      avatar
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(error.message.includes('Discord') ? 400 : 500).json({ 
      error: 'Falló la autenticación',
      message: error.message 
    });
  }
}