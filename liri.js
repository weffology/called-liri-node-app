//set up all required module variables
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//set up command line input variables
var command = process.argv[2];
var input = process.argv[3];

//set up other global variables
var omdbKey = e8c79df7;
var movieQueryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + omdbKey;

//set up which functions should run based on the command line arguement commands
switch (command) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}

//set up the concertThis function
function concertThis() {
    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(concertQueryUrl).then(function(response) {
        //log name of venue
        //log venue location
        //log date of event
    })
}