const https = require('https');
const querystring = require('querystring');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // DIAGNÓSTICO EN EL NAVEGADOR
  // Si falta el ID, devolvemos un error 500 explicativo al navegador
  if (!process.env.DISCORD_CLIENT_ID) {
      return res.status(500).json({
          error: "ERROR_VARIABLES_ENTORNO",
          message: "El servidor no está leyendo el archivo .env",
          diagnostico: {
              DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID ? "OK" : "FALTA/VACIO",
              DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET ? "OK" : "FALTA/VACIO",
              DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI || "FALTA",
              Ruta_Archivo: process.cwd() // Nos dirá dónde está buscando el servidor
          }
      });
  }

  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    const tokenData = await postDiscord('https://discord.com/api/oauth2/token', {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
    });

    if (tokenData.error || !tokenData.access_token) {
        // Si Discord da error, lo devolvemos al navegador para verlo
        return res.status(400).json({ 
            error: "ERROR_DISCORD_TOKEN", 
            discord_response: tokenData,
            sent_uri: process.env.DISCORD_REDIRECT_URI // Para verificar la barra /
        });
    }

    const userData = await getDiscord('https://discord.com/api/users/@me', tokenData.access_token);

    let avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';
    if (userData.avatar) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
    }

    return res.status(200).json({
      id: userData.id,
      username: userData.username,
      avatar: avatarUrl
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Funciones auxiliares

function postDiscord(url, body) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify(body);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) }
    }, (res) => {
      let data = ''; res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve({}); } });
    });
    req.on('error', reject); req.write(postData); req.end();
  });
}

function getDiscord(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname, method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }, (res) => {
      let data = ''; res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve({}); } });
    });
    req.on('error', reject); req.end();
  });
}