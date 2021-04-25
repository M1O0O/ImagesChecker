module.exports = (client, guild) => {
    client.libs.sql.delGuild(guild.id);
}