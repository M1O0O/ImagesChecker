const CronJob = require('cron').CronJob;

module.exports = (client) => {
    new CronJob('0 */5 * * * *', function () {
        client.user.setPresence({
            activity: {
                name: `${client.guilds.cache.size} guilds`,
                type: "WATCHING"
            }, status: 'online'
        });
    }).start();
}