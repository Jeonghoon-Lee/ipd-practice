const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

// for node-fetch
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;

// create express app
const app = express();

app.use('/public', serveStatic(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
}).post('/', (req, res) => {
  if (req.body.request === 'login') {
    res.json({
      success: true
    });
  } else if (req.body.request === 'weather') {
    const MY_KEY = 'Your Key';
    const weatherURL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=${MY_KEY}&metric=true`;

    fetch(weatherURL)
      .then(res => {
        if (!res.ok)
          throw new Error('Http Error, status = ' + response.status);
        return response.json();
      })
      .then(weatherForecast => res.json(weatherForecast))
      .catch(reason => console.error(reason));
  } else if (req.body.request === 'famousQuotes') {
    // Famous Quotes URL
    const famousQuotesURL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1';
    const initSetting = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'Your Key'
      }
    }
    fetch(famousQuotesURL, initSetting)
      .then(response => {
        if (!response.ok)
          throw new Error('HTTP error, status = ' + response.status);
        return response.json();
      })
      .then(famousQuotes => res.json(famousQuotes))
      .catch(reason => {
        res.json({
          quote: 'If you want to be happy, be.',
          author: 'Leo Tolstoy'
        });
        console.log(reason);
      });
  }
}).listen(3000);