const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT
const globalRouter = require('./routes/global.js');
const secureRouter = require('./routes/secure.js');
const websocket = require('./websocket.js');
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// Add headers before the routes are defined
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URI);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie,X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

function checkAuth(req, res, next) {
  if (parseInt(req.headers.authorization) === parseInt(process.env.AUTH_TOKEN)) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use('/api', globalRouter)
app.use('/api/secure', checkAuth, secureRouter)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
  websocket.setupSocketServer();
})


