var express = require('express');
var http = require('http');
var OAuth = require('oauth');
var fs = require('fs');
var twitter = require('./twitterhandler.js');
var db = require('./databasehandler.js');

var app = express();

app.get('/', function(req, res) {
  var keys = twitter.getKeys();
  var oauth = twitter.oauthTwitter(keys.api_key, keys.api_secret_key, OAuth);
  var results = twitter.grabTweets(
    keys.access_token,
    keys.access_secret_token,
    oauth,
    'liveperson'
  );

  db.getTweets('liveperson');
  res.send('ok');
});

app.get('*', function(req, res) {
  res.send(
    'Invalid URL. Please navigate to <a href="http://localhost:3000/">localhost:3000/</a>'
  );
});

app.listen(3000);
