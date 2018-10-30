require("dotenv").config();

var Spotify = require('node-spotify-api'); //spotify api
var keys = require("./keys.js"); // keys.js
var fs = require("fs"); //fs library
var request = require("request"); //request library
var moment = require("moment"); // moment library

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function getConcert (artist){

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    request(queryURL, function(error, response, body) {
        
        if (!error && response.statusCode === 200) {
            
            var data = JSON.parse(body);

            if (data.length == 0) {
                console.log("Nothing found for " + artist);
            }

            else {

                console.log("Shows for " + artist + ":");

                for (var i = 0; i < data.length; i++) {
                
                    var concert = data[i];

                    console.log("Where: " + concert.venue.city + ", " + concert.venue.country);
                    console.log( "At: " + concert.venue.name);
                    console.log( "When " + moment(concert.datetime).format("MM/DD/YYYY"));
                    console.log("************************************");
                }
            }
        }

        else {
            console.log("There was an error finding your concert: " + error);
        }
  });
}

function getSong (song) {

    if (song == undefined) {
        song = "The Sign";
    }

    spotify.search({type: "track", query: song},function(err, data) {
    
        if (err) {
            console.log("Error occurred: " + err);
        }

        else {

            var result = data.tracks.items;

            for (var i = 0; i < result.length; i++) {

                console.log("Artist: " + result[i].artists[0].name);
                console.log("Song name: " + result[i].name);
                console.log("Preview song: " + result[i].preview_url);
                console.log("Album: " + result[i].album.name);
                console.log("************************************");
            }
        }
    });
}

function getMovie (movie) {

    if (movie == undefined) {
        movie = "Mr Nobody";
    }

    var queryUrl ="http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
    request(queryUrl, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {
            
            var data = JSON.parse(body);
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("Rated: " + data.Rated);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
        }

        else {
            console.log("There was an error finding your movie: " + error);
        }
    });
}

function whatItSays () {

    fs.readFile("random.txt", "utf8", function(error, data) {
    
        var fileData = data.split(",");
        whatToDo(fileData[0], fileData[1]);
    });
}

function whatToDo (command, input) {

    if (command.toLowerCase().trim() == 'concert-this') {

        getConcert(input);
    }
    
    else if (command.toLowerCase().trim() == 'spotify-this-song'){
    
        getSong(input);
    }
    
    else if (command.toLowerCase().trim() == 'movie-this') {
    
        getMovie(input);
    }
    
    else if (command.toLowerCase().trim() == 'do-what-it-says'){
    
        whatItSays();
    }
    
    else {
    
        console.log("This command is not defined please type:");
        console.log("concert-this <band/artist name>" );
        console.log("spotify-this-song <song name>" );
        console.log("movie-this <movie name>" );
        console.log("do-what-it-says" );   
    }
}

whatToDo(command, userInput);
