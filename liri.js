
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var cmdName = process.argv[2];
var titleName = process.argv[3];; //song or movie title

console.log(JSON.stringify(process.argv));
console.log(titleName);

//check cmdName name and call approprate function
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
    callDoIt();
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

    var params = {q: 'joechristopher0', count:21}; // setting the count up to 20
    client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
            var tweetcount =1;
            for (var i = 0; i < tweets.statuses.length; i++) {
                console.log("Tweet #" + tweetcount);
                console.log(tweets.statuses[i].text);
                console.log(tweets.statuses[i].created_at);
                console.log("----------------------------------------------------");
                tweetcount++;
            }
        }
        else
            console.log(error);
    });


}

function callSpotify()
{

    var Spotify = require('node-spotify-api'); // using the require key word to access the npm spotify package 
    
    if (titleName === undefined) 
        titleName = "The Sign Ace of Base";  //default song if nothing specified

    var spotify = new Spotify({
      'id': process.env.SPOTIFY_ID,
      'secret': process.env.SPOTIFY_SECRET
    });

    spotify.search({ type: 'track', query: titleName, limit: 1 }, function(err, data) {
        if (err) 
            return console.log('Error occurred: ' + err);
        else {
                var song = data.tracks.items[0];
                //create song object
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

    if (titleName === undefined) 
        titleName = "Mr. Nobody";  //default movie if nothing specified
    
        request("http://www.omdbapi.com/?t=" + titleName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
      
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) 
        {   
            if (titleName === "Mr. Nobody")
            {
                console.log("If you haven't watched 'Mr. Nobody' then you should: <http://www.imdb.com/title/tt0485947/>");
                console.log("It's on Netflix!");
            }
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The year the movie was realeased is: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("The movie's language is:  " + JSON.parse(body).Language);
            console.log("The movie's plot is:  " + JSON.parse(body).Plot);
            console.log("The movie's actors are:  " + JSON.parse(body).Actors);
        }
        else
            console.log(error);
    })
}
   
function callDoIt()
{
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var args = data.split(",");
        cmdName = args[0];
        titleName = args[1];
    
        //check cmdName name and call approprate function
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
            callDoIt();
        }
        else
            console.log("Invalid argument, try again");
        
    })

}