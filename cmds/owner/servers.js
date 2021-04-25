var options = {
    name: "🌍 servers",
    description: "Permet de voir la liste des serveurs contenant le bot",
    usage: {
        template: "servers"
    },
    permission: null,
    owner: true
};

module.exports = {
    options: options,

    run: async (client, message, args, lang, cmdlang) => {
        var guilds = client.guilds.cache,
            msg = "";

        guilds.forEach(guild => {
            msg += `${guild.id}: **${guild.name}**\n`;
        });

        message.reply("\n" + msg);
    }
}