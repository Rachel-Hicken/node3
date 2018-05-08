const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const port = 5050;

const data = require('./data');

function pizzaLover(req, res, next){
  if(req.session.favorite === 'pizza'){
    next();
  }
  else{
    res.status(403).send('You don\'t love the right food');
  }
}
//this function is applied to get/api/users
//check user session

// Create Url loggin middleware that will console the url if not in production
app.use((req, res, next) => {

  console.log(req.url);
  next();
})

app.use(bodyParser.json());

// Setup sessions to be used
// secret - Super Secret Password to be used to verify the cookie
// resave - Resave the session even if nothing changes false for most sessions
// saveUninitialized - Save a cookie even if no other info has been saved
// cookie : 
//   secure - Require https?  Set to false for development, consider swapping to true for production
//   maxAge - Time that the cookie is valid for in ms
app.use(expressSession({
  secret: 'laksjdf8ap8394rjaf;sknap*&ejr34289oapw84985yhwaoif;8&(*&908we',
  resave:false,
  saveUninitialized:true,
  cookie:{
    secure:false,
    maxAge:1000*60*5
  }
}))

// GET /api/set
// Saves a favorite that has come in as a query parameter to the session
//body: json POST PUT PATCH DELETE
// params: comes through URL and is defined beforehand
//  /api/books/:id/:author
//query: comes through URL, but defined on a case by case basis
//  /api/books?title=matilda&year=1995
//  /api/set?favorite=pizza

app.get('/api/set', (req, res)=>{
  req.session.favorite = req.query.favorite //pizza;
  res.send('Favorite Saved as ' + req.query.favorite);
})

// GET /api/get
// Returns the session object to the frontend
app.get('/api/get', (req, res)=>{
  res.send(req.session);
})

// Get /api/users
// Change from always returning all the data, to filtering based on an incoming query.
// Then change so that it only returns if the user is set to love pizza
// Cause you can't trust those hamburger eaters.

app.get('/api/users', pizzaLover, (req, res) => {
  let filtered = data;
  if(req.query.eye){
    filtered = filtered.filter(user=>user.eyeColor === req.query.eye);
  }
  if(req.query.hair){
    filtered = filtered.filter(user=>user.hairColor === req.query.hair);
  }
  if(req.query.name){
    filtered = filtered.filter(user=>`${user.name.first} ${user.name.last}`.indexOf(req.query.name)>-1);
  }
  res.send(filtered);
})


app.listen(port, () => console.log(`Listening on port ${port}`));
