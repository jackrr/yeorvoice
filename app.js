
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , MongoStore = require('connect-mongo')(express)
  , config = require('./config.json')
  , socketio = require('socket.io')
  , ioSession = require('socket.io-session');

var app = express();

app.db = require('./db/db.js');

memoryStore = new MongoStore(config.db);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true; // preserve whitespace and [ what else will this do?? ]
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: config.secret,
	maxAge: new Date(Date.now() + config.sessionLength),
	store: memoryStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * events
 */
var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter;

/* routes */
require('./routes/index')(app);
require('./routes/post')(app, events);
require('./routes/topic')(app, events);
require('./routes/user')(app, events);
require('./routes/topicPop')(app, events);

var server = http.createServer(app);
/*
 * socket.io
 */
var io = socketio.listen(server);
io.set('authorization', ioSession(express.cookieParser(config.secret), memoryStore));

require('./sockets/socketMain')(app, io, events);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
