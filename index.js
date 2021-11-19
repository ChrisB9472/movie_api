
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.movie;
const Users = Models.user;

const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

const morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/MyFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

let movies = [
  { 'id': '1',
    'title': 'Jurassic Park',
    'description': 'Huge advancements in scientific technology have enabled a mogul to create an island full of living dinosaurs.',
      'genre':{
          'GenreID': '1',
        'name': 'Science Fiction',
        'description': 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts'
      },
      'director': {
        'DirectorID': '2',
        'name': 'Steven Spielberg',
        'bio': 'Steven Allan Spielberg is an American film director, producer, and screenwriter.',
        'birth': '1946',
        'death': ''},
      'imagePath': 'JurassicPark.png',
      'featured': true,
      'actors': [
        "Jeff Goldblum"
      ]
    },
  {
    'id': '2',
    'title': 'What About Bob?',
    'description': 'Before going on vacation, self-involved psychiatrist Dr. Leo Marvin (Richard Dreyfuss) has the misfortune of taking on a new patient: Bob Wiley ',
      'genre':{
        'name': 'Comedy',
        'GenreID': '2',
        'description': 'Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered.'
      },
      'director': {
        'DirectorID': '3',
        'name': 'Frank Oz',
        'bio': 'Frank Oz is an American actor, puppeteer, and filmmaker.',
        'birth': '1944',
        'death': ''},
      'imagePath': 'WhatAboutBob.png',
      'featured': true,
      'actors': [
        "Bill Murray"
      ]
    },
  {
    'id': '3',
    'title': 'Guardians Of The Galaxy',
    'description': 'Brash space adventurer Peter Quill (Chris Pratt) finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. ',
      'genre':{
        'name': 'Science Fiction',
        'GenreID': '1',
        'description': 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts'
      },
      'director': {
        'DirectorID': '1',
        'name': 'James Gunn',
        'bio': 'James Francis Gunn Jr. is an American film director, actor, producer, screenwriter, and former musician.',
        'birth': '1966',
        'death': ''},
      'imagePath': 'GuardiansOfTheGalaxy.png',
      'featured': true,
      'actors': [
        "Chris Pratt"
      ]
    },
  {
    'id': '4',
    'title': 'Shin Godzilla',
    'description': 'Japan is plunged into chaos when a skyscraper-sized lizard monster rises from the deep of Tokyo Bay and lays waste to Tokyo.',
      'genre':{
        'name': 'Science Fiction',
        'GenreID': '1',
        'description': 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts'
      },
      'director': {
        'DirectorID': '4',
        'name': 'Hideaki Anno',
        'bio': 'Hideaki Anno is a Japanese animator, filmmaker and actor. ',
        'birth': '1960',
        'death': ''},
      'imagePath': 'ShinGodzilla.png',
      'featured': true,
      'actors': [
        "Satomi Ishihara"
      ]
    },

  {
    'id': '5',
    'title': 'Godzilla 2000',
    'description': 'It has razor sharp teeth in a gargantuan mouth; claws that can cut through steel;',
      'genre':{
        'name': 'Science Fiction',
        'GenreID': '1',
        'description': 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts'
      },
      'director': {
        'DirectorID': '5',
        'name': 'Takao Okawara',
        'bio': 'Takao Okawara is a Japanese film director, writer, and producer. ',
        'birth': '1949',
        'death': ''},
      'imagePath': 'Godzilla2000.png',
      'featured': true,
      'actors': [
        "Hiroshi Abe"
      ]
    },

  {
    'id': '6',
    'title': 'Godzilla vs Megaguirus',
    'description': 'An experimental satellite-based weapon that fires miniature black holes, called the Dimension Tide, opens a wormhole through which a prehistoric dragonfly',
      'genre':{
        'name': 'Science Fiction',
        'GenreID': '1',
        'description': 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts'
      },
      'director': {
        'DirectorID': '6',
        'name': 'Masaaki Tezuka',
        'bio': 'Masaaki Tezuka (手塚 昌明 Tezuka Masaaki) is a Japanese director.',
        'birth': '1955',
        'death': ''},
      'imagePath': 'GodzillavsMG.png',
      'featured': true,
      'actors': [
        "Shogo Tomiyama"
      ]
    },

  {
    'id': '7',
    'title': 'Doctor Strange',
    'description': 'Marvels "Doctor Strange" follows the story of the talented neurosurgeon Doctor Stephen Strange who, after a tragic car accident, must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions.',
      'genre':{
        'name': 'Adventure',
        'GenreID': '3',
        'description': 'The adventure genre consists of books where the protagonist goes on an epic journey, either personally or geographically.'
      },
      'director': {
        'DirectorID': '7',
        'name': 'Scott Derrickson',
        'bio': 'He is a producer and director',
        'birth': '1966',
        'death': ''},
      'imagePath': 'DoctorStrange.png',
      'featured': true,
      'actors': [
        "Benedict Cumberbatch"
      ]
    },

  {
    'id': '8',
    'title': 'My Hero Acedemia: World Heroes Mission',
    'description': 'Japans greatest heroes must track down the mastermind behind a deadly chemical attack.',
      'genre':{
        'name': 'Animated',
        'GenreID': '4',
		'Description': 'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.'
	},
      'director': {
        'DirectorID': '8',
        'name': 'Kenji Nagasaki',
        'bio': 'Kenji Nagasaki is a Japanese anime director employed by Madhouse.',
        'birth': '1979',
        'death': ''},
      'imagePath': 'MHA.png',
      'featured': true,
      'actors': [
        "Deku"
      ]
    },

  {
    'id': '9',
    'title': 'Avengers: Infinity War',
    'description': 'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos.',
      'genre':{
        'name': 'Adventure',
          'GenreID': '3',
        'description': 'The adventure genre consists of books where the protagonist goes on an epic journey, either personally or geographically.'
      },
      'director': {
        'DirectorID': '9',
        'name': 'Anthony Russo',
        'bio': 'He is a producer and director',
        'birth': '1970',
        'death': ''},
      'imagePath': 'AVG.png',
      'featured': true,
      'actors': [
        "Chris Pratt"
      ]
    },

  {
    'id': '10',
    'title': 'Thor: Ragnorak',
    'description': 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
      'genre':{
        'name': 'Adventure',
        'GenreID': '3',
        'description': 'The adventure genre consists of books where the protagonist goes on an epic journey, either personally or geographically.'
      },
      'director': {
        'DirectorID': '10',
        'name': 'Taika Waititi',
        'bio': 'a New Zealand film and television director, producer, screenwriter, actor, and comedian.',
        'birth': '1975',
        'death': ''},
      'imagePath': 'Thor.png',
      'featured': true,
      'actors': [
        "Chris Hemsworth"
      ]
    },

  {
    'id': '11',
    'title': 'Guardians Of The Galaxy 2',
    'description': 'Brash space adventurer Peter Quill (Chris Pratt) finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. ',
      'genre':{
        'name': 'Science Fiction',
        'GenreID': '1',
        'description': 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts'
      },
      'director': {
        'DirectorID': '1',
        'name': 'James Gunn',
        'bio': 'James Francis Gunn Jr. is an American film director, actor, producer, screenwriter, and former musician.',
        'birth': '1966',
        'death': ''},
      'imagePath': 'GuardiansOfTheGalaxy2.png',
      'featured': true,
      'actors': [
        "Chris Pratt"
      ]
    },

];

let user = [
    {
      'id':1,
      'username': 'ChrisBeyers',
      'password': 'cb305',
      'email': 'christbeyers@gmail.com',
      'bday': '06/23/1994'
      'userMovieList': {
      'title': 'Shin Godzilla'
      }
    }

  ];



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
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return student.title === req.params.title }));
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
