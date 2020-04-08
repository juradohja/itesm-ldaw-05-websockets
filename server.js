// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Session imports
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let passport = require('passport');

// Express app creation
const app = express();

// Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Configurations
const appConfig = require('./configs/app');

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

// Session configurations
let sessionStore = new session.MemoryStore;
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: appConfig.secret
}));
app.use(flash());

// Configuraciones de passport
require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session());

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"));

// Routes
app.use('/', webRoutes);

const axios = require('axios');

var players = [];
var sockets = [];

io.on('connection', (socket) => {
  axios.get("https://random-word-api.herokuapp.com/word?number=1")
    .then((response) => {
      var newPlayer = response.data[0];
      players.push(newPlayer);
      sockets.push(socket);
      socket.emit('welcome', {name : newPlayer, players : players});
      socket.broadcast.emit('newPlayer', {players : players});
    });
  let i = 0;
  socket.on('message-to-server', (data) => {
    console.log("message received: ", data)
  });
  socket.on('disconnect', () => {
    var i = sockets.indexOf(socket);
    var disconnectedPlayer = players[i];
    players.splice(i,1);
    sockets.splice(i, 1);
    socket.broadcast.emit('playerDisconnect', {name : disconnectedPlayer, players : players});
  });
})

// App init
server.listen(appConfig.expressPort, () => {
  console.log(`Server is listening on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
