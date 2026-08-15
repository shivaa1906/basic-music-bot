// Parse LAVALINK_HOST into host/port/secure, supporting full URLs
// like "https://lavalink.onrender.com" or "wss://example.com:443"
function parseLavalinkHost(rawHost, envPort, envSecure) {
    let host = (rawHost || "127.0.0.1").trim();
    let port = parseInt(envPort, 10);
    let secure = envSecure === "true";

    // If host is a full URL, derive all settings
    if (/^[a-z]+:\/\//i.test(host)) {
        try {
            const url = new URL(host);
            if (url.protocol === "wss:" || url.protocol === "https:") secure = true;
            if (url.protocol === "ws:" || url.protocol === "http:") secure = false;
            if (url.port) port = parseInt(url.port, 10);
            host = url.hostname;
        } catch (e) {
            // Fall through to default handling
        }
    }

    if (!port || isNaN(port)) port = secure ? 443 : 2333;

    return { host, port, secure };
}

const lavalink = parseLavalinkHost(
    process.env.LAVALINK_HOST,
    process.env.LAVALINK_PORT,
    process.env.LAVALINK_SECURE
);

module.exports = {
    prefix: process.env.PREFIX || "!",
    // Developer user IDs allowed to use restricted commands (e.g., volume)
    developerIds: (process.env.DEVELOPER_IDS || "")
        .split(",")
        .map(id => id.trim())
        .filter(id => id.length > 0),
    nodes: [{
        host: lavalink.host,
        password: process.env.LAVALINK_PASSWORD || "your-lavalink-password",
        port: lavalink.port,
        secure: lavalink.secure,
        name: process.env.LAVALINK_NAME || "Main Node"
    }],
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID || "your-spotify-client-id",
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "your-spotify-client-secret"
    },
    botToken: process.env.BOT_TOKEN || "your-token-here",
    embedColor: process.env.EMBED_COLOR || "#0061ff",
    reconnect: {
        maxAttempts: parseInt(process.env.RECONNECT_MAX_ATTEMPTS, 10) || 5,
        initialDelay: parseInt(process.env.RECONNECT_INITIAL_DELAY, 10) || 5000,
        maxDelay: parseInt(process.env.RECONNECT_MAX_DELAY, 10) || 60000
    }
};