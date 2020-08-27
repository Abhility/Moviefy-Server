const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { verifyLoginToken, verifyToken } = require('../jwtToken');

function getGenreId(name) {
  let genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];
  for (let genre of genres) {
    if (genre.name.localeCompare(name) == 0) {
      return genre.id;
    }
  }
}

router.get('/search', verifyToken, (req, res) => {
  var name = req.headers.name;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${name}&region=IN`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result.results);
    })
    .catch((err) => console.log(err));
});

// verifyToken
router.get('/trending', (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&region=IN`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result.results);
    })
    .catch((err) => console.log(err));
});

router.get('/genre', verifyToken, (req, res) => {
  let genre = req.headers.genre;
  const genreId = getGenreId(genre);
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc&with_genres=${genreId}&region=IN`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result.results);
    })
    .catch((err) => console.log(err));
});

router.get("/getmovie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
      process.env.API_KEY
    }`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get("/getmovie/:movieId/videos", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
      process.env.API_KEY
    }`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get("/getmovie/:movieId/credits", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
      process.env.API_KEY
    }`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get("/getmovie/:movieId/images", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${
      process.env.API_KEY
    }`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get(
  '/getmovies/now_playing',
  // verifyToken,
  // verifyLoginToken,
  (req, res) => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1&region=IN`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result.results);
      })
      .catch((err) => console.log(err));
  }
);

router.get('/getmovies/upcoming', verifyToken, verifyLoginToken, (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&page=1&region=IN`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result.results);
    })
    .catch((err) => console.log(err));
});

router.get(
  '/getmovies/top-rated',
  verifyToken,
  verifyLoginToken,
  (req, res) => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=1&region=IN`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result.results);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
