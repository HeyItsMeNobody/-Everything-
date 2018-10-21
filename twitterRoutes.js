const router = require('express').Router();
const randomHexColor = require('random-hex-color');
const bodyParser = require('body-parser');
const twitter = require('./twitterBot.js');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/twitter', (req, res) => {
    res.render('twitter', {randomColor: randomHexColor()});
});

router.post('/twitter-sendmessage', (req, res) => {
    let message = req.body.message;
    twitter.post('statuses/update', {status: `${message}` }, function(err, data, response) {
    });
    res.redirect('/twitter')
});

module.exports = router;