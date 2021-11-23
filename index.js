const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = ('uuid');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');


const Movies = Models.Movie;
const Genre = Models.Genre;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/MovieDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let auth = require('./auth.js')(app);

const passport = require('passport');

require('./passport.js');

app.use(morgan('common'));



// GET requests

//Return the home page of myFlix App
app.get('/', (req, res) =>{
    res.send('Welcome to myFlix App');
})


// Return a list of ALL movies to the user
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title : req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



app.get('/genres/:Name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name})
        .then((genre) => {
            res.json(genre);
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//READ
//Gets information about a specific director
app.get('/director/:name', (req, res) => {
  Movies.findOne({ "Director.Name" : req.params.name })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ
//Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send('Error: ' + err);
    });
});

app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID',(req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
        {$addToSet: { FavoriteMovies: req.params.MovieID}
    },
    { new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});
//Adds data for a new user to our list of users

app.post('/users', (req, res) => {

        Users.findOne({Username: req.body.Username})
            .then((user) => {
                if(user) {
                 return res.status(400).send(req.body.Username + ' already exists');
             } else {
                 Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Birthday: req.body.Birthday,
                        Email: req.body.Email
                    })
                    .then((user) => {res.status(201).json(user)})
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                 })
                }
            })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});
//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
        {$pull: { FavoriteMovies: req.params.MovieID}
    },
    { new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + " was not found.");
            } else {
                res.status(200).send(req.params.Username + " was deleted.");
            }
        })
        .catch ((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error has been detected')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
