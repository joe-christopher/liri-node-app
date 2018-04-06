
require("dotenv").config();
var keys = require("./keys.js");
var cmdName = process.argv[2];



if (cmdName == "my-tweets")
{
    callTwitter();
}
else if (cmdName == "spotify-this-song")
{
    callSpotify();
}
else if (cmdName == "movie-this")
{
    console.log ("call - " + cmdName);
}
else if (cmdName == "do-what-it-says")
{
    console.log ("call - " + cmdName);
}
else
    console.log("Invalid argument, try again");

// function definitions

function callTwitter()
{

    var Twitter = require('twitter');// using the require key word to access the npm twitter package

  
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = {screen_name: 'joechristopher0', count:20}; // setting the count up to 20
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
  	        console.log(tweets);
        }
        else
            console.log(error);
    });


}

function callSpotify()
{

    var Spotify = require('node-spotify-api');

    var titleName = "";
    
    if (process.argv[3] != null) 
        titleName = process.argv[3];
    else 
        titleName = "The Sign Ace of Base";
    
        console.log(titleName);

    var spotify = new Spotify({
      'id': process.env.SPOTIFY_ID,
      'secret': process.env.SPOTIFY_SECRET
    });

    spotify.search({ type: 'track', query: titleName, limit: 1 }, function(err, data) {
        if (err) 
            return console.log('Error occurred: ' + err);
        else {
                var song = data.tracks.items[0];
                var songObj = {
                'Artist(s)': song.artists[0].name,
                'Name': song.name,
                'Preview Link': song.preview_url,
                'Album': song.album.name
            }
            console.log(JSON.stringify(songObj, null, 2));
        }
            
            
    });
    

}