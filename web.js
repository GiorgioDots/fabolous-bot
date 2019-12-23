const express = require('express');
const bodyParser = require('body-parser');
const packageInfo = require('./package.json');
const http = require("http");


const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});

setInterval(function () {
  http.get("http://fabolous-bot.herokuapp.com");
}, 300000); // every 5 minutes (300000)

module.exports = (bot) => {
  app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};