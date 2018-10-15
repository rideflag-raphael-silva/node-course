const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to log the message to the console.');
  });
  next();
});

app.use((req, res, next) => {
  next();
  /*res.render('maintanance.hbs', {
    pageTitle: 'maintanance title!!!!',
  });*/
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
//res.send('Hello express!');
  //res.send('<h1>Hello express!</h1>');
  /*res.send({
    name: 'Raphael',
    test: [
      'abacaxi',
      'bicicleta'
    ]
  });*/
  res.render('home.hbs', {
    pageTitle: 'Home title!!!!',
    welcomeMessage: 'welcome to my web page',
  });
}
);

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About title!!!!',
  });
}
);

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: '[ERROR] Unable to complete the request.'
  });
}
);

app.listen(3000,() => console.log('Server is up and running'));
