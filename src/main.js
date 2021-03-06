var Discord = require('discord.js'),
    fs = require('fs'),
    Enmap = require('enmap'),
    client = new Discord.Client();

require('dotenv').config();

fs.readRecursive = require('fs-readdir-recursive');

client.commands = new Discord.Collection();
client.commands = new Enmap();
client.Discord = Discord;
client.prefix = process.env.PREFIX;
client.libs = {};

fs.readdir("./libs/", (err, files) => {
    if (err) return console.error(err);
    if (!files) return;
    files.forEach(file => {
        client.libs[file.split(".")[0]] = require(`../libs/${file}`);
    });
});

fs.readRecursive("./cmds/").forEach(file => {
    if (!file.endsWith(".js")) return;
    var cmd = require(`../cmds/${file}`),
        name = file.split(".")[0];
    if (name.split("/")[1]) name = file.split("/")[1].split(".")[0];
    client.commands.set(name, cmd);
});

fs.readRecursive("./events/").forEach(event => {
    if (!event) return;
    client.on(event.split('/')[0], require(`../events/${event}`).bind(null, client));
    delete require.cache[require.resolve(`../events/${event}`)];
});

client.login(process.env.TOKEN);
