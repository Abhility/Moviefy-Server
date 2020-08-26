const jwt = require("jsonwebtoken");

function generateToken(data) {
  const token = jwt.sign({ subject: data._id }, process.env.USER_KEY);
  return token;
}

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized request");
    res.end();
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    res.status(401).send("Unauthorized request");
    res.end();
  }
  jwt.verify(token, process.env.SETUP_KEY, (err, data) => {
    if (err) {
      res.status(401).send("Unauthorized request");
      res.end();
    }
  });
  next();
}

function verifyLoginToken(req, res, next) {
  if (!req.headers.usertoken) {
    res.status(401).send("Unauthorized request");
    res.end();
  }
  let token = req.headers.usertoken;
  if (token == "null") {
    res.status(401).send("Unauthorized request");
    res.end();
  }
  jwt.verify(token, process.env.USER_KEY, (err, data) => {
    if (err) {
      res.status(401).send("Unauthorized request");
      res.end();
    }
    if (data) {
      req.userId = data.subject;
    }
  });
  next();
}

module.exports.generateToken = generateToken;
module.exports.verifyLoginToken = verifyLoginToken;
module.exports.verifyToken = verifyToken;
