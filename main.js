const express = require('express');
const app = express();
const randomHexColor = require('random-hex-color');
const discordRoutes = require('./routes/discordRoutes.js');
const twitterRoutes = require('./routes/twitterRoutes.js');

// View engine
app.set('view engine', 'ejs');

// Homepage
app.get('/', function(req, res) {
    res.render('home', {randomColor: randomHexColor()});
});

// Routes
app.use('/', discordRoutes);
app.use('/', twitterRoutes);

app.listen(9998, function() {
    console.log('Listening on port 9998 uwu');
});