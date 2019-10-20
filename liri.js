//set up all required module variables
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

//set up global command line input variables
var command = process.argv[2];
var input = process.argv.slice(3).join("+");

//function that designates which function should be run based on the command arguement the user puts in
var pick = function (caseData, functionData) {
    switch (caseData) {
        case "concert-this":
            concertThis(functionData);
            break;
        case "spotify-this-song":
            spotifyThis(functionData);
            break;
        case "movie-this":
            movieThis(functionData);
            break;
        case "do-what-it-says":
            doWhat(functionData);
            break;
        default:
            console.log("Sorry, LIRI doesn't know that.");
    }
};

//create function that takes in the command line arguememnt
var runLiri = function (command, input) {
    pick(command, input);
}

//call the function to run LIRI
runLiri(command, input);

//create the concertThis function
function concertThis() {
    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(concertQueryUrl).then(function (response) {
        console.log("----------------");
        //log name of venue
        console.log("Venue Name: " + response.data[0].venue.name);
        //log venue location
        console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
        //log date of event
        console.log("Event Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("----------------");
    });
}

//create spotify function
function spotifyThis() {
    spotify.search({type: "track", query: input, limit: 1}, function(err, data) {
        if (err) {
            return console.log("An error occurred: " + err);
          }
          console.log("----------------");
          console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
          console.log("Song Name: " + data.tracks.items[0].name);
          console.log("Song Link: " + data.tracks.items[0].preview_url);
          console.log("Album Name: " + data.tracks.items[0].album.name);
          console.log("----------------");
    })  
}

//create movie function
function movieThis() {
    var omdbKey = "e8c79df7";
    if (input === false) {
        input = "mr+nobody";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + omdbKey;
    axios.get(movieQueryUrl).then(function(response) {
        console.log("----------------");
        console.log(response.data);
        console.log("----------------");
        console.log("Movie Title: " + response.data[0].title);
        // console.log("Year: " + response.data[0].year);
        // console.log("IMDB Rating: " + response.data[0].ratings.value[0]);
        // console.log("Rotten Tomatoes Rating: " + response.data[0].ratings.value[1]);
        // console.log("Produced in: " + response.data[0].country);
        // console.log("Language: " + response.data[0].language);
        // console.log("Plot: " + response.data[0].plot);
        // console.log("Actors: " + response.data[0].actors);
    })
}