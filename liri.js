//set up all required module variables
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

//set up global command line input variables
var command = process.argv[2];
var input = process.argv.slice(3).join("+");

//function that designates which function should be run based on the command arguement the user puts in
var pick = function(caseData, functionData) {
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
var runLiri = function(command, input) {
    pick(command, input);
}

//call the function to run LIRI
runLiri(command, input);

//create the concertThis function
function concertThis() {
    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(concertQueryUrl).then(function(response) {
        console.log("----------------");
        //log name of venue
        console.log("Venue Name: " + response.data[0].venue.name);
        //log venue location
        console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        //log date of event
        console.log("Event Date: " + moment(response.data[0].datetime).format("MMM Do YY"));
    });
}

// //create spotify function
// function spotifyThis() {
//     var spotify = new Spotify(keys.spotify);
//     spotify.search({type: "track", query: input, })
// }

// //create movie function
// function movieThis() {
//     var omdbKey = e8c79df7;
//     var movieQueryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + omdbKey;
// }