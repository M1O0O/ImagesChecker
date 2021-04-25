var options = {
    name: "🌍 add",
    description: "Permet d'ajouter un channel a la vérification.",
    usage: {
        template: "add [channel]",
        args: {
            channel: "ID"
        }
    },
    permission: ["MANAGE_CHANNELS"],
    owner: true
};

module.exports = {
    options: options,

    run: async (client, message, args, lang, cmdlang) => {
        if (!args[0]) return message.reply(`Veulliez spécifié l'id du channel`);

        var channelGet = message.guild.channels.cache.get(args[0]);

        if (channelGet) {
            client.libs.sql.listChannels(message.guild.id, channels => {
                if (channels.includes(args[0])) message.reply(`Le channel est déjà ajouter`);
                else {
                    client.libs.sql.addChannel(args[0], message.guild.id);
                    message.react('✅');
                }
            })
        } else {
            message.reply(`L'id du channel n'existe pas !`)
        }
    }
}