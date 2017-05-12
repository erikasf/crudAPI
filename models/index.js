var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/expressLibrary");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	alert("db is now connected");
});


module.exports.Book = require("./book");

//this model is just initializing the mongo database and making sure
//that it is accessable by the rest of the application.