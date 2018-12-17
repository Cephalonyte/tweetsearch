var push = require('get-push');

var gitUrl = 'https://Seajack@bitbucket.org/Seajack/twitterpoll.git';
var dir = './twitterpoll';

push(dir, gitUrl, function() {
  console.log('Done!');
});
