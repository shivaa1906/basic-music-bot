module.exports = {
    prefix: process.env.PREFIX || "!",
    // Developer user IDs allowed to use restricted commands (e.g., volume)
    developerIds: (process.env.DEVELOPER_IDS || "")
        .split(",")
        .map(id => id.trim())
        .filter(id => id.length > 0),
    nodes: [{
        host: process.env.LAVALINK_HOST || "127.0.0.1",
        password: process.env.LAVALINK_PASSWORD || "your-lavalink-password",
        port: parseInt(process.env.LAVALINK_PORT, 10) || 2333,
        secure: process.env.LAVALINK_SECURE === "true",
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