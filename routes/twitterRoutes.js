const router = require('express').Router();
const randomHexColor = require('random-hex-color');
const bodyParser = require('body-parser');
const twitter = require('../exports/twitterBot.js');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/twitter', (req, res) => {
    twitter.get('statuses/home_timeline', function(err, data, response) {
        res.render('twitter', {randomColor: randomHexColor(), data: data});
    });
});

router.post('/twitter-sendmessage', (req, res) => {
    let message = req.body.message;
    twitter.post('statuses/update', {status: `${message}` }, function(err, data, response) {
    });
    res.redirect('/twitter')
});

router.get('/twitter-timeline', (req, res) => {
    twitter.get('statuses/home_timeline', function(err, data, response) {
        res.write(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Everything!</title><style>body{font-family: 'Open Sans', sans-serif;}.username{color: ${randomHexColor()};}</style></head><body><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">`)
        if (data.length > 0) {
            data.forEach(element => {
                res.write(`<p><div class="username">${element.user.name}</div>${element.text}<br/></p>`)
            });
        }
        else {
            res.write(`<p><div class="username">Error! Fetch failed</div><br/>This is probably because of twitter their rate limit, Try again later</p>`)
        }
        res.write(`</body></html>`)
        res.end();
    });
});

module.exports = router;