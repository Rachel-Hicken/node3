const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const session = require('express-session');
const data = require('./data');
const _ = require('lodash');
const pizzaLover = function(req, res, next){
    if (req.session.favorite === "pizza"){
        next();
    }else{
        res.send([]);
    }
}

app.use((req, res, next)=>{
    console.log(req.url);
    next();
})



app.use(bodyParser.json());
app.use( session({
  secret: '90b8sieu4hb;iuxyv98ahw3;rjnzxoibu9eaoh4btlhasbi8xvbow4nazbxvknzryzilrugba',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}) )

//s%3AnKa_7pqUv4p8tAE1Puh9y5eOlUgNLGBO.6ZHrrFpvXpHf8JyHUkFbJF1Ylz8bAL%2BfwecpElBDQlU
//s%3ANKWU-fiG4HPaugKa_J9kNr6kOxhZH9CI.e5Np89Vu%2FGLqNVjLFaOc6%2FCOGV84yMTq5MUkmFfMCKo

app.get('/api/set', (req, res)=>{
    req.session.favorite = req.query.favorite;
    res.send('Thanks for setting your favorite');
})

app.get('/api/get', (req, res)=>{
    res.send(`${req.session.favorite} is set to your favorite`);
})

app.get('/api/users', pizzaLover,  (req, res)=>{
  let filtered = data;
  if (req.query){
    if (req.query.hair){
        filtered = filtered.filter(e=>e.hairColor === req.query.hair)
    }
    if (req.query.eye){
        filtered = filtered.filter(e=>e.eyeColor === req.query.eye)
    }
    if (req.query.name){
        // {name:{first:'Brack', last:'Carmony'}}
        // `${e.name.first} ${e.name.last}`
        // `Brack Carmony`
        // `Brack Carmony`.includes()
        filtered = filtered.filter(
            e=>`${e.name.first} ${e.name.last}`.includes(req.query.name)
        )
    }
  }
  res.send(filtered);
  
  
})


app.listen(port, ()=>console.log(`Listening on port ${port}`));
