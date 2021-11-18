const express = require('express');
const morgan = require('morgan');
const app = express();

let movies = [
  {
    title: 'Jurassic Park',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    director: 'Steven Spielberg'
  },
  {
    title: 'What About Bob',
    genre: ['Comedy','Farce'],
    director: 'Frank Oz'
  },
  {
    title: 'Gurdians Of The Galaxy',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Superhero', 'Science Fiction'],
    director: 'James Gunn'
  },
  {
    title: 'Shin Godzilla',
    genre: ['kaiju', 'Action', 'horror', 'Drama', 'Science fiction'],
    director: 'Hideaki Anno'
  },
  {
    title: 'Godzilla 2000',
    genre: ['kaiju', 'Action', 'horror', 'Drama', 'Science fiction'],
    director: 'Takao Okawara'
  },
  {
    title: 'Godzilla Vs. Megaguires',
    genre: ['kaiju', 'Action', 'horror', 'Drama', 'Science fiction'],
    director: 'Masaaki Tezuka'
  },
  {
    title: 'Doctor Strange',
    genre: ['Action', 'Fantasy', 'Superhero', 'Adventure', 'Science Fiction'],
    director: 'Scott Derrickson'
  },
  {
    title: 'My Hero Academia: World Heroes',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Superhero', 'Science Fiction'],
    director: 'Kenji Nagasaki'
  },
  {
    title: 'Avengers: Infinity War',
    genre: ['Action', 'Superhero', 'Science Fiction'],
    director: 'Anthony Russo & Joe Russo'
  },
  {
    title: 'Thor: Ragnarok',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Superhero', 'Buddy', 'Science Fiction'],
    director: 'Taika Waititi'
  }
];
// middleware
app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my top ten movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});
// Return data about a genre (description) by name/title.
app.get('/movies/:title/genre', (req, res) => {
  res.send('Successful GET request returning data about a genre.');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error has been detected')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
