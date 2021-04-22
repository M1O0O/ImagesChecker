module.exports = (client) => {
    var cronJobs = require('../../src/cronjob');
    cronJobs(client);
}