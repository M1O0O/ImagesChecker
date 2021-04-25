var options = {
    name: "🌍 help",
    description: "Permet de voir l'aide de commande",
    usage: {
        template: "help"
    },
    permission: null
}, { MessageEmbed } = require('discord.js');

module.exports = {
    options: options,

    run: async (client, message, args) => {
        var embed = new MessageEmbed()

        client.commands.forEach(cmd => {
            var name = cmd.options.name,
                description = cmd.options.description,
                usage = cmd.options.usage.template,
                permissions = cmd.options.permission;

            if (cmd.options.name.includes("help") || (cmd.options.owner)) return;
            if (!permissions) permissions = "@everyone";

            embed.setTitle('Liste des commandes')
                .addFields(
                    { name: "🍡 Nom", value: name.slice(2), inline: true },
                    { name: "💦 Permissions", value: permissions, inline: true },
                    { name: "🦴 Utilisation", value: client.prefix + usage, inline: true },
                    { name: "🦾 Description", value: description, inline: true },
                    { name: '\u200B', value: '\u200B' },
                );
        });

        message.reply(embed);
    }
}