require('dotenv').config();

const express = require('express');
const hbs = require('hbs');




// require spotify-web-api-node package here:

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
  


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

// Our routes go here:

app.get("/", (req, res, next) => {
    res.render("index")
  }),

app.get("/artist-search", (req, res) => {
    const artistName = req.query;
    
  spotifyApi
  .searchArtists(req.query.artist)
  .then(data => {
    console.log('The received data from the API: ', data.body.artists.items);
    res.render('artist-search', {list: data.body.artists.items})
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

  
  
})




app.get('/view-albums/:artist_id', (req, res) => {
  const {artist_id} = req.params
  spotifyApi
  .getArtistAlbums(artist_id)
  .then(data => {
      console.log(data.id)
      res.render('view-albums', {list: data.id})
  })
  
})


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));

