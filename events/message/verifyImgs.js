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
            client.libs.sql.getSettings(message.guild.id, settings => {
                var countWebSites = Object.values(urls)[0].length;
                if (!(countWebSites > 0)) return;

                var embed = new MessageEmbed()
                    .setAuthor(`${message.author.tag} ( ${message.author.id} )`, message.author.avatarURL(), null)
                    .setColor('#fca503')

                if (settings.delete) embed.setDescription(`Un message contient une image provenant d\'un/de site(s) internet(s) !`)
                else {
                    message.react('⚠️');
                    embed.setDescription(`Un message ([Celui-ci](${message.url})) contient une image provenant d\'un/de site(s) internet !`);
                }

                for (const WebSite of Object.values(urls)[0]) {
                    embed.addField(WebSite.title, WebSite.url, true);
                }

                if (settings.log_channel) {
                    var channel = message.guild.channels.cache.get(settings.log_channel);

                    if (!channel) {
                        client.libs.sql.changeLogChannel(message.guild.id, null);
                        message.channel.send(embed);
                    } else channel.send(embed);

                } else message.channel.send(embed);

                if (settings.delete) message.delete();
            });
        }
    });
}