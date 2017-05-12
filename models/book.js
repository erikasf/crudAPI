var mongoose = require('mongoose');

var booSchema = new mongoose.Schema({
	title: String,
	author: String,
	year: Number
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
//this enables us to form the collection required to 
//house the books that we can search from and add to.
//