const router = require('express').Router();
const randomHexColor = require('random-hex-color');
const bodyParser = require('body-parser');
const discord = require('../exports/discordBot.js');
const request = require('request');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/discord', (req, res) => {
    res.render('discord', {randomColor: randomHexColor()});
});

router.get('/discord/guilds', (req, res) => {
    discord.guilds.forEach(function(guild) {
        res.send(`${guild.name}<br/>`);
    });
})

router.post('/discord-sendmessage', (req, res) => {
    let channelID = req.body.channelID;
    let message = req.body.message;
    try {
        discord.channels.get(channelID).send(message);
        res.redirect('/discord')
    }
    catch (err) {
        res.send(`Channel with the id ${channelID} does not exist UWU`)
    }
});

router.post('/discord-sendinsult', (req, res) => {
    request('https://insult.mattbas.org/api/insult.txt', function(error, response, body) {
        let channelID = req.body.channelID;
        try {
            discord.channels.get(channelID).send(body);
            res.redirect('/discord')
        }
        catch (err) {
            res.send(`Channel with the id ${channelID} does not exist UWU`)
        }
        console.log(body)
    });
});

module.exports = router;