const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const session = require('express-session');
const data = require('./data');
const _ = require('lodash');

app.use(bodyParser.json());
app.use( // Put session here

)

app.get('/api/set', (req, res)=>{

})

app.get('/api/get', (req, res)=>{

})

app.get('/api/users', (req, res)=>{

})


app.listen(port, ()=>console.log(`Listening on port ${port}`));
