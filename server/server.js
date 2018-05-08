const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

const data = require('./data');

// Create Url loggin middleware that will console the url if not in production


app.use(bodyParser.json());

// Setup sessions to be used
// secret - Super Secret Password to be used to verify the cookie
// resave - Resave the session even if nothing changes false for most sessions
// saveUninitialized - Save a cookie even if no other info has been saved
// cookie : 
//   secure - Require https?  Set to false for development, consider swapping to true for production
//   maxAge - Time that the cookie is valid for in ms


// GET /api/set
// Saves a favorite that has come in as a query parameter to the session


// GET /api/get
// Returns the session object to the frontend


// Get /api/users
// Change from always returning all the data, to filtering based on an incoming query.
// Then change so that it only returns if the user is set to love pizza
// Cause you can't trust those hamburger eaters.

app.get('/api/users', (req, res)=>{
  res.send(data);
})


app.listen(port, ()=>console.log(`Listening on port ${port}`));
