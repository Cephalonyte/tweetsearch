var fs = require('fs');
var db = require('./databasehandler.js');

module.exports = {
  getKeys: function() {
    var config = JSON.parse(fs.readFileSync('config.json'));
    var keys = {
      api_key: config.api_key,
      api_secret_key: config.api_secret_key,
      access_token: config.access_token,
      access_secret_token: config.access_secret_token
    };
    return keys;
  },

  oauthTwitter: function(api_key, api_secret_key, OAuth) {
    var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      api_key,
      api_secret_key,
      '1.0A',
      null,
      'HMAC-SHA1'
    );
    return oauth;
  },

  grabTweets: function(access_token, access_secret_token, oauth, hashtag) {
    oauth.get(
      'https://api.twitter.com/1.1/search/tweets.json?q=%40' + hashtag,
      access_token,
      access_secret_token,
      function(error, data, res) {
        if (error) {
          return 'An error has occured: ' + JSON.stringify(error);
        } else if (data) {
          var tweets = JSON.parse(data);
          tweets.statuses.forEach(function(status) {
            tweetContainer = {
              hashtag: hashtag,
              created_at: status.created_at,
              id: status.id,
              id_str: status.id_str,
              text: status.text,
              truncated: status.truncated,
              entities: status.entities,
              metadata: status.metadata,
              source: status.source,
              in_reply_to_status_id: status.in_reply_to_status_id,
              in_reply_to_status_id_str: status.in_reply_to_status_id_str,
              in_reply_to_status_user_id: status.in_reply_to_status_user_id,
              in_reply_to_status_id_str: status.in_reply_to_status_id_str,
              in_reply_to_status_screen_name:
                status.in_reply_to_status_screen_name,
              user: status.user,
              geo: status.geo,
              coordinates: status.coordinates,
              place: status.place,
              contributors: status.contributors,
              retweeted_status: status.retweeted_status,
              is_quote_status: status.is_quote_status,
              retweet_count: status.retweet_count,
              favorite_count: status.favorite_count,
              favorited: status.favorited,
              retweeted: status.retweeted,
              lang: status.lang
            };
            db.writeTweetResults(tweetContainer);
          });
          return JSON.parse(data);
        } else {
          return 'Response from call: ' + res;
        }
      }
    );
  }
};
