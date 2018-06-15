require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./key.js');
var request = require('request');
var fs = require ('fs');

var spotify = new Spotify(keys.spotify);

console.log("Type my-tweets, spotify-this-song, movie-this, or do-what-it-says to get started!");

//Function for my tweets 
var getMyTweets = function () {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: "tnizzle32"
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);  
            }
        }
    });
};
// Function for Spotify search
var getArtistNames = function(artist) {
    return artist.name;
  };

var getMySpotify = function(songName) {
    if (songName === undefined) {
      songName = "Run the World";
    }
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };
// Function for Movie Search
var getMyMovie = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr. Nobody";
    }
    var urlHit =
      "http://www.omdbapi.com/?t=" +
      movieName +
      "&y=&plot=full&tomatoes=true&apikey=trilogy";
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
      }
    });
  };
// Function do-what-it-says command based on text file
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
      var dataArr = data.split(",");
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };

// console.log(getMyTweets())
// console.log(getMySpotify())
// console.log(getMyMovie())
// console.log(doWhatItSays())

// Function for determining which command is executed
var pick = function(caseData, functionData) {
    switch (caseData) {
      case "my-tweets":
        getMyTweets();
        break;
      case "spotify-this-song":
        getMySpotify(functionData);
        break;
      case "movie-this":
        getMyMovie(functionData);
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        console.log("LIRI doesn't know that");
    }
  };
  // Function command line arguments and executes correct function 
  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  // MAIN PROCESS
  // =====================================
  runThis(process.argv[2], process.argv[3]);
