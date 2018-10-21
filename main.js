const express = require('express');
const app = express();
const randomHexColor = require('random-hex-color');
const mainRoutes = require('./mainRoutes.js');

// View engine
app.set('view engine', 'ejs');

// Homepage
app.get('/', function(req, res) {
    res.render('home', {randomColor: randomHexColor()});
});

// Routes
app.use('/', mainRoutes);

app.listen(9998, function() {
    console.log('Listening on port 9998 uwu');
});