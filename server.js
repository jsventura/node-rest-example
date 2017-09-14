var express = require('express'),
    pg = require("pg"),
    
    mongoose = require('mongoose'),
    Evaluation = require('./models/evaluationModel')

    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    
    
    app = express(),
    server = require('http').Server(app);

    var db;
    if(process.env.ENV == 'Test'){
      db = mongoose.connect('mongodb://localhost/evaluation_test')
    }else{
      db = mongoose.connect('mongodb://localhost/evaluation')
    }    

var port = process.env.PORT || 4000;

//services

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

evaluationRouter = require('./routes/evaluationRoutes')(Evaluation);

app.use('/api/evaluations', evaluationRouter);

app.get('/', function(req, res){
  res.send('Welcome to rest Api');
});

server.listen(port, function () {
    var port = server.address().port;
    console.log('Monitor App running on port ' + port);
});

module.exports = app;