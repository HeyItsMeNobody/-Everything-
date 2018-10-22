const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config/keys.json');

bot.on('ready', () => {
    console.log(`Discord "module" loaded UwU`);
    bot.guilds.forEach(function(guild) {
        console.log(guild.name);
    });
});

bot.login(config.discord.discordToken)

module.exports = bot;