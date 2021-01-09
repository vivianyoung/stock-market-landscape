const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
require('dotenv').config();

API_KEY = process.env.STOCK_API_KEY;

// set up port
const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port, () => {
    console.log(`Web server up on port ${port}`);
});

// view engine
app.use(express.static(path.join(__dirname, "../public")));

app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout:false}));
app.set('view engine', 'hbs');

app.engine('html', require('ejs').renderFile);

// middleware
app.use(express.static(__dirname + '../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('home', {key: API_KEY});
})
