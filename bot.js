const PORT = process.env.PORT || 5001;
var express = require('express');
var app = express();

var Twit = require('twit');
var config = require('./config.js');
const fetch = require("node-fetch");
var T = new Twit(config);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`)); //for heroku

setInterval(tweeter, 60*29*1000); //60*60 = 1 hr

tweeter();

function tweeter() {
  fetch('https://api.covid19api.com/summary')
  .then(response => {
    return response.json();
  })
  .then(users => {
    var json = JSON.stringify(users, null, 2);   //punkt pierwszy przy czytaniu JSON

    var obj = JSON.parse(json);     //punkt drugi przy czytaniu JSON
    var globalNewConfirmed = obj.Global.NewConfirmed;   //zmienna "b" jako odnośnik do Global -> NewConfirmed w JSON

    var laczniePrzypadkow = obj.Countries[135].TotalConfirmed.toLocaleString();
    var nowychPrzypadkow = obj.Countries[135].NewConfirmed.toLocaleString();
    var lacznieZmarlo = obj.Countries[135].TotalDeaths.toLocaleString();
    var lacznieWyzdrowialo = obj.Countries[135].TotalRecovered.toLocaleString();
    var nowychWyzdrowialo = obj.Countries[135].NewRecovered.toLocaleString();
    var nowychZmarlo = obj.Countries[135].NewDeaths.toLocaleString();

    var dataForTweet = ("Chorych: " + laczniePrzypadkow + " (+ " + nowychPrzypadkow + "). \nWyzdrowialo: " + lacznieWyzdrowialo + " (+ " + nowychWyzdrowialo +"). \nZmarlo: " + lacznieZmarlo + " (+ " + nowychZmarlo + ").\n\n#covid19 #sarscov2");
    T.post('statuses/update', { status: dataForTweet }, function(err, data, response) {
      if (err) throw err;
      console.log(data);
})
  });



};
