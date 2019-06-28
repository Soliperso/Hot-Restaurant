
// Dependencies
const express = require('express');
const path = require('path');

// Set the express app 
let app = express();
let PORT = 3000;

// Setup the express app to handle the data parsinga
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const customers = [];
const wailist = [];

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tables', function(req, res) {
  res.sendFile(path.join(__dirname, 'tables.html'));
});


app.get('/reserve', function(req, res) {
  res.sendFile(path.join(__dirname, 'reserve.html'));
});


app.get('/tables/api', function(res, req) {
  return res.json(customers);
});

app.get('/reserve/api', function(res, req) {
  return res.json(wailist);
});

app.post('/api/clear', function(req, res) {
  customers = [];
  wailist = [];
});

app.post('/new', function(req, res) {
  let newCustomer =  req.body;
  if(customers.length > 5) {
    wailist.push(newCustomer)
  } else {
    customers.push(newCustomer);
  }

  res.json(newCustomer);
});


// Listen to the server on port 3000
app.listen(PORT, function() {
  console.log('App listening on port ' + PORT);
});