module.exports = (client) => {
    client.user.setPresence({
        activity: {
            name: `${client.guilds.cache.size} guilds`,
            type: "WATCHING"
        }, status: 'online'
    });
}