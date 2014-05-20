// set up 
var express  = require('express');
var app      = express(),            
    routes   = require('./routes'),
    api      = require('./routes/api');
var mongoose = require('mongoose');       // mongoose for mongodb
var db       = require('./config/db');    // load the database config
var port     = process.env.PORT || 8080;  

// Configuration
mongoose.connect(db.url); 

var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function callback () {
  console.log('database connection success');
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });

  app.use(express.static(__dirname + '/public')); 
  app.use(express.logger('dev'));                 
  app.use(express.bodyParser());                  
  app.use(express.methodOverride());              

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/itens', api.itens);

app.get('/api/item/:id', api.item);
app.post('/api/item', api.addItem);
app.put('/api/item/:id', api.editItem);
app.delete('/api/item/:id', api.deleteItem);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server
app.listen(port);

console.log("Express server listening on port " + port);   