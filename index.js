// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var lang = require('accept-language-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
app.get('/api/whoami',function(req,res){
  let ipvalue =  req.ip;
  let lngs = req.headers['accept-language']
  let languages =lang.parse(lngs);
  let preferredLanguage = languages.length > 0 ? languages[0].code : undefined;
  let software = req.headers['user-agent'];
  let result = {
    ipaddress: ipvalue,
    language: preferredLanguage,
    software: software
  };

  res.json(result);
})
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

