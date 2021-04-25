const { MessageEmbed } = require('discord.js');

var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    regex = new RegExp(expression);

module.exports = (client, message) => {
    if (message.author.bot) return;
    client.libs.sql.listChannels(message.guild.id, channels => {
        channels = JSON.parse(channels);

        if (!channels.includes(message.channel.id)) return;

        var urls = {},
            uriCount = 0;

        if (message.content.match(regex)) {
            async function getUrls() {
                for (const uri of message.content.match(regex)) {
                    await client.libs.verifyImages(uri, async results => {
                        urls[uri] = [];

                        await Object.assign(urls[uri], results);

                        urls["msgURL"] = message.url;

                        if (uriCount >= message.content.match(regex).length - 1) next();
                    });

                    await uriCount++
                }
            }

            getUrls();
        }

        if (message.attachments.first()) client.libs.verifyImages(message.attachments.first()["url"], results => {
            var uri = message.attachments.first()["url"];
            urls[uri] = [];

            Object.assign(urls[uri], results);
            urls["msgURL"] = message.url;

            next();
        });

        function next() {
            var countWebSites = Object.values(urls)[0].length;
            if (!(countWebSites > 0)) return;
            message.react('⚠️');

            var embed = new MessageEmbed()
                .setTitle('⚠️ Alert !')
                .setDescription(`Un message ([Celui-ci](${message.url})) contient une image provenant d\'un/de site(s) internet !`)
                .setColor('#fca503')

            for (const WebSite of Object.values(urls)[0]) {
                embed.addField(WebSite.title, WebSite.url, true);
            }

            message.channel.send(embed);
        }
    });
}