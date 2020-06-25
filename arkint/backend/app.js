const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
app.use(cors());
passport.initialize();

require('./chat/chat')(io);
require('./model/login');
require('./util/passport');

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dburl = 'mongodb://localhost:27017/chat_db'
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected', () => {
    console.log(`database connection to ${dburl} succesfull`);

})

const login = require('./route/login');
const register = require('./route/register')
const port = process.env.PORT || 3000;

app.use('/login/google', login);
app.use('/login/manual', login);
app.use('/register', register);

app.get('/auth/google/callback', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(req.user);
});

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})