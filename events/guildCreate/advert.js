const { MessageEmbed } = require("discord.js"),
    packages = require('../../package.json');

module.exports = (client, guild) => {
    var systemChannel = guild.systemChannel,
        packagesLibraryMsg = "",
        embed = new MessageEmbed()

    for (const [key, value] of Object.entries(packages.dependencies)) {
        packagesLibraryMsg += `> ${key}${value}\n`
    }

    embed.setTitle('Première utilisation')
        .setDescription(`Hey, merci de soutenir le bot en l'ajoutant sur votre serveur, pour voir les commandes faite \`*help\``)
        .addField("🍡 Library's", packagesLibraryMsg, true)
        .addField("🦾 Author", "M1000#0008", true)
        .addField("🥖 Prefix", client.prefix, true)
        .setColor('#870000')

    if (systemChannel) systemChannel.send(embed);
    else guild.owner.send(embed);
}