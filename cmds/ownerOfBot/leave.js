var options = {
    name: "🌍 leave",
    description: "Faire leave d'une guild le bot",
    usage: {
        template: "leave [guild_id]",
        args: {
            guild_id: "ID"
        }
    },
    permission: null,
    owner: true
};

module.exports = {
    options: options,

    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`Veulliez spécifié l'id du channel`);

        var guildGet = client.guilds.cache.get(args[0]);
        
        if (guildGet) {
            guildGet.leave();
            client.libs.sql.delGuild(guildGet.id);
            message.react('✅');
        } else {
            message.reply(`L'id du server n'existe pas !`);
        }
    }
}