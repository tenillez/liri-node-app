# liri-node-app

LIRI Bot is a node.js application that runs in the terminal only.  

The following commands are needed when it is fully implemented. 

Step 1:

==my-tweets==
node liri.js my-tweets - This will show the last 20 tweets and when they were created at in your terminal/bash window.

==spotify-this-song==
node liri.js spotify-this-song 'song title here' -This will show the following information about the song in your terminal/bash window: 
* Artist(s) 
* The song's name 
* A preview link of the song from Spotify 
* The album that the song is from

==movie-this== 
node liri.js movie-this 'title here' -This will output the following information to your terminal/bash window:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

==do-what-it-says== 
node liri.js do-what-it-says

-Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. 
-It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt. Feel free to change the text in that document to test out the feature for other commands.
