var options = {
    name: "🌍 add",
    description: "Permet d'ajouter un channel a la vérification.",
    usage: {
        template: "add [channel / this]",
        args: {
            channel: "ID ou Mention ou this"
        }
    },
    permission: ["MANAGE_CHANNELS"]
};

module.exports = {
    options: options,

    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`Veulliez spécifié le channel`);

        if (args[0].toLowerCase() != "this") var channelGet = message.guild.channels.cache.get(args[0]);
        else var channelGet = message.channel;
        if (!channelGet) channelGet = message.guild.channels.cache.get(args[0].replace('<#', '').replace('>', ''));
        
        if (channelGet) {
            client.libs.sql.listChannels(message.guild.id, channels => {
                if (channels.includes(channelGet.id)) message.reply(`Le channel est déjà ajouter`);
                else {
                    client.libs.sql.addChannel(channelGet.id, message.guild.id);
                    message.react('✅');
                }
            });
        } else message.reply(`Le channel n'existe pas !`);
    }
}