var Twit = require('twit');
var config = require('./config.js');
var fs = require('fs');
const fetch = require("node-fetch");
var T = new Twit(config);

setInterval(tweeter, 60*29*1000); //60*60 to godzina

tweeter();

function tweeter() {

  fetch('https://api.covid19api.com/summary')
  .then(response => {
    return response.json();
  })
  .then(users => {
    // console.log(users);
    var json = JSON.stringify(users, null, 2);   //punkt pierwszy przy czytaniu JSON
    fs.writeFileSync('tweets.json', json);      //towrzy plik json

    var obj = JSON.parse(json);     //punkt drugi przy czytaniu JSON
    var globalNewConfirmed = obj.Global.NewConfirmed;   //zmienna "b" jako odnośnik do Global -> NewConfirmed w JSON

    //polska
    var namePoland = obj.Countries[135].Country;
    var laczniePrzypadkow = obj.Countries[135].TotalConfirmed.toLocaleString();
    var nowychPrzypadkow = obj.Countries[135].NewConfirmed.toLocaleString();
    var lacznieZmarlo = obj.Countries[135].TotalDeaths.toLocaleString();
    var lacznieWyzdrowialo = obj.Countries[135].TotalRecovered.toLocaleString();

    var dataForTweet = ("Wszystkich przypadkow " + laczniePrzypadkow + " w tym nowych " + nowychPrzypadkow + ". Od poczatku pandemii zmarlo " + lacznieZmarlo + " chorych, a wyzdrowialo " + lacznieWyzdrowialo + " przypadkow. #covid19 #stopcovid #sarscov2 #koronawirus");
    // console.log(dataForTweet);

    T.post('statuses/update', { status: dataForTweet }, function(err, data, response) {
    console.log(data)
})
  });



};
