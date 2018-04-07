
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
    callMovie();
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

function callMovie()
{
    var request = require("request");

    var titleName = "";
    
    if (process.argv[3] != null) 
    {
        titleName = process.argv[3];
        request("http://www.omdbapi.com/?t=" + titleName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) 
        {
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The year the movie was realeased is: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie was produced in: " + JSON.parse(body).County);
            console.log("The movie's language is:  " + JSON.parse(body).Language);
            console.log("The movie's plot is:  " + JSON.parse(body).Plot);
            console.log("The movie's actors are:  " + JSON.parse(body).Actors);
           
        }
        else
            console.log(error);
        });
    }
    else
    {
        console.log("If you haven't watched 'Mr. Nobody' then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    }


}