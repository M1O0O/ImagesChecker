var options = {
    name: "🌍 list",
    description: "Permet de voir quels channels seront vérifier",
    usage: {
        template: "settings [params]",
        args: {
            params: {
                "log_channel": "> Permet de modifier le channel où sera envoyer l'avertissement.",
                "autoDelete": "> Permet de supprimer ou non le essage si il est sur internet."
            }
        }
    },
    permission: ["MANAGE_CHANNELS"]
}, { MessageEmbed } = require('discord.js');

module.exports = {
    options: options,

    run: async (client, message, args) => {
        var embed = new MessageEmbed()
            .setTitle('👻 Settings');

        switch (args[0]) {
            case "log_channel":
                if (!args[1]) return message.reply(`Veulliez spécifié le channel (\`same\` = le channel où sera envoyé l'image)`);

                var channelGet = message.guild.channels.cache.get(args[1]);
                if (!channelGet) channelGet = message.guild.channels.cache.get(args[1].replace('<#', '').replace('>', ''));

                if (channelGet) {
                    message.react('✅');
                    client.libs.sql.changeLogChannel(message.guild.id, channelGet.id);
                    return;
                } else if (args[1].toLowerCase() == "same") {
                    message.react('✅');
                    client.libs.sql.changeLogChannel(message.guild.id, null);
                    return;
                } else return message.reply(`Le channel n'existe pas !`);

                break;
            case "autoDelete":
                if (args[1]) var stat = args[1].toLowerCase();

                if (stat) {
                    if (stat == "true" || stat == "1") {
                        message.react('✅');
                        client.libs.sql.changeDeleteStat(message.guild.id, 1);
                        return;
                    } else if (stat == "false" || stat == "0") {
                        message.react('✅');
                        client.libs.sql.changeDeleteStat(message.guild.id, 0);
                        return;
                    } else return message.reply("l'état doit être \"true\" ou \"false\"");
                } else {
                    message.reply("merci de préciser le nouvel état (True/False)");
                    return;
                }

                break;
            default:
                for (const [key, value] of Object.entries(options.usage.args.params)) {
                    embed.addField(key, value, true)
                }

                break;
        }

        message.reply(embed);
    }
}