const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { generateToken, verifyLoginToken, verifyToken } = require('../jwtToken');

//API routes
router.post('/register', verifyToken, (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ message: 'successfully registerd' });
    }
  });
});

router.post('/login', verifyToken, (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (data) {
      if (data.password != userData.password) {
        return res.status(403).json({ message: 'Incorrect Password' });
      } else {
        return res.status(200).send({ usertoken: generateToken(data) });
      }
    } else {
      return res.status(404).json({ message: 'Email not found' });
    }
  });
});

router.get('/setup', (req, res) => {
  const token = jwt.sign({ subject: 'movie-rater' }, process.env.SETUP_KEY);
  return res.status(200).send({ token: token });
});

router.get('/user', verifyToken, verifyLoginToken, (req, res) => {
  User.findOne({ _id: req.userId }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res
      .status(200)
      .send({ userName: data.userName, email: data.email, date: data.date });
  });
});

module.exports = router;
