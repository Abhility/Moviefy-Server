const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./Routes/api');
const movies = require('./Routes/movies');
const watchlist = require('./Routes/watchlist');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
//environment variables
dotenv.config();

//DB Connection
const database = process.env.DB_CONNECTION;
mongoose.connect(
  database,
  { useNewUrlParser: true, dbName: 'movie-rater' },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database');
    }
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use('/movie-info', api);
app.use('/movie-info', movies);
app.use('/movie-info', watchlist);

app.get('/', (req, res) => {
  res.send('Movie Info server');
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
