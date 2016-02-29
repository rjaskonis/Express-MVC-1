"use strict";

var express 	= require('express');
var app     	= express();  // define our app using express
var path 		= require('path');
var fs			= require('fs')
var handlebars  = require('express-handlebars'), hbs;
var bodyParser 	= require('body-parser');

// handlebars template engine
hbs = handlebars.create({ defaultLayout: '_default.hview' });

app.engine('hview', hbs.engine); // hview is a custom extension (hence any extension name can be used)
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hview');
//app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// dynamically include routes (from Controllers)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      // var route = require('./controllers/' + file); // these 2 lines result the same as uncommented one
      // route.controller(app);				
      require('./controllers/' + file).controller(app); 
      /* passes the app instance to controller 
       (means controllers are imported, but don't have to be binded to a variable 
        since they're using app instance already)
       */
  }
});

// custom 404 page (middleware) - MUST be placed after controllers because they have already defined valid routes
app.use(function(req,res,next){ res.status(404); res.render("layouts/_404.hview"); }); //error page

app.listen(app.get('port'));
console.log("Server listening on localhost:" + app.get('port'));

	
