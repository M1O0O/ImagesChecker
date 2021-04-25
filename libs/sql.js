require('dotenv').config();

var mysql = require('mysql'),
    connection = mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        port: process.env.SQL_PORT,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB,
        charset: 'utf8mb4_bin',
        supportBigNumbers: true
    });

connection.connect(function (err) {
    if (err) return console.error('error connecting: ' + err.stack);
    console.log(`[SQL] - connected as id ${connection.threadId}`);
    connection.query("SET wait_timeout=31536000;");
});

exports.listChannels = function (server, callback) {
    connection.query("SELECT * FROM `servers` WHERE `guild` = ?", [server], function (error, results, fields) {
        if (error) console.log(error);
        if (!results[0]){
            exports.addGuild(server);
            return callback("[]");
        }
        callback(results[0].channelToCheck);
    });
};

exports.addGuild = function (server) {
    connection.query("INSERT INTO `servers`(`guild`, `channelToCheck`) VALUES (?, '[]')", [server], function (error, results, fields) {
        if (error) console.log(error);
    });
};

exports.removeChannel = function (channelToRemove, server) {
    connection.query("SELECT * FROM `servers` WHERE `guild` = ?", [server], function (error, results, fields) {
        if (error) console.log(error);

        var channelsAfter = JSON.parse(results[0].channelToCheck);

        var index = channelsAfter.indexOf(channelToRemove);

        if (index > -1) {
            channelsAfter.splice(index, 1);
        }

        connection.query("UPDATE `servers` SET `channelToCheck` = ? WHERE `guild` = ?", [JSON.stringify(channelsAfter), server], function (error, results, fields) {
            if (error) console.log(error);
        });
    });
};

exports.addChannel = function (channelToAdd, server) {
    connection.query("SELECT * FROM `servers` WHERE `guild` = ?", [server], function (error, results, fields) {
        if (error) console.log(error);

        var channelsAfter = JSON.parse(results[0].channelToCheck);
        channelsAfter.push(channelToAdd);

        connection.query("UPDATE `servers` SET `channelToCheck` = ? WHERE `guild` = ?", [JSON.stringify(channelsAfter), server], function (error, results, fields) {
            if (error) console.log(error);
        });
    });
};

exports.delGuild = function (server) {
    connection.query("DELETE FROM `servers` WHERE `guild` = ?", [server], function (error, results, fields) {
        if (error) console.log(error);
    });
};