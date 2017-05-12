var express = require("express");
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');
app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('__method'));

var books = [];
var count = 1;
var foundBook;

app.get('/', function(req, res){
	res.redirect('/books');
});


//list of all the books
app.get('/books', function(req,res){
  res.render('index', {books:books});
});

//form page to send info on new book or query book
app.get('/books/new', function(req, res){
	res.render('new');
});
//create the book
app.post('/books', function(req,res){
	var newBook = req.body.book;
	newBook.id = count;
	books.push(newBook);
	count ++;
	res.redirect('/books');
});
//show page
app.get('/books/:id', function(req,res){
  books.forEach(function(book){
    if(book.id === Number(req.params.id)){
      foundBook = book;
    }
  });
    if(!foundBook){
      res.render("404");
    }
  res.render('show', {book:foundBook});
});
app.get('/books/:id/edit', function(req,res){
  books.forEach(function(book){
    if(book.id === Number(req.params.id)){
      foundBook = book;
    }
  });
  if (!foundBook){
  	res.render('404');
  }
  res.render('edit', {book:foundBook} );
});
app.put('/books/:id', function(req, res){
	books.forEach(function(book){
		if(book.id === Number(req.params.id)){
			book.title = req.body.book.title;
			book.author = req.body.book.author;
			book.year = req.body.book.year;
		}
	 });
    if(!foundBook){
      res.render("404");
    }
  res.redirect('/books');
});
app.delete('/books/:id', function(req,res){
  books.forEach(function(book){
    if(book.id === Number(req.params.id)){
      books.splice(books.indexOf(book),1);
    }
  });
  res.redirect('/books');
});

app.get('*', function(req,res){
  res.render('404');
});


app.listen(3000, function(){
	console.log("server is listening on port 3000");
});