var options = {
    name: "🌍 remove",
    description: "Permet de supprimer un channel des cannaux a vérifier",
    usage: {
        template: "remove [channel]",
        args: {
            channel: "ID"
        }
    },
    permission: ["MANAGE_CHANNELS"]
};

module.exports = {
    options: options,

    run: async (client, message, args, lang, cmdlang) => {
        if (!args[0]) return message.reply(`Veulliez spécifié l'id du channel`);

        var channelGet = message.guild.channels.cache.get(args[0]);

        if (channelGet) {
            client.libs.sql.listChannels(message.guild.id, channels => {
                if (!channels.includes(args[0])) message.reply(`Le channel n'est pas dans la liste`);
                else {
                    client.libs.sql.removeChannel(args[0], message.guild.id);
                    message.react('✅');
                }
            })
        } else {
            message.reply(`L'id du channel n'existe pas !`)
        }
    }
}