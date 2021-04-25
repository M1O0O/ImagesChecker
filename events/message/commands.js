var lang = require('../../src/lang.json');

module.exports = (client, message) => {
    if (message.author.bot || message.content.indexOf(client.prefix) !== 0) return;

    var args = message.content.slice(client.prefix.length).trim().split(/ +/g),
        command = args.shift().toLowerCase(),
        cmd = client.commands.get(command);

    if (!cmd || message.channel.type != "text") return;

    if (!cmd.options.owner) if (cmd.options.permission == null || cmd.options.permission.some(perm => message.member.hasPermission(perm))) return cmd.run(client, message, args, lang, lang.cmds[command]);
    if (cmd.options.owner && message.author.id == "696760040140570675") return cmd.run(client, message, args, lang, lang.cmds[command]);
}