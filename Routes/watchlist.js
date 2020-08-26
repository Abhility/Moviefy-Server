const express = require('express');
const router = express.Router();
const { verifyLoginToken, verifyToken } = require('../jwtToken');
const Watchlist = require('../models/profile');
const fetch = require('node-fetch');

router.post('/addtowatchlist', verifyToken, verifyLoginToken, (req, res) => {
  const movieId = req.body.movieId;
  const userId = req.userId;
  Watchlist.findOneAndUpdate(
    { userId: userId },
    { $push: { list: movieId } },
    {
      new: true,
      useFindAndModify: false,
      writeConcern: { w: 'majority', wtimeout: 5000 }
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.delete(
  '/removefromwatchlist/:movieId',
  verifyToken,
  verifyLoginToken,
  (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.userId;
    Watchlist.findOneAndUpdate(
      { userId: userId },
      { $pull: { list: movieId } },
      {
        new: true,
        useFindAndModify: false,
        writeConcern: { w: 'majority', wtimeout: 5000 }
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  }
);

router.get('/getwatchlist', verifyToken, verifyLoginToken, async (req, res) => {
  try {
    let data = await Watchlist.findOne(
      { userId: req.userId },
      { list: true } //fetching users watchlist fro DB
    ).exec();
    if (data == null) {
      res.status(200).send({ present: false, data: null });
      res.end();
      return;
    }
    let promises = [];
    let watchlist = [];
    for (let id of data.list) {
      let mdata = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          process.env.API_KEY
        }`
      );
      promises.push(mdata); //fetching data for list from API and storing all promises in an array
      watchlist.push(await mdata.json());
    }
    Promise.all(promises)
      .then(response => {
        //send response when only when all promises resolves
        res.status(200).send({ present: false, data: watchlist });
        res.end();
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
        res.end();
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
    res.end();
  }
});
module.exports = router;
