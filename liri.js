require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");

var Twitter = require('twitter');
var Spot = require('node-spotify-api');
var spotify = new Spot(keys.spotify);
var client = new Twitter (keys.twitter);
var fs = require("fs");


var userInput= process.argv;

if (userInput[2] === "my-tweets"){
    var parameters = {screen_name: 'ShaziaJiwani', count: 20};
    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        else {
            for (var i = 0; i < tweets.length; i++)
            console.log(tweets[i].text);
        }
    });
}

else if(userInput[2] === "spotify-this-song") {
    var song = "";
    for (var i = 3; i < userInput.length; i++) {
        song = song + " " + userInput[i];
    }

    if (song === "") {
        spotify.search({type: 'track', query: 'The Sign'}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songInfo = data.tracks.items[5];
            console.log(songInfo.artists[0].name);
            console.log(songInfo.name);
            console.log(songInfo.preview_url);
            console.log(songInfo.album.name);

        })
    }
    else {
        spotify.search({type: 'track', query: song}, function(err, data){
            if(err){
                return console.log('Error occurred: ' + err);
            }

            console.log(song);

            var userSongInfo = data.tracks.items[0];
            console.log(userSongInfo.artists[0].name);
            console.log(userSongInfo.name);
            console.log(userSongInfo.preview_url);
            console.log(userSongInfo.album.name);

        })
    }
}

else if(userInput[2] === "movie-this"){
    var movieName = "";

    for (var i = 3; i < userInput.length; i++) {
        if (i > 2 && i < userInput.length) {
            movieName = movieName + "+" + userInput[i];
        }
        else {
            movieName += userInput[i];
        }
    }

    if (movieName === ""){
        var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";

        console.log(queryUrl);
        request(queryUrl, function(error, response, body){
            if (error){
                console.log("Error Ocurred: " + error);
                return;
            }
            var fillerMovie = JSON.parse(body);
            console.log(fillerMovie.Title);
            console.log(fillerMovie.Year);
            console.log(fillerMovie.imdbRating);
            console.log(fillerMovie.Ratings[1]);
            console.log(fillerMovie.Country);
            console.log(fillerMovie.Language);
            console.log(fillerMovie.Plot);
            console.log(fillerMovie.Actors);

    })}

    else
        {

            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            console.log(queryUrl);
            request(queryUrl, function (error, response, body) {
                if (error) {
                    console.log("Error Ocurred: " + error);
                    return;
                }
                var userMovie = JSON.parse(body);
                console.log(userMovie.Title);
                console.log(userMovie.Year);
                console.log(userMovie.imdbRating);
                console.log(userMovie.Ratings[1]);
                console.log(userMovie.Country);
                console.log(userMovie.Language);
                console.log(userMovie.Plot);
                console.log(userMovie.Actors);
            })
        }

}

else if(userInput[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        var command = dataArr[0].trim();
        var backstreetboys = dataArr[1].trim();

        spotify.search({type: 'track', query: backstreetboys}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var exampleInfo = data.tracks.items[0];
            console.log(exampleInfo.artists[0].name);
            console.log(exampleInfo.name);
            console.log(exampleInfo.preview_url);
            console.log(exampleInfo.album.name);

        });
    })
}