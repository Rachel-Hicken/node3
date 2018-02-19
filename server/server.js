const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const session = require('express-session');
const data = require('./data');
const _ = require('lodash');

app.use(bodyParser.json());
app.use(session({
  secret: 'All Your Secret Are Belong To Us',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.get('/api/set', (req, res)=>{
  req.session.favorite = req.query.favorite || 'No Favorite';

  res.send(`Thanks for registering your favorite as ${req.session.favorite}`);
})

app.get('/api/get', (req, res)=>{
  res.send(req.session.favorite || 'You haven\'t set a Favorite');
})

app.get('/api/users', (req, res)=>{
  if (req.query){
    let filtered = data;
    if (req.query.hair){
      filtered = filtered.filter(e=>e.hairColor.includes(req.query.hair));
    }
    if (req.query.eye){
      filtered = filtered.filter(e=>e.eyeColor.includes(req.query.eye));
    }
    if (req.query.name){
      filtered = filtered.filter(e=>(e.name.first + ' ' + e.name.last).includes(req.query.name));
    }
    return res.send(filtered);
  }else{
    res.send(data);
  }
})


app.listen(port, ()=>console.log(`Listening on port ${port}`));
