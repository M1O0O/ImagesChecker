var options = {
    name: "🌍 remove",
    description: "Permet de supprimer un channel des cannaux a vérifier",
    usage: {
        template: "remove [channel / this]",
        args: {
            channel: "ID ou Mention"
        }
    },
    permission: ["MANAGE_CHANNELS"]
};

module.exports = {
    options: options,

    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`Veulliez spécifié le channel`);

        if (args[0].toLowerCase() != "this") var channelGet = message.guild.channels.cache.get(args[0]);
        var channelGet = message.guild.channels.cache.get(args[0]);
        if (!channelGet) channelGet = message.guild.channels.cache.get(args[0].replace('<#', '').replace('>', ''));
        
        if (channelGet) {
            client.libs.sql.listChannels(message.guild.id, channels => {
                if (!channels.includes(channelGet.id)) message.reply(`Le channel n'est pas dans la liste`);
                else {
                    client.libs.sql.removeChannel(channelGet.id, message.guild.id);
                    message.react('✅');
                }
            })
        } else message.reply(`Le channel n'existe pas !`);
    }
}