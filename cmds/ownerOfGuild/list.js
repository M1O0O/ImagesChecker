var options = {
    name: "🌍 list",
    description: "Permet de voir quels channels seront vérifier",
    usage: {
        template: "list"
    },
    permission: ["MANAGE_CHANNELS"]
}, { MessageEmbed } = require('discord.js');

module.exports = {
    options: options,

    run: async (client, message, args) => {
        client.libs.sql.listChannels(message.guild.id, channels => {
            channels = JSON.parse(channels);
            
            var embed = new MessageEmbed()
                .setTitle('Voici les cannaux qui seront vérifier')

            channels.forEach(channel => {
                var channelGet = message.guild.channels.cache.get(channel);

                if (channelGet) embed.addField(channelGet.name, channel, true);
                else client.libs.sql.removeChannel(channel, message.guild.id);
            });

            message.reply(embed);
        });
    }
}